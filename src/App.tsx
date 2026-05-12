import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { TopupPage } from './components/TopupPage';
import { Chatbot } from './components/Chatbot';
import { OrdersPage } from './components/OrdersPage';
import { FAQPage } from './components/FAQPage';
import { SettingsPage } from './components/SettingsPage';
import { Footer } from './components/Footer';
import { Game } from './types';
import { GAMES, BANNERS } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './context/AuthContext';

export type Page = 'home' | 'orders' | 'faq' | 'settings';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  // Carousel state
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (activeGame) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeGame]);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  // Swipe to open detection vars
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStart;
    
    // Swipe right from left edge (within 50px)
    if (diff > 50 && touchStart < 50) {
      setIsSidebarOpen(true);
      setTouchStart(null);
    }
  };

  return (
    <div 
      className="min-h-screen flex text-slate-100 bg-[#05060f] selection:bg-cyan-500/30"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onOpenChatbot={() => {
          setIsSidebarOpen(false);
          setIsChatbotOpen(true);
        }}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setActiveGame(null);
          setIsSidebarOpen(false);
        }}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={() => signOut()}
      />
      
      <main className="flex-1 w-full flex flex-col min-h-screen">
        {!activeGame && <Navbar 
            onToggleSidebar={() => setIsSidebarOpen(true)} 
            onGoHome={() => {
              setCurrentPage('home');
              setActiveGame(null);
            }} 
            user={user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
        />}
        
        {activeGame ? (
          <TopupPage game={activeGame} onBack={() => setActiveGame(null)} />
        ) : currentPage === 'orders' ? (
          <div className="flex-1 pb-16 overflow-y-auto flex flex-col">
            <OrdersPage />
          </div>
        ) : currentPage === 'faq' ? (
          <div className="flex-1 pb-16 overflow-y-auto flex flex-col">
            <FAQPage />
          </div>
        ) : currentPage === 'settings' ? (
          <div className="flex-1 pb-16 overflow-y-auto flex flex-col">
            <SettingsPage />
          </div>
        ) : (
          <div className="flex-1 pb-16 overflow-y-auto">
            
            {/* Banner Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="relative w-full aspect-[21/9] md:aspect-[32/9] max-h-[400px] rounded-3xl overflow-hidden group bg-[#0f1225] border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentBanner}
                    src={BANNERS[currentBanner].imageUrl}
                    alt={`Banner ${currentBanner + 1}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Banner Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex justify-center items-center z-20">
                  <div className="flex gap-2">
                    {BANNERS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentBanner(idx)}
                        className={`transition-all duration-300 rounded-full h-1.5 md:h-2 ${
                          idx === currentBanner 
                            ? 'w-6 md:w-8 bg-cyan-400' 
                            : 'w-1.5 md:w-2 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Manual Navigation Arrows (visible on hover for md+) */}
                <button 
                  onClick={prevBanner}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-cyan-500 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 border border-white/10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextBanner}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-cyan-500 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 border border-white/10"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Popular Games Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                  <span className="w-2 h-6 md:h-8 bg-cyan-500 rounded-full"></span>
                  Pilih Game Populer
                </h3>
                <button className="text-cyan-400 text-sm font-medium">Lihat Semua</button>
              </div>
              
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                {GAMES.map((game, idx) => (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={game.id}
                    onClick={() => setActiveGame(game)}
                    className="group bg-[#0f1225] border border-white/5 rounded-2xl p-3 hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col text-left outline-none"
                  >
                    <div className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-slate-800 mb-3 border border-white/10">
                      <img 
                        src={game.coverUrl} 
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="px-1">
                      <h4 className="font-bold text-sm text-white line-clamp-1">
                        {game.title}
                      </h4>
                      <p className="text-xs text-slate-500 uppercase font-semibold mt-0.5">
                        {game.publisher}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <Footer />
          </div>
        )}
      </main>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
}
