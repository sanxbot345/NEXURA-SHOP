import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/cancelled-popup-request') {
        setError("Proses login dibatalkan atau popup diblokir browser. Silakan coba lagi.");
      } else {
        setError(err.message);
      }
    }
  };

  const handleFacebook = async () => {
    try {
      await signInWithFacebook();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/cancelled-popup-request') {
        setError("Proses login dibatalkan atau popup diblokir browser. Silakan coba lagi. Pastikan Anda juga sudah mengaktifkan Facebook Login di Firebase Console.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0f1225] border border-cyan-500/20 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white italic mb-2">
              {isLogin ? "MASUK" : "DAFTAR"}
            </h2>
            <p className="text-slate-400">
              {isLogin ? "Silakan masuk ke akun Anda." : "Buat akun baru untuk transaksi yang lebih mudah."}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#151a30] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#151a30] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="********"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-white transition-all shadow-lg mt-2 disabled:opacity-50"
            >
              {loading ? "Memproses..." : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="shrink-0 px-4 text-sm text-slate-500">Atau masuk dengan</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-2 bg-white text-[#0f172a] font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button
              onClick={handleFacebook}
              className="flex items-center justify-center gap-2 bg-[#1877F2] text-white font-bold py-3 rounded-xl hover:bg-[#1864cc] transition-colors"
            >
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5" />
              Facebook
            </button>
          </div>

          <p className="text-center text-slate-400 text-sm">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 font-bold hover:underline"
            >
              {isLogin ? "Daftar sekarang" : "Masuk di sini"}
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
