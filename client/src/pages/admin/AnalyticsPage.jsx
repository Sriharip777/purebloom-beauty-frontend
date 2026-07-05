import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { analyticsAPI } from '../../services/api';
import { HiOutlineChartBar, HiOutlineCursorClick, HiOutlineMail, HiOutlineUsers, HiOutlineTrendingUp } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.get()
      .then((res) => setAnalytics(res.data.analytics))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12"><div className="w-10 h-10 border-4 border-navy/20 dark:border-navy-700 border-t-navy dark:border-t-navy-300 rounded-full animate-spin mx-auto" /></div>;

  const summaryCards = [
    { label: 'Affiliate Clicks', value: analytics?.totalAffiliateClicks || 0, icon: HiOutlineCursorClick, color: 'bg-bloom-100 dark:bg-bloom-500/20 text-bloom-600 dark:text-bloom-400' },
    { label: 'WhatsApp Clicks', value: analytics?.totalWhatsappClicks || 0, icon: FaWhatsapp, color: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' },
    { label: 'Contact Submissions', value: analytics?.totalContactSubmissions || 0, icon: HiOutlineMail, color: 'bg-cream-200 dark:bg-navy-700 text-navy dark:text-cream-100' },
    { label: 'Newsletter Subscribers', value: analytics?.totalNewsletterSubscribers || 0, icon: HiOutlineUsers, color: 'bg-bloom-100 dark:bg-bloom-500/20 text-bloom-600 dark:text-bloom-400' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-bloom-400 to-bloom-500" />
          <h1 className="font-serif text-2xl lg:text-3xl text-navy dark:text-cream-100">Analytics</h1>
        </div>
        <p className="text-sm text-navy/40 dark:text-navy-300 font-sans mb-8">Track your platform performance</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-navy-800 rounded-2xl card-shadow p-5 hover:shadow-lg transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3 shadow-sm`}>
                <card.icon size="18" />
              </div>
              <p className="font-serif text-2xl text-navy dark:text-cream-100">{card.value.toLocaleString()}</p>
              <p className="text-xs text-navy/40 dark:text-navy-300 font-sans mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-navy-800 rounded-2xl card-shadow p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-bloom-100/20 dark:from-bloom-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <h3 className="font-serif text-lg text-navy dark:text-cream-100 mb-4 flex items-center gap-2">
              <HiOutlineTrendingUp size="18" className="text-bloom-500 dark:text-bloom-400" /> Top Products
            </h3>
            {analytics?.topClickedProducts?.length > 0 ? (
              <div className="space-y-3">
                {analytics.topClickedProducts.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-cream-100 dark:border-navy-700 last:border-0">
                    <span className="text-sm font-sans text-navy dark:text-cream-100 truncate max-w-[250px]">{item._id || 'Unknown'}</span>
                    <span className="text-sm font-sans text-navy/60 dark:text-navy-300 font-medium">{item.count} clicks</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-navy/30 dark:text-navy-500 font-sans">No data yet</p>}
          </div>

          <div className="bg-white dark:bg-navy-800 rounded-2xl card-shadow p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-beige-100/20 dark:from-beige-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <h3 className="font-serif text-lg text-navy dark:text-cream-100 mb-4">Top Categories</h3>
            {analytics?.topCategories?.length > 0 ? (
              <div className="space-y-3">
                {analytics.topCategories.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-cream-100 dark:border-navy-700 last:border-0">
                    <span className="text-sm font-sans text-navy dark:text-cream-100">{item._id}</span>
                    <span className="text-sm font-sans text-navy/60 dark:text-navy-300">{item.count} clicks</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-navy/30 dark:text-navy-500 font-sans">No data yet</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
