export default function HomePanel() {
    return (
        <div className="space-y-4">
            <div className="text-sm text-slate-500 mb-1 flex items-center gap-2">
        <span className="inline-flex items-center gap-1">
          <span className="text-blue-600">🏠</span> / Anasayfa
        </span>
            </div>

            <h1 className="text-2xl font-semibold text-slate-800">ANASAYFA</h1>

            <div className="bg-white rounded-xl p-6 shadow-md shadow-blue-500/5 ring-1 ring-slate-200/60">
                <h4 className="text-base font-semibold mb-2">İçerikler</h4>
                <p className="text-slate-600">Hoş geldiniz! İçerikler burada görünecek.</p>
            </div>
        </div>
    );
}
