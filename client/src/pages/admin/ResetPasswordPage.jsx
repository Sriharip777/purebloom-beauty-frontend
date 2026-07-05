import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await authAPI.resetPassword(token, { password });
      setDone(true);
      toast.success('Password reset successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-navy flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-navy-800 rounded-3xl shadow-xl dark:shadow-navy-950/50 p-8 lg:p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-navy dark:text-cream-100 tracking-wider">PureBloom</h1>
            <p className="text-bloom-500 dark:text-bloom-400 text-xs font-sans tracking-widest uppercase mt-1">Set New Password</p>
          </div>

          {done ? (
            <div className="text-center">
              <p className="text-sm text-navy/60 dark:text-navy-300 font-sans mb-6">Your password has been reset successfully.</p>
              <Link to="/admin/login" className="btn-primary text-xs">Login Now</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-navy/60 dark:text-navy-300 font-sans mb-1.5">New Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-cream-50 dark:bg-navy-800 rounded-xl border border-cream-200 dark:border-navy-700 focus:border-navy/30 dark:focus:border-navy-400 focus:outline-none font-sans text-sm text-navy dark:text-cream-100" placeholder="Min. 6 characters" />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy/60 dark:text-navy-300 font-sans mb-1.5">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-cream-50 dark:bg-navy-800 rounded-xl border border-cream-200 dark:border-navy-700 focus:border-navy/30 dark:focus:border-navy-400 focus:outline-none font-sans text-sm text-navy dark:text-cream-100" placeholder="Repeat password" />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary text-xs py-3 disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
