import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryAPI } from '../../services/api';
import PageLoader from '../../components/ui/PageLoader';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryAPI.getAll()
      .then((res) => setCategories(res.data.categories))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-cream-50 to-white dark:from-navy dark:to-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="block w-12 h-0.5 bg-gradient-to-r from-bloom-300 to-bloom-500 mx-auto mb-6"
          />
          <p className="text-xs text-bloom-500 dark:text-bloom-400 uppercase tracking-[0.2em] font-sans font-medium mb-3">Browse</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-navy dark:text-cream-100">All Categories</h1>
          <p className="mt-4 text-navy/50 dark:text-cream-100/60 font-sans text-sm max-w-md mx-auto">
            Explore our curated beauty categories and find your perfect products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link to={`/categories/${cat.slug}`} className="group block relative aspect-[3/4] rounded-2xl overflow-hidden card-shadow card-shadow-hover">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent transition-opacity duration-500 group-hover:from-navy/90" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.h2
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.06 + 0.2 }}
                    className="font-serif text-xl lg:text-2xl text-white group-hover:translate-y-[-4px] transition-transform duration-300"
                  >
                    {cat.name}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.06 + 0.3 }}
                    className="flex items-center gap-2 mt-1"
                  >
                    <span className="inline-block w-6 h-[1px] bg-bloom-300 group-hover:w-10 transition-all duration-300" />
                    <p className="text-xs text-bloom-200 font-sans group-hover:text-white transition-colors duration-300">
                      {cat.productCount || 0} products
                    </p>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
