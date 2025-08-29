import AdminLayout from "./_LayoutAdminPanel";

export default function HomePanel() {
    return (
        <AdminLayout>
            <div>
                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <span className="text-blue-600">🏠</span> / Anasayfa
          </span>
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">ANASAYFA</h1>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h4 className="text-base font-semibold mb-2">İçerikler</h4>
                <p className="text-gray-500">Hoş geldiniz! İçerikler burada görünecek.</p>
            </div>
        </AdminLayout>
    );
}
