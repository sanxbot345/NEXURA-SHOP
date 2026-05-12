import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const faqs = [
  {
    q: "Berapa lama proses top-up masuk ke akun?",
    a: "Proses top-up berjalan secara otomatis (Real-time). Item akan langsung masuk ke akun Anda dalam hitungan detik setelah pembayaran berhasil diverifikasi oleh sistem."
  },
  {
    q: "Apakah aman top-up di Nexura?",
    a: "Sangat aman. Nexura adalah mitra resmi dari publisher game sehingga setiap transaksi 100% legal dan akun Anda aman dari risiko banned."
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima berbagai metode pembayaran termasuk E-Wallet (OVO, GoPay, DANA, ShopeePay), QRIS, Transfer Bank (BCA, Mandiri, BNI, BRI), hingga Minimarket (Alfamart, Indomaret)."
  },
  {
    q: "Bagaimana jika pesanan saya belum masuk?",
    a: "Jika dalam 15 menit item belum masuk, Anda dapat menghubungi Customer Service kami melalui widget Chatbot (NEXURA AI) atau WhatsApp dengan menyertakan Invoice pesanan Anda."
  }
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="w-20 h-20 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
          <HelpCircle size={40} className="text-cyan-400" />
        </div>
        <h2 className="text-3xl font-black italic text-white mb-3">Frequently Asked Questions</h2>
        <p className="text-slate-400 max-w-xl mx-auto">Jawaban cepat untuk beberapa pertanyaan yang paling sering ditanyakan oleh pelanggan Nexura.</p>
      </motion.div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }} 
            key={idx}
            className="bg-[#0f1225] border border-white/5 rounded-2xl overflow-hidden"
          >
            <button 
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
              className="w-full text-left p-5 md:p-6 flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none"
            >
              <span className="font-bold text-lg pr-8">{faq.q}</span>
              <ChevronDown 
                size={24} 
                className={`text-cyan-500 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-5 md:p-6 pt-0 text-slate-400 border-t border-white/5 mt-2">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
