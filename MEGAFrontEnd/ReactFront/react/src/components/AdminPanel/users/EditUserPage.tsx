import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig.ts';
import { ArrowLeft, Save, X, AlertCircle } from 'lucide-react';
import { PermissionService } from '../services/YetkiServis.tsx';
import { User } from '../services/userService.tsx';
import AdminLayout from '../_LayoutAdminPanel.tsx';
import Loader from '../../loader.tsx';

const assignableStatusOptions = ['Aktif', 'Pasif', 'Beklemede'];
const API_URL = 'http://localhost:8080/api/users';

export default function EditUserPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Partial<User>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [yetkiler, setYetkiler] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`${API_URL}/${id}`);
                const user = response.data;
                setFormData({
                    id: user.id,
                    tcno: user.tcno,
                    isim: user.isim || '',
                    status: user.status ?? assignableStatusOptions[0],
                    yetkilerJson: user.yetkilerJson,
                });
                const userPermissions = user.yetkilerJson ? JSON.parse(user.yetkilerJson) : {};
                const mergedPermissions = await PermissionService.mergeWithDefaults(userPermissions);
                setYetkiler(mergedPermissions);
            } catch (e) {
                setErrorMessage('User could not be loaded.');
            }
        };
        fetchUser();
    }, [id]);

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
                    isim: formData.isim,
                    status: formData.status,
                    yetkilerJson: JSON.stringify(yetkiler),
                };
                const response = await api.put(`${API_URL}/${formData.id}`, updatedUserData, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                if (response.status === 200) {
                    navigate('/panel/users');
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } else {
                throw new Error("Form data is incomplete");
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || error.message || "User update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Changes are not saved. Are you sure you want to leave?')) {
            navigate('/panel/users');
        }
    };

    if (!formData.id) {
        return <Loader/>;
    }
    return (
        <AdminLayout>

        <div className="max-w-2xl mx-auto mt-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/panel/users')}
                        className="mr-4 p-2 text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
                        <p className="text-gray-500">{formData.isim || formData.tcno}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                        disabled={isSubmitting}
                    >
                        <X size={16} className="mr-2" />
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <Save size={16} className="mr-2" />
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <AlertCircle size={20} className="text-red-600 mr-2" />
                        <div>
                            <h3 className="text-red-800 font-medium">Error</h3>
                            <p className="text-red-600 text-sm">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-lg shadow">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <div>
                            <label htmlFor="tcno" className="block text-sm font-medium text-gray-700 mb-2">
                                TC Kimlik No
                            </label>
                            <input
                                type="text"
                                id="tcno"
                                name="tcno"
                                value={formData.tcno || ''}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="isim" className="block text-sm font-medium text-gray-700 mb-2">
                                İsim Soyisim
                            </label>
                            <input
                                type="text"
                                id="isim"
                                name="isim"
                                value={formData.isim || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
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
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Statü
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {assignableStatusOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </AdminLayout>
    );
}