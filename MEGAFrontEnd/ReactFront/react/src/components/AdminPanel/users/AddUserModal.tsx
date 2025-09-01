import React, {useEffect, useState} from 'react';
import { User } from '../services/userService.tsx';
import { X } from 'lucide-react';
import {createUser} from '../services/userService.tsx';
import { PermissionService } from '../services/YetkiServis.tsx';

// Düzenlenebilir statüler
const assignableStatusOptions = ['Active', 'Inactive', 'Pending'];

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newUser: User) => void;
}

/** Form için ayrı tip: password burada, User modelinde olmak zorunda değil */
type AddUserForm = {
    tcno: string;
    isim: string;
    password: string;
    status: string;
    yetkilerJson: string;
};

export default function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
    const [formData, setFormData] = useState<AddUserForm>({
        tcno: '',
        isim: '',
        password: '',
        status: assignableStatusOptions[0],
        yetkilerJson: '{}',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Yetkiler servisinden gelen nesne (senin eski mantık)
    const [yetkiler, setYetkiler] = useState(PermissionService.getDefaultPermissions());

    // Yetkiler değişince formData.yetkilerJson güncelle
    useEffect(() => {
        setFormData(prev => ({ ...prev, yetkilerJson: JSON.stringify(yetkiler) }));
    }, [yetkiler]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleYetkiChange = (alan: string, yetki: string, value: boolean) => {
        setYetkiler((prev: any) => {
            const updated = {
                ...prev,
                [alan]: {
                    ...prev[alan],
                    [yetki]: value
                }
            };
            return updated;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const { tcno, isim, password, status } = formData;
            if (tcno && isim && password && status) {
                const newUserData = {
                    tcno,
                    isim,
                    password,
                    status,
                    yetkilerJson: JSON.stringify(yetkiler),
                };

                const createdUser = await createUser(newUserData);
                onAdd(createdUser);
                handleClose();
            } else {
                throw new Error('Lütfen tüm zorunlu alanları doldurun.');
            }
        } catch (error: any) {
            console.error('Failed to add user:', error);
            setErrorMessage(error?.message || 'User creation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            tcno: '',
            isim: '',
            password: '',
            status: assignableStatusOptions[0],
            yetkilerJson: JSON.stringify(PermissionService.getDefaultPermissions()),
        });
        setYetkiler(PermissionService.getDefaultPermissions());
        setErrorMessage(null);
        onClose();
    };

    return (
        // 🔹 Şeffaf + blur arkaplan
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Kullanıcı Ekle</h3>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
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
                            value={formData.tcno}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Parola
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
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
                            value={formData.isim}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Statü
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {assignableStatusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    {/* Yetkiler */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Yetkiler</label>
                        <div className="space-y-4">
                            {Object.entries(yetkiler).map(([alan, yetkiGrubu]: [string, any]) => (
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

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
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
                            {isSubmitting ? 'Ekleniyor...' : 'Ekle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
