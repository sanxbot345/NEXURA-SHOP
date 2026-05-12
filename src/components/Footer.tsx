import { Instagram, Mail, MessageCircle } from "lucide-react";
import { PAYMENT_METHODS } from "../data";

// Custom TikTok SVG Icon
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#0a0c1a] border-t border-white/5 pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          
          {/* Column 1: Info, Tersedia Di, Metode Pembayaran */}
          <div className="space-y-8 lg:col-span-1">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center p-0.5 relative overflow-hidden">
                  <img src="/nexura.png" alt="NEXURA" className="w-full h-full object-cover rounded-md" />
                </div>
                <span className="font-display font-black text-xl tracking-tighter text-white">
                  NEXURA
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                NEXURA SHOP adalah web Top Up Game resmi dengan harga termurah di Indonesia. Siap melayani 24 jam non-stop secara otomatis dengan semua metode pembayaran terlengkap.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3">Tersedia di</h4>
              <div className="flex items-center gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Google Play" 
                  className="h-10 cursor-pointer hover:opacity-80 transition-opacity" 
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App Store" 
                  className="h-10 cursor-pointer hover:opacity-80 transition-opacity" 
                />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3">Metode Pembayaran</h4>
              <div className="flex flex-wrap items-center gap-2">
                {PAYMENT_METHODS.slice(0, 5).map(pm => (
                  <div key={pm.id} className="w-10 h-8 bg-white/10 rounded flex items-center justify-center p-1.5" title={pm.name}>
                     <img src={pm.iconUrl} alt={pm.name} className="max-w-full max-h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Peta Situs */}
          <div>
            <h4 className="text-white font-bold mb-5">Peta Situs</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pertanyaan Umum</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Dukungan Pelanggan</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Berita & Informasi</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Gabung Reseller</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
            </ul>
          </div>

          {/* Column 3: Akses Cepat */}
          <div>
            <h4 className="text-white font-bold mb-5">Akses Cepat</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Papan Peringkat</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Cek Transaksi</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Semua Ulasan</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Semua Layanan</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Cek Region Mobile Legend</a></li>
            </ul>
          </div>

          {/* Column 4: Fitur & Dukungan */}
          <div className="space-y-8">
            <div>
              <h4 className="text-white font-bold mb-5">Fitur</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Daftar Layanan</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Mini Games</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Login/Daftar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-5">Dukungan Pelanggan NEXURA</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors">
                  <TikTokIcon size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors">
                  <MessageCircle size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} NEXURA SHOP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
