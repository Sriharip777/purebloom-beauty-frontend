import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dashboardAPI } from '../../services/api';
import {
  HiOutlineShoppingBag, HiOutlineTag, HiOutlineMail, HiOutlineUsers,
  HiOutlineChartBar, HiOutlineEye, HiOutlineTrendingUp,
  HiOutlineArrowRight, HiOutlineSparkles,
} from 'react-icons/hi';

const statCards = [
  { key: 'totalProducts', label: 'Total Products', icon: HiOutlineShoppingBag, color: 'from-bloom-400 to-bloom-500', link: '/admin/products' },
  { key: 'totalCategories', label: 'Categories', icon: HiOutlineTag, color: 'from-beige-400 to-beige-500', link: '/admin/categories' },
  { key: 'totalMessages', label: 'Messages', icon: HiOutlineMail, color: 'from-bloom-300 to-bloom-400', link: '/admin/messages' },
  { key: 'unreadMessages', label: 'Unread', icon: HiOutlineEye, color: 'from-rose-400 to-rose-500', link: '/admin/messages' },
  { key: 'totalSubscribers', label: 'Subscribers', icon: HiOutlineUsers, color: 'from-beige-300 to-beige-400', link: '/admin/subscribers' },
  { key: 'totalClicks', label: 'Total Clicks', icon: HiOutlineChartBar, color: 'from-bloom-400 to-bloom-500', link: '/admin/analytics' },
  { key: 'trendingProducts', label: 'Trending', icon: HiOutlineTrendingUp, color: 'from-beige-400 to-beige-500', link: '/admin/products' },
  { key: 'todayClicks', label: "Today's Clicks", icon: HiOutlineSparkles, color: 'from-bloom-300 to-bloom-400', link: '/admin/analytics' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI.getStats()
      .then((res) => setStats(res.data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-navy dark:text-cream-100">Dashboard</h1>
          <p className="text-sm text-navy-400 dark:text-navy-500 font-sans mt-1">Platform overview at a glance</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-navy-400 dark:text-navy-500 font-sans bg-white dark:bg-navy-800 px-4 py-2 rounded-full border border-cream-200 dark:border-navy-700">
          <HiOutlineSparkles size="14" className="text-bloom-500" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statCards.map((card) => (
          <motion.div key={card.key} variants={cardVariants} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
            <Link to={card.link} className="relative block bg-white dark:bg-navy-800 rounded-2xl border border-cream-100 dark:border-navy-700 p-5 shadow-md hover:shadow-xl dark:shadow-navy-900/20 dark:hover:shadow-navy-900/50 hover:shadow-bloom-500/10 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-bloom-100/20 dark:from-bloom-500/5 to-transparent rounded-bl-full -z-0" />
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                <card.icon size="18" className="text-white" />
              </div>
              <p className="font-serif text-2xl text-navy dark:text-cream-100 relative z-10">
                {loading ? (
                  <span className="inline-block w-8 h-6 bg-cream-100 dark:bg-navy-700 rounded animate-pulse" />
                ) : (
                  <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {stats?.[card.key] ?? 0}
                  </motion.span>
                )}
              </p>
              <div className="flex items-center justify-between mt-1 relative z-10">
                <p className="text-xs text-navy-400 dark:text-navy-500 font-sans">{card.label}</p>
                <div className="w-5 h-5 rounded-full bg-bloom-100 dark:bg-bloom-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <HiOutlineArrowRight size="10" className="text-bloom-600 dark:text-bloom-400" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-navy-800 rounded-2xl border border-cream-100 dark:border-navy-700 p-6 shadow-md dark:shadow-navy-900/20"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-bloom-400 to-bloom-500" />
              <h3 className="font-serif text-lg text-navy dark:text-cream-100">Recent Messages</h3>
            </div>
            <Link to="/admin/messages" className="text-[10px] text-bloom-500 dark:text-bloom-400 hover:underline font-sans font-medium">View all</Link>
          </div>
          {stats?.recentMessages?.length > 0 ? (
            <div className="space-y-1">
              {stats.recentMessages.slice(0, 5).map((msg, i) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-cream-50 dark:hover:bg-navy-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bloom-200 to-bloom-300 dark:from-bloom-500/30 dark:to-bloom-600/30 flex items-center justify-center text-navy dark:text-cream-100 text-xs font-bold">
                      {msg.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy dark:text-cream-100 font-sans">{msg.name}</p>
                      <p className="text-xs text-navy-400 dark:text-navy-500 font-sans truncate max-w-[180px]">{msg.subject}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] px-2.5 py-1 rounded-full font-sans font-medium ${
                    msg.status === 'new'
                      ? 'bg-bloom-100 dark:bg-bloom-500/20 text-bloom-700 dark:text-bloom-300'
                      : msg.status === 'read'
                      ? 'bg-cream-100 dark:bg-navy-700 text-navy-400 dark:text-navy-500'
                      : 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400'
                  }`}>
                    {msg.status}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <HiOutlineMail size="32" className="mx-auto text-navy-200 dark:text-navy-700 mb-3" />
              <p className="text-sm text-navy-300 dark:text-navy-500 font-sans">No messages yet</p>
            </div>
          )}
        </motion.div>

        {/* Recent Clicks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-navy-800 rounded-2xl border border-cream-100 dark:border-navy-700 p-6 shadow-md dark:shadow-navy-900/20"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-beige-400 to-beige-500" />
              <h3 className="font-serif text-lg text-navy dark:text-cream-100">Recent Clicks</h3>
            </div>
            <Link to="/admin/analytics" className="text-[10px] text-bloom-500 dark:text-bloom-400 hover:underline font-sans font-medium">View all</Link>
          </div>
          {stats?.recentClicks?.length > 0 ? (
            <div className="space-y-1">
              {stats.recentClicks.slice(0, 5).map((click, i) => (
                <motion.div
                  key={click._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-cream-50 dark:hover:bg-navy-700 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-navy dark:text-cream-100 font-sans">{click.productTitle || click.type}</p>
                    <p className="text-xs text-navy-400 dark:text-navy-500 font-sans">{new Date(click.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="text-[9px] px-2.5 py-1 rounded-full bg-bloom-100 dark:bg-bloom-500/20 text-bloom-700 dark:text-bloom-300 font-sans font-medium uppercase">
                    {click.type}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <HiOutlineChartBar size="32" className="mx-auto text-navy-200 dark:text-navy-700 mb-3" />
              <p className="text-sm text-navy-300 dark:text-navy-500 font-sans">No clicks tracked yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
