import BuyerSemanticSearch from "@/components/BuyerSemanticSearch";

export const metadata = {
  title: "AI Search — TaniConnect",
  description: "Cari bahan baku segar dari petani lokal menggunakan pencarian semantik berbasis AI.",
};

export default function AISearchPage() {
  return (
    <div className="space-y-1">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 mb-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Semantic Search</h1>
            <p className="text-sm text-gray-500 mt-1">
              Cari bahan baku dengan bahasa alami — AI kami akan menemukan kecocokan terbaik dari petani lokal.
            </p>
          </div>
          {/* AI Badge */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">Gemini Embeddings</span>
          </div>
        </div>
      </div>

      {/* Search Component */}
      <BuyerSemanticSearch />
    </div>
  );
}
