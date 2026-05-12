import { Package, Search } from "lucide-react";
import { motion } from "motion/react";

export function OrdersPage() {
  return (
    <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-black italic text-white flex items-center gap-3 mb-2">
          <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
          Cek Pesanan
        </h2>
        <p className="text-slate-400">Pantau status transaksi Anda dengan mudah kapan saja.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0f1225] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl mb-12">
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Masukkan Nomor Faktur / Invoice..."
            className="block w-full pl-12 pr-4 py-4 bg-[#151a30] border border-white/10 rounded-2xl text-lg placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all font-mono"
          />
          <div className="absolute inset-y-2 right-2">
            <button className="h-full px-6 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors">
              Cek
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center py-20 px-4 border border-dashed border-white/10 rounded-3xl bg-white/5">
        <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Package size={48} className="text-slate-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Belum ada pencarian</h3>
        <p className="text-slate-400 max-w-md mx-auto">Silakan masukkan nomor invoice transaksi Anda di atas untuk melihat detail status pesanan terkait.</p>
      </motion.div>
    </div>
  );
}
