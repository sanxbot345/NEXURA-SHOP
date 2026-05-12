import { Settings, Moon, Bell, MonitorPlay } from "lucide-react";
import { motion } from "motion/react";
import { useSettings } from "../context/useSettings";

export function SettingsPage() {
  const { darkMode, setDarkMode, notifications, setNotifications, animations, setAnimations } = useSettings();

  return (
    <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-black italic text-white flex items-center gap-3 mb-2">
          <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
          Pengaturan
        </h2>
        <p className="text-slate-400">Atur preferensi akun dan tampilan aplikasi Nexura.</p>
      </motion.div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0f1225] border border-white/5 rounded-3xl p-6">
          <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
            <Settings className="text-cyan-400" /> Preferensi Umum
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">Mode Gelap (Dark Mode)</h4>
                <p className="text-slate-400 text-sm mt-1">Sesuaikan tampilan antarmuka.</p>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-cyan-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center transition-all ${darkMode ? 'right-1' : 'left-1'}`}>
                  <Moon size={14} className={darkMode ? "text-cyan-500" : "text-slate-400"} />
                </div>
              </button>
            </div>
            
            <div className="h-px w-full bg-white/5"></div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">Notifikasi Promosi</h4>
                <p className="text-slate-400 text-sm mt-1">Terima email untuk diskon dan event khusus.</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-colors ${notifications ? 'bg-cyan-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center transition-all ${notifications ? 'right-1' : 'left-1'}`}>
                  <Bell size={14} className={notifications ? "text-cyan-500" : "text-slate-400"} />
                </div>
              </button>
            </div>

            <div className="h-px w-full bg-white/5"></div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">Animasi UI</h4>
                <p className="text-slate-400 text-sm mt-1">Aktifkan efek transisi dan animasi visual.</p>
              </div>
              <button 
                onClick={() => setAnimations(!animations)}
                className={`relative w-14 h-8 rounded-full transition-colors ${animations ? 'bg-cyan-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center transition-all ${animations ? 'right-1' : 'left-1'}`}>
                  <MonitorPlay size={14} className={animations ? "text-cyan-500" : "text-slate-400"} />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
