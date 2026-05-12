import { motion, AnimatePresence } from "motion/react";
import { X, Home, ReceiptText, HelpCircle, Settings, LogIn, LogOut, Bot } from "lucide-react";

import { Page } from "../App";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChatbot: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: any;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export function Sidebar({ isOpen, onClose, onOpenChatbot, currentPage, onNavigate, user, onOpenAuth, onSignOut }: SidebarProps) {
  const menuItems: { icon: any; label: string; active: boolean; isAi?: boolean; pageId?: Page }[] = [
    { icon: Home, label: 'Beranda', active: currentPage === 'home', pageId: 'home' },
    { icon: ReceiptText, label: 'Cek Pesanan', active: currentPage === 'orders', pageId: 'orders' },
    { icon: Bot, label: 'NEXURA AI', active: false, isAi: true },
    { icon: HelpCircle, label: 'FAQ', active: currentPage === 'faq', pageId: 'faq' },
    { icon: Settings, label: 'Pengaturan', active: currentPage === 'settings', pageId: 'settings' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay mask for clicking to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer / Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: -300, right: 0 }}
            dragElastic={0.05}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x < -50 || velocity.x < -500) {
                onClose();
              }
            }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0c1a] border-r border-cyan-500/20 flex flex-col touch-none shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-display font-black text-xl overflow-hidden p-0.5">
                  <img src="/nexura.png" alt="NEXURA" className="w-full h-full object-cover rounded-md" />
                </div>
                <span className="font-display font-black text-xl tracking-tighter text-white">
                  NEXURA
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors lg:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu container */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                Menu Utama
              </div>
              
              {menuItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item.isAi) {
                        onOpenChatbot();
                      } else if (item.pageId) {
                        onNavigate(item.pageId);
                      }
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl font-medium transition-all ${
                      item.active 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                        : item.isAi
                          ? 'text-cyan-400 hover:bg-cyan-500/10 border border-transparent shadow-[0_0_10px_rgba(34,211,238,0.0)] hover:border-cyan-500/20'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className={item.active || item.isAi ? 'text-cyan-400' : ''} />
                    {item.label}
                    {item.isAi && (
                      <span className="ml-auto flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Section */}
            <div className="p-6 border-t border-white/5 space-y-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-white font-bold truncate">{user.displayName || "User"}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={onSignOut} className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold transition-all py-3 rounded-xl border border-red-500/20">
                    <LogOut size={18} />
                    Keluar Akun
                  </button>
                </>
              ) : (
                <button onClick={() => { onClose(); onOpenAuth(); }} className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 font-bold transition-all text-white py-3 rounded-xl">
                  <LogIn size={18} />
                  Masuk / Daftar
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
