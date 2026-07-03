import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../../services/api';
import ProductCard from '../common/ProductCard';

export default function BestSellersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ bestseller: 'true', limit: 4 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 lg:mb-16"
        >
          <div>
            <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Best Sellers</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight">Customer Favorites</h2>
          </div>
          <Link to="/best-sellers" className="hidden sm:inline-flex btn-outline text-xs px-6 py-2.5">
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden card-shadow animate-pulse">
                  <div className="aspect-[3/4] shimmer-bg" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 shimmer-bg rounded w-3/4" />
                    <div className="h-3 shimmer-bg rounded w-1/2" />
                    <div className="h-8 shimmer-bg rounded-full w-full" />
                  </div>
                </div>
              ))
            : products.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
