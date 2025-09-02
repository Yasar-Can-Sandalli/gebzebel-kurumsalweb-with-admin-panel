// src/components/EditUserModal.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../services/userService.tsx';
import { X } from 'lucide-react';
import axios from 'axios';
import { PermissionService } from '../services/YetkiServis.tsx';

// Düzenlenebilir roller (Filtrelerdeki "All Roles" hariç)
// const assignableRoleOptions = ['Admin', 'Editor', 'User'];
// Düzenlenebilir statüler (Filtrelerdeki "All Status" hariç)
const assignableStatusOptions = ['Active', 'Inactive', 'Pending'];

// Spring Boot API endpoint
const API_URL = 'http://localhost:8080/api/users';

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSave: (userid: number, updatedUser: User) => void;
}

export default function EditUserModal({ isOpen, onClose, user, onSave }: EditUserModalProps) {
    const [formData, setFormData] = useState<Partial<User>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [yetkiler, setYetkiler] = useState<any>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                tcno: user.tcno,
                isim: user.isim || '',
                status: user.status ?? assignableStatusOptions[0],
                yetkilerJson: user.yetkilerJson,
            });


            // Async function to handle permissions
            const fetchPermissions = async () => {
                try {
                    const userPermissions = user.yetkilerJson ? JSON.parse(user.yetkilerJson) : {};
                    const mergedPermissions = await PermissionService.mergeWithDefaults(userPermissions);
                    setYetkiler(mergedPermissions);
                } catch (e) {
                    console.error('Yetkiler parse edilemedi:', e);
                    const defaults = await PermissionService.getDefaultPermissions();
                    setYetkiler(defaults);
                }
            };

            fetchPermissions();
        }
    }, [user]);


    if (!isOpen || !user) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleYetkiChange = (alan: string, yetki: string, value: boolean) => {
        const updatedYetkiler = {
            ...yetkiler,
            [alan]: {
                ...yetkiler[alan],
                [yetki]: value
            }
        };
        setYetkiler(updatedYetkiler);
        setFormData(prev => ({
            ...prev,
            yetkilerJson: JSON.stringify(updatedYetkiler)
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            if (formData.id && formData.status && formData.tcno) {
                const updatedUserData = {
                    tcno: formData.tcno,
                    isim: formData.isim || user.isim,
                    status: formData.status || user.status,
                    yetkilerJson: JSON.stringify(yetkiler), // Güncellenmiş yetkileri gönder
                };


                // API isteği gönderme - Spring Boot backend'e
                const response = await axios.put(`${API_URL}/${formData.id}`, updatedUserData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Eğer CORS ve cookie/session kullanıyorsanız
                });

                if (response.status === 200) {
                    // Backend'den gelen güncellenmiş veriyi kullan
                    const updatedUser = response.data;
                    onSave(formData.id, updatedUser);
                    onClose();

                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } else {
                throw new Error("Form data is incomplete");
            }
        } catch (error: any) {
            console.error("Failed to update user:", error);
            setErrorMessage(error.response?.data?.message || error.message || "User update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Edit User</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="tcno" className="block text-sm font-medium text-gray-700 mb-1">
                            TC Kimlik No
                        </label>
                        <input
                            type="text"
                            id="tcno"
                            name="tcno"
                            value={formData.tcno || ''}
                            readOnly // TC Kimlik No genellikle değiştirilemez
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="isim" className="block text-sm font-medium text-gray-700 mb-1">
                            İsim Soyisim
                        </label>
                        <input
                            type="text"
                            id="isim"
                            name="isim"
                            value={formData.isim || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Yetkiler
                        </label>
                        <div className="space-y-4">
                            {yetkiler && Object.entries(yetkiler).map(([alan, yetkiGrubu]: [string, any]) => (
                                <div key={alan} className="border p-3 rounded">
                                    <h4 className="font-medium text-gray-900 mb-2 capitalize">{alan}</h4>
                                    <div className="space-y-2">
                                        {Object.entries(yetkiGrubu).map(([yetki, deger]: [string, any]) => (
                                            <label key={`${alan}-${yetki}`} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={deger}
                                                    onChange={(e) => handleYetkiChange(alan, yetki, e.target.checked)}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700 capitalize">
                                                {yetki}
                                            </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="mb-6">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Statü
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {assignableStatusOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            disabled={isSubmitting}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}