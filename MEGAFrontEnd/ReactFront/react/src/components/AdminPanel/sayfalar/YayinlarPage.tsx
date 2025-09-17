// src/sayfalar/YayinlarPage.tsx

import React, { useEffect, useState } from "react";
import {
    getAllYayinCategories,
    getYayinCategoryById,
    deleteYayin,
} from "../services/yayinlarService";
import type { YayinCategory, Yayin } from "../../../types/yayinlar";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { TbPencil, TbTrash } from "react-icons/tb"; // Yeni Düzenle ve Sil ikonları
import { LiaFilePdf } from "react-icons/lia";

const YayinlarPage = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<YayinCategory[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [yayinlar, setYayinlar] = useState<Yayin[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Tüm kategorileri getir
                const fetchedCategories = await getAllYayinCategories();
                setCategories(fetchedCategories);

                // Tüm kategorilerdeki yayınları getir
                const allYayinlarPromises = fetchedCategories.map(cat =>
                    getYayinCategoryById(cat.categoryId).then(data => data.yayinlar)
                );
                const allYayinlarArrays = await Promise.all(allYayinlarPromises);
                const allYayinlar = allYayinlarArrays.flat();
                setYayinlar(allYayinlar);
            } catch (err) {
                console.error("Veriler yüklenirken hata oluştu:", err);
                setError("Veriler yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value);
        setSelectedCategoryId(id);
        setLoading(true);
        setError(null);

        try {
            if (isNaN(id)) { // "Tüm Yayınlar" seçeneği
                const allYayinlarPromises = categories.map(cat =>
                    getYayinCategoryById(cat.categoryId).then(data => data.yayinlar)
                );
                const allYayinlarArrays = await Promise.all(allYayinlarPromises);
                const allYayinlar = allYayinlarArrays.flat();
                setYayinlar(allYayinlar);
            } else { // Belirli bir kategori seçildiğinde
                const data = await getYayinCategoryById(id);
                setYayinlar(data.yayinlar);
            }
        } catch (err) {
            console.error("Yayınlar getirilirken hata oluştu:", err);
            setError("Yayınlar yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNewYayin = () => {
        navigate("yeni");
    };

    const handleEditYayin = (yayinId: number) => {
        navigate(`duzenle/${yayinId}`);
    };

    const handleDeleteYayin = async (yayinId: number) => {
        if (window.confirm("Bu yayını silmek istediğinizden emin misiniz?")) {
            try {
                await deleteYayin(yayinId);
                // Başarılı olursa listeyi güncelle
                setYayinlar(prevYayinlar => prevYayinlar.filter(yayin => yayin.yayinId !== yayinId));
                alert("Yayın başarıyla silindi.");
            } catch (err) {
                console.error("Yayın silinirken hata oluştu:", err);
                alert("Yayın silinirken bir hata oluştu.");
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Yayınlar</h1>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <label htmlFor="category-select" className="text-sm text-gray-700 font-medium">
                        Kategori
                    </label>
                    <select
                        id="category-select"
                        className="w-auto border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                        onChange={handleCategoryChange}
                        value={selectedCategoryId ?? ''}
                        disabled={loading}
                    >
                        <option value={''}>Tüm Yayınlar</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleCreateNewYayin}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <FaPlus className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                    Yeni Yayın
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Yayınlar yükleniyor...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12 text-red-500">
                    <p>{error}</p>
                </div>
            ) : yayinlar.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Bu kategoride henüz yayın yok.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {yayinlar.map((yayin) => (
                        <div key={yayin.yayinId} className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                    <LiaFilePdf className="h-8 w-8 text-gray-500" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {yayin.yayinBaslik}
                                        </h3>
                                        <a
                                            href={yayin.yayinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            {yayin.yayinUrl}
                                        </a>
                                        {yayin.description && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {yayin.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <button
                                        onClick={() => handleEditYayin(yayin.yayinId)}
                                        className="inline-flex items-center justify-center h-10 w-10 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full"
                                        aria-label="Düzenle"
                                    >
                                        <TbPencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteYayin(yayin.yayinId)}
                                        className="inline-flex items-center justify-center h-10 w-10 text-red-500 hover:text-white bg-red-100 hover:bg-red-600 rounded-full"
                                        aria-label="Sil"
                                    >
                                        <TbTrash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YayinlarPage;