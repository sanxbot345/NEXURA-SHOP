import { Menu, Search, User } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
  onGoHome?: () => void;
  user: any;
  onOpenAuth: () => void;
}

export function Navbar({ onToggleSidebar, onGoHome, user, onOpenAuth }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-30 h-20 bg-white/5 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              <Menu size={24} />
            </button>

            <button onClick={onGoHome} className="hidden sm:flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-display font-black text-xl overflow-hidden p-0.5">
                <img src="/nexura.png" alt="NEXURA" className="w-full h-full object-cover rounded-md" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-white">
                NEXURA
              </span>
            </button>
          </div>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-nexura transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Cari game favoritmu..."
                className="block w-full pl-10 pr-4 py-2.5 bg-[#151a30] border border-white/10 rounded-full text-sm placeholder-slate-500 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
              <Search size={22} />
            </button>
            {user ? (
               <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-white/20 hover:border-cyan-400 transition-colors overflow-hidden">
                 {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    <User size={18} className="text-slate-300" />
                 )}
               </button>
            ) : (
                <button onClick={onOpenAuth} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-colors">Masuk</button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
