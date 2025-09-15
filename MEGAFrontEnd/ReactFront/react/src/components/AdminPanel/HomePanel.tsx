import { useAuthStore } from './store/authStore';
import { Users, Building, FileText, Bell, Clock, Calendar, Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiGet } from './services/apiService';

interface DashboardStats {
    totalUsers: number;
    totalHaberler: number;
    totalEtkinlikler: number;
    totalHizmetler: number;
    totalYonetim: number;
    totalRaporlar: number;
}

interface RecentActivity {
    id: number;
    action: string;
    user: string;
    time: string;
    type: 'success' | 'info' | 'warning' | 'error';
}

export default function HomePanel() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalHaberler: 0,
        totalEtkinlikler: 0,
        totalHizmetler: 0,
        totalYonetim: 0,
        totalRaporlar: 0
    });
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Paralel olarak tüm verileri çek
                const [
                    haberlerResponse,
                    etkinliklerResponse,
                    hizmetlerResponse,
                    yonetimResponse,
                    raporlarResponse
                ] = await Promise.allSettled([
                    apiGet('/api/haberler'),
                    apiGet('/api/etkinlikler'),
                    apiGet('/api/hizmetler'),
                    apiGet('/api/kurumsal/yonetimsemasi'),
                    apiGet('/api/kurumsal/kurumsal-raporlar')
                ]);

                // İstatistikleri hesapla
                const newStats: DashboardStats = {
                    totalUsers: 0, // Kullanıcı sayısı için ayrı endpoint gerekebilir
                    totalHaberler: haberlerResponse.status === 'fulfilled' ? (haberlerResponse.value as any[]).length : 0,
                    totalEtkinlikler: etkinliklerResponse.status === 'fulfilled' ? (etkinliklerResponse.value as any[]).length : 0,
                    totalHizmetler: hizmetlerResponse.status === 'fulfilled' ? (hizmetlerResponse.value as any[]).length : 0,
                    totalYonetim: yonetimResponse.status === 'fulfilled' ?
                        ((yonetimResponse.value as any).baskan?.length || 0) +
                        ((yonetimResponse.value as any).baskanYardimcilari?.length || 0) : 0,
                    totalRaporlar: raporlarResponse.status === 'fulfilled' ? (raporlarResponse.value as any[]).length : 0
                };

                setStats(newStats);

                // Son aktiviteleri oluştur (örnek veriler)
                const activities: RecentActivity[] = [
                    { id: 1, action: 'Yeni haber eklendi', user: 'Sistem', time: '5 dakika önce', type: 'success' },
                    { id: 2, action: 'Etkinlik güncellendi', user: 'Sistem', time: '1 saat önce', type: 'info' },
                    { id: 3, action: 'Rapor yüklendi', user: 'Sistem', time: '2 saat önce', type: 'success' },
                    { id: 4, action: 'Yönetim şeması güncellendi', user: 'Sistem', time: '3 saat önce', type: 'info' }
                ];

                setRecentActivities(activities);

            } catch (error) {
                console.error('Dashboard verileri yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statsData = [
        { title: 'Toplam Haber', value: stats.totalHaberler.toString(), icon: Newspaper, color: 'bg-blue-500' },
        { title: 'Aktif Etkinlikler', value: stats.totalEtkinlikler.toString(), icon: Calendar, color: 'bg-green-500' },
        { title: 'Hizmetler', value: stats.totalHizmetler.toString(), icon: Building, color: 'bg-purple-500' },
        { title: 'Yönetim Üyeleri', value: stats.totalYonetim.toString(), icon: Users, color: 'bg-orange-500' }
    ];

    const quickActions = [
        { title: 'Haber Yönetimi', icon: Newspaper, color: 'bg-blue-500', href: '/panel/haberler' },
        { title: 'Etkinlik Yönetimi', icon: Calendar, color: 'bg-green-500', href: '/panel/etkinlikler' },
        { title: 'Hizmet Yönetimi', icon: Building, color: 'bg-purple-500', href: '/panel/hizmetler' },
        { title: 'Kurumsal Raporlar', icon: FileText, color: 'bg-orange-500', href: '/panel/kurumsal/raporlar' }
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-slate-500 mb-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                    <span className="text-blue-600">🏠</span> / Anasayfa
                </span>
            </div>

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">
                    Hoş Geldiniz, {user?.isim || 'Kullanıcı'}!
                </h1>
                <p className="text-blue-100">
                    Gebze Belediyesi Yönetim Paneline hoş geldiniz. Sistem durumunu ve son aktiviteleri buradan takip edebilirsiniz.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat) => (
                    <div key={stat.title} className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">
                                    {loading ? '...' : stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">Son Aktiviteler</h3>
                        <Bell className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="space-y-3">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                    (() => {
                                        if (activity.type === 'success') return 'bg-green-500';
                                        if (activity.type === 'warning') return 'bg-yellow-500';
                                        return 'bg-blue-500';
                                    })()
                                }`}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                                    <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">Hızlı İşlemler</h3>
                        <Clock className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action) => (
                            <a
                                key={action.title}
                                href={action.href}
                                className="flex flex-col items-center p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                            >
                                <div className={`p-3 rounded-lg ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                                    <action.icon className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 text-center">{action.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Sistem Durumu</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                            <p className="text-sm font-medium text-green-800">Veritabanı</p>
                            <p className="text-xs text-green-600">Çevrimiçi</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                            <p className="text-sm font-medium text-green-800">API Servisleri</p>
                            <p className="text-xs text-green-600">Çalışıyor</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div>
                            <p className="text-sm font-medium text-yellow-800">Yedekleme</p>
                            <p className="text-xs text-yellow-600">Devam ediyor</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}