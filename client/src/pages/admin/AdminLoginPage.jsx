import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineEye, HiOutlineEyeOff, HiOutlineSparkles } from 'react-icons/hi';
import FluidChromeBackground from '../../components/ui/FluidChromeBackground';

const inputVariants = {
  focus: { scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  blur: { scale: 1 },
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please enter email and password'); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy dark:bg-navy flex items-center justify-center p-4 relative overflow-hidden">
      <FluidChromeBackground
        linesGradient={["#F4C6CE", "#f0abfc", "#c084fc", "#e9d5ff", "#f4c6ce"]}
        animationSpeed={0.6}
        bendRadius={2.0}
        bendStrength={-0.8}
        shininess={60}
        specStrength={0.8}
        transparentBg={true}
        className="opacity-80"
      />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white/80 dark:bg-navy-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl dark:shadow-navy-900/50 border border-white/50 dark:border-navy-700/50 p-8 lg:p-10 transition-colors duration-300"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-bloom-300 to-bloom-500 dark:from-bloom-400 dark:to-bloom-600 flex items-center justify-center shadow-lg shadow-bloom-200/50 dark:shadow-bloom-500/20"
            >
              <HiOutlineSparkles size="24" className="text-white" />
            </motion.div>
            <h1 className="font-serif text-2xl text-navy dark:text-cream-100 tracking-wider">PureBloom</h1>
            <p className="text-bloom-500 dark:text-bloom-400 text-xs font-sans tracking-[0.25em] uppercase mt-1 font-medium">Admin Panel</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-xs font-semibold text-navy-500 dark:text-navy-400 font-sans mb-1.5 uppercase tracking-wider">Email</label>
              <motion.div
                variants={inputVariants}
                animate={focusedField === 'email' ? 'focus' : 'blur'}
                className="relative"
              >
                <HiOutlineMail size="16" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300 dark:text-navy-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-10 pr-4 py-3 bg-cream-50 dark:bg-navy-800 rounded-xl border border-cream-200 dark:border-navy-700 focus:border-bloom-400 dark:focus:border-bloom-500 focus:outline-none font-sans text-sm text-navy dark:text-cream-100 placeholder:text-navy-300 dark:placeholder:text-navy-500 transition-all duration-300"
                  placeholder="admin@purebloom.com"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-xs font-semibold text-navy-500 dark:text-navy-400 font-sans mb-1.5 uppercase tracking-wider">Password</label>
              <motion.div
                variants={inputVariants}
                animate={focusedField === 'password' ? 'focus' : 'blur'}
                className="relative"
              >
                <HiOutlineLockClosed size="16" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300 dark:text-navy-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-10 pr-10 py-3 bg-cream-50 dark:bg-navy-800 rounded-xl border border-cream-200 dark:border-navy-700 focus:border-bloom-400 dark:focus:border-bloom-500 focus:outline-none font-sans text-sm text-navy dark:text-cream-100 placeholder:text-navy-300 dark:placeholder:text-navy-500 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-300 dark:text-navy-500 hover:text-navy dark:hover:text-cream-100 transition-colors"
                >
                  {showPassword ? <HiOutlineEyeOff size="16" /> : <HiOutlineEye size="16" />}
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-navy to-navy-800 dark:from-bloom-500 dark:to-bloom-600 text-white text-xs font-semibold tracking-[0.15em] uppercase overflow-hidden shadow-lg hover:shadow-navy/30 dark:hover:shadow-bloom-500/30 transition-all duration-300 disabled:opacity-50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <HiOutlineLockClosed size="14" />
                      Sign In
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </form>

          {/* Forgot password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-5 text-center"
          >
            <Link to="/admin/forgot-password" className="text-xs text-navy-400 dark:text-navy-500 hover:text-bloom-500 dark:hover:text-bloom-400 font-sans transition-colors duration-200">
              Forgot password?
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 pt-5 border-t border-cream-200 dark:border-navy-700 text-center"
          >
            <Link to="/" className="text-[10px] text-navy-300 dark:text-navy-500 hover:text-navy dark:hover:text-cream-100 font-sans transition-colors">
              &larr; Back to site
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
