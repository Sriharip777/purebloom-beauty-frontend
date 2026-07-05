import { useState, useEffect } from 'react';
import { HiOutlineTrash, HiOutlineMail } from 'react-icons/hi';
import { subscriberAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subscriberAPI.getAll({ limit: 100 })
      .then((res) => setSubscribers(res.data.subscribers))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Remove this subscriber?')) return;
    try {
      await subscriberAPI.delete(id);
      setSubscribers(subscribers.filter((s) => s._id !== id));
      toast.success('Subscriber removed');
    } catch { toast.error('Error removing subscriber'); }
  };

  if (loading) return <div className="text-center py-12"><div className="w-10 h-10 border-4 border-navy/20 dark:border-navy-700 border-t-navy dark:border-t-navy-300 rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl lg:text-3xl text-navy dark:text-cream-100">Newsletter Subscribers</h1>
        <p className="text-sm text-navy/40 dark:text-navy-300 font-sans">{subscribers.length} subscribers</p>
      </div>

      <div className="bg-white dark:bg-navy-800 rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 dark:border-navy-700 text-left">
                <th className="px-4 py-3 text-xs font-medium text-navy/40 dark:text-navy-300 font-sans uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 dark:text-navy-300 font-sans uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 dark:text-navy-300 font-sans uppercase tracking-wider">Subscribed</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 dark:text-navy-300 font-sans uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub._id} className="border-b border-cream-100 dark:border-navy-700 hover:bg-cream-50 dark:hover:bg-navy-700 transition-colors">
                  <td className="px-4 py-3 text-sm font-sans text-navy dark:text-cream-100">{sub.name || '-'}</td>
                  <td className="px-4 py-3 text-sm font-sans text-navy/80 dark:text-navy-300">{sub.email}</td>
                  <td className="px-4 py-3 text-sm font-sans text-navy/40 dark:text-navy-300">{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(sub._id)} className="p-1.5 text-navy/40 dark:text-navy-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"><HiOutlineTrash size="15" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
