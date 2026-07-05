import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryAPI } from '../../services/api';
import ImageSlider3D from '../common/ImageSlider3D';

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryAPI.getAll()
      .then((res) => setCategories(res.data.categories))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cats = categories.map((cat) => ({
    src: cat.image || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <section className="py-24 lg:py-28 bg-gradient-to-b from-white to-cream-50 dark:from-navy dark:to-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="block w-12 h-0.5 bg-gradient-to-r from-bloom-300 to-bloom-500 mx-auto mb-6"
          />
          <h2 className="text-4xl lg:text-5xl font-serif bg-gradient-to-r from-navy via-bloom-600 to-bloom-500 dark:from-cream-100 dark:via-bloom-300 dark:to-bloom-400 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="mt-4 text-navy/50 dark:text-cream-100/60 font-sans text-sm max-w-lg mx-auto leading-relaxed">
            Explore our curated beauty categories, handpicked for your everyday glow
          </p>
        </motion.div>

        {loading ? (
          <div className="max-w-md mx-auto aspect-[3/4] shimmer-bg rounded-2xl" />
        ) : (
          <ImageSlider3D
            images={cats}
            duration={30}
            cardWidth="22em"
            cardAspectRatio="3/4"
            perspective="56em"
            rotationDirection="left"
            linkTo={(img) => `/categories/${img.slug}`}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link to="/categories" className="group inline-flex items-center gap-2 text-xs font-sans font-medium text-navy/60 dark:text-cream-100/50 hover:text-bloom-600 dark:hover:text-bloom-400 transition-colors">
            View All Categories
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >→</motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
