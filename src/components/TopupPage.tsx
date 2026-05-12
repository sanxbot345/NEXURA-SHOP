import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Check, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { Game, TopupProduct, PaymentMethod } from "../types";
import { useState, useMemo } from "react";
import { PAYMENT_METHODS } from "../data";
import { useAuth } from "../context/AuthContext";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface TopupPageProps {
  game: Game;
  onBack: () => void;
}

export function TopupPage({ game, onBack }: TopupPageProps) {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<TopupProduct | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isInstruction, setIsInstruction] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const processingTexts = [
    "Memverifikasi ID akun...",
    "Membuat pesanan ke server...",
    "Mengamankan jalur pembayaran...",
    "Menyiapkan instruksi pembayaran..."
  ];

  const handleInputChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const paymentCategories = useMemo(() => {
    const categories: Record<string, PaymentMethod[]> = {};
    PAYMENT_METHODS.forEach(pm => {
      if (!categories[pm.category]) categories[pm.category] = [];
      categories[pm.category].push(pm);
    });
    return categories;
  }, []);

  const calculateTotal = () => {
    if (!selectedProduct || !selectedPayment) return 0;
    const basePrice = selectedProduct.price;
    const fee = selectedPayment.fee < 1 ? basePrice * selectedPayment.fee : selectedPayment.fee;
    return basePrice + fee;
  };

  const isFormValid = () => {
    const inputsValid = game.inputs.every((input) => inputs[input.id]?.trim().length > 0);
    return inputsValid && selectedProduct && selectedPayment;
  };

  const handleCheckout = () => {
    if (!isFormValid()) return;
    if (!user) {
      alert("Silakan masuk (login) terlebih dahulu untuk melanjutkan pembayaran.");
      return;
    }
    setIsProcessing(true);
    setProcessingStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < processingTexts.length) {
        setProcessingStep(step);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setIsInstruction(true);
      }
    }, 600); // 600ms per step
  };

  const handleVerifyPayment = () => {
    setIsInstruction(false);
    setIsVerifying(true);
    setTimeout(async () => {
      try {
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const orderData = {
            userId: user?.uid,
            gameId: game.id,
            productId: selectedProduct?.id,
            amount: calculateTotal(),
            status: 'pending',
            accountId: inputs[game.inputs[0]?.id] || 'Unknown',
            zoneId: game.inputs[1] ? (inputs[game.inputs[1].id] || '') : '',
            paymentMethod: selectedPayment?.id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        
        await setDoc(doc(db, 'orders', orderId), orderData);
        setIsVerifying(false);
        setIsSuccess(true);
      } catch (error) {
        setIsVerifying(false);
        alert("Terjadi kesalahan saat memvalidasi pembayaran: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    }, 2000); // Simulate checking payment
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
    setIsInstruction(false);
    setIsVerifying(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-[#05060f] pb-32">
      {/* Header Image */}
      <div className="relative h-64 md:h-80 w-full border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/80 to-[#05060f]/20 z-10" />
        <img 
          src={game.bannerUrl} 
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        
        {/* Navbar inside Game Detail */}
        <div className="absolute top-0 inset-x-0 p-4 z-20 flex items-center">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-slate-900/50 backdrop-blur-md text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex items-end gap-6">
          <img 
            src={game.coverUrl} 
            alt={game.title} 
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10"
          />
          <div className="flex-1 pb-1 md:pb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3">
              <ShieldCheck size={14} /> Resmi & Aman
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic text-white mb-1">{game.title}</h1>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-xs">{game.publisher}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        
        {/* Step 1: Input Data */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f1225] rounded-2xl p-5 md:p-7 border border-white/5 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold font-display">1</span>
            <h2 className="text-xl font-bold">Masukkan Akun</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.inputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 ml-1">{input.label}</label>
                <input
                  type="text"
                  placeholder={input.placeholder}
                  value={inputs[input.id] || ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className="w-full bg-[#151a30] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Step 2: Pilih Nominal */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f1225] rounded-2xl p-5 md:p-7 border border-white/5 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold font-display">2</span>
            <h2 className="text-xl font-bold">Pilih Nominal</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {game.products.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`relative p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                  selectedProduct?.id === product.id 
                    ? 'bg-cyan-500/10 border-cyan-500 scale-[1.02]' 
                    : 'bg-[#151a30] border-white/10 hover:border-cyan-500/50 hover:bg-white/5'
                }`}
              >
                {selectedProduct?.id === product.id && (
                  <div className="absolute top-2 right-2 text-cyan-400">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
                
                <span className="font-black text-lg md:text-xl text-white">
                  {product.amount}
                </span>
                <span className="text-xs text-slate-400 uppercase font-semibold">
                  {game.currencyName}
                </span>
                
                {product.bonus ? (
                 <div className="absolute -top-3 inset-x-0 flex justify-center">
                   <div className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                     +{product.bonus} Bonus
                   </div>
                 </div>
                ) : null}

                <div className="w-full mt-2 pt-2 border-t border-white/10 text-cyan-400 font-mono font-bold text-sm">
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Step 3: Pilih Pembayaran */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f1225] rounded-2xl p-5 md:p-7 border border-white/5 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold font-display">3</span>
            <h2 className="text-xl font-bold">Metode Pembayaran</h2>
          </div>
          
          <div className="space-y-6">
            {(Object.entries(paymentCategories) as [string, PaymentMethod[]][]).map(([category, methods]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {methods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method)}
                      className={`relative flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedPayment?.id === method.id 
                          ? 'bg-cyan-500/10 border-cyan-500' 
                          : 'bg-[#151a30] border-white/10 hover:border-cyan-500/50 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-2 border border-white/10">
                          <img src={method.iconUrl} alt={method.name} className="max-w-full max-h-full" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white text-sm md:text-base">{method.name}</div>
                          {selectedProduct && (
                            <div className="text-xs text-slate-400 font-mono mt-0.5">
                              + Rp {(method.fee < 1 ? selectedProduct.price * method.fee : method.fee).toLocaleString('id-ID')}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment?.id === method.id ? 'border-cyan-400' : 'border-slate-600'
                      }`}>
                        {selectedPayment?.id === method.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Floating Checkout Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0a0c1a]/90 backdrop-blur-md border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-4 md:p-6 pb-safe">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Total Pembayaran</p>
            {selectedProduct && selectedPayment ? (
              <p className="text-2xl md:text-3xl text-cyan-400 font-bold font-mono">
                Rp {calculateTotal().toLocaleString('id-ID')}
              </p>
            ) : (
              <p className="text-lg md:text-2xl text-slate-500 font-bold font-mono">
                Rp 0
              </p>
            )}
          </div>
          
          <button
            onClick={handleCheckout}
            disabled={!isFormValid() || isProcessing}
            className={`px-8 py-3.5 md:py-4 rounded-xl font-bold text-lg md:text-xl transition-all flex items-center justify-center gap-2 min-w-[200px] ${
              isFormValid() && !isProcessing
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white hover:scale-105 active:scale-95' 
                : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              'Beli Sekarang'
            )}
          </button>
        </div>
      </div>

      {/* Checkout Processing / Success Modal */}
      <AnimatePresence>
        {(isProcessing || isSuccess || isInstruction || isVerifying) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={isSuccess ? handleCloseModal : undefined}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-[#0f1225] border border-cyan-500/20 rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-center overflow-hidden"
            >
              {(isProcessing || isVerifying) && (
                <div className="py-8">
                  <div className="mx-auto w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
                     <Loader2 size={32} className="text-cyan-400 animate-spin" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isVerifying ? "Mengecek Pembayaran..." : "Diproses Secara Real-Time"}
                  </h3>
                  <p className="text-cyan-400 text-sm font-mono animate-pulse">
                    {isVerifying ? "Mohon tunggu sebentar..." : processingTexts[processingStep]}
                  </p>
                </div>
              )}

              {isInstruction && selectedPayment && (
                 <div className="py-2 text-center">
                   <h3 className="text-xl font-black text-white mb-2">Selesaikan Pembayaran</h3>
                   <p className="text-slate-400 text-sm mb-6">Metode: <span className="text-white font-bold">{selectedPayment.name}</span></p>

                   {selectedPayment.category === 'QRIS' || selectedPayment.id === 'qris' ? (
                     <div className="bg-white p-4 rounded-xl inline-block mb-6 shadow-lg">
                       {/* Placeholder for real QR code */}
                       <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=NEXURA_PAYMENT_SIMULATION" alt="QRIS" className="w-40 h-40" />
                     </div>
                   ) : selectedPayment.category === 'E-Wallet' ? (
                     <div className="bg-[#151a30] border border-white/5 rounded-xl p-6 mb-6 flex flex-col items-center">
                        <img src={selectedPayment.iconUrl} alt={selectedPayment.name} className="w-16 h-16 mb-4 filter drop-shadow-md" />
                        <p className="text-slate-300 text-sm">Klik tombol di bawah untuk membuka aplikasi {selectedPayment.name} Anda.</p>
                     </div>
                   ) : (
                     <div className="bg-[#151a30] border border-white/5 rounded-xl p-4 mb-6 text-left">
                       <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Nomor Virtual Account</p>
                       <div className="flex items-center justify-between">
                         <p className="text-2xl font-mono text-cyan-400 font-bold">8800 1234 5678</p>
                       </div>
                     </div>
                   )}

                   <div className="bg-[#151a30] border border-white/5 rounded-xl p-4 mb-6">
                     <p className="text-slate-400 text-xs font-bold uppercase mb-1">Total Tagihan</p>
                     <p className="text-2xl font-bold font-mono text-white">Rp {calculateTotal().toLocaleString('id-ID')}</p>
                   </div>

                   <button
                     onClick={handleVerifyPayment}
                     className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-white transition-all shadow-lg mb-3"
                   >
                     Saya Sudah Bayar
                   </button>
                   <button
                     onClick={handleCloseModal}
                     className="w-full py-3.5 rounded-xl bg-transparent border border-white/10 hover:bg-white/5 font-bold text-slate-300 transition-all text-sm"
                   >
                     Batalkan Transaksi
                   </button>
                 </div>
              )}

              {isSuccess && (
                 <div className="py-4">
                   <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 ring-4 ring-green-500/10">
                     <CheckCircle2 size={32} className="text-green-400" />
                   </div>
                   <h3 className="text-2xl font-black italic text-white mb-2">Pembayaran Berhasil!</h3>
                   <p className="text-slate-400 text-sm mb-6">Terima kasih, pesanan {selectedProduct?.amount} {game.currencyName} Anda sedang diproses. Bukti pembayaran akan dikirim via email.</p>
                   
                   <div className="bg-[#151a30] border border-white/5 rounded-xl p-4 mb-6 text-left">
                     <div className="flex justify-between mb-2">
                       <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">No. Pesanan</span>
                       <span className="text-white font-mono text-sm">NEX-{Math.floor(Math.random() * 1000000)}</span>
                     </div>
                     <div className="flex justify-between mb-2">
                       <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Game</span>
                       <span className="text-white font-medium text-sm">{game.title}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total</span>
                       <span className="text-cyan-400 font-bold font-mono text-sm">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                     </div>
                   </div>

                   <button
                     onClick={handleCloseModal}
                     className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-white transition-all"
                   >
                     Tutup & Kembali
                   </button>
                 </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
