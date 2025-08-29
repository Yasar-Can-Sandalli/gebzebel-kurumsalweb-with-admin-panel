// src/services/permissionService.ts
import api from '../../axiosConfig.ts';

const API_URL = 'http://localhost:8080/api/permissions';


export const PermissionService = {
    getDefaultPermissions: async (): Promise<any> => {
        try {
            const response = await api.get(`${API_URL}/default`);
            return response.data;
        } catch (error) {
            console.error('Default yetkiler çekilemedi:', error);
            // Fallback olarak local default yetkiler
            return {
                "kurumsal": {"goruntuleme": true, "duzenleme": false, "ekleme": false},
                "gebze": {"goruntuleme": true, "duzenleme": false},
                "hizmetler": {"goruntuleme": true, "duzenleme": false, "silme": false},
                "yayinlar": {"goruntuleme": true, "duzenleme": false, "silme": false},
                "etkinlikler": {"goruntuleme": true, "duzenleme": false, "silme": false},
                "haberler": {"goruntuleme": true, "duzenleme": false, "silme": false},
                "duyurular": {"goruntuleme": true, "duzenleme": false, "silme": false},
                "projeler": {"goruntuleme": true, "duzenleme": false, "silme": false}
            };
        }
    },
            mergeWithDefaults: async (userPermissions: any) => {
                const defaults = await PermissionService.getDefaultPermissions();

                // Kullanıcı yetkileriyle default yetkileri birleştir
                const merged = {...defaults};

                // Kullanıcının yetkilerini ekle (varsa)
                if (userPermissions) {
                    for (const [area, permissions] of Object.entries(userPermissions)) {
                        if (merged[area]) {
                            merged[area] = {
                                ...merged[area],
                                ...(permissions as object)
                            };
                        } else {
                            merged[area] = permissions;
                        }
                    }
                }

                return merged;
            }
    };