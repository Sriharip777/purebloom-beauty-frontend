import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineX, HiOutlineStar, HiOutlineExternalLink } from 'react-icons/hi';
import { useCompare } from '../../context/CompareContext';
import { productAPI } from '../../services/api';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, count } = useCompare();

  const handleAffiliateClick = async (product) => {
    try {
      await productAPI.trackClick(product._id);
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="py-16 lg:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-3xl lg:text-5xl text-navy">Compare Products</h1>
            <p className="mt-2 text-navy/50 font-sans text-sm">Compare up to 3 products side by side</p>
          </div>
          {count > 0 && (
            <button onClick={clearCompare} className="text-xs text-navy/40 hover:text-red-500 font-sans underline underline-offset-2 transition-colors">
              Clear All
            </button>
          )}
        </motion.div>

        {count === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-navy/40 mb-4">No products to compare</p>
            <p className="text-sm text-navy/30 font-sans mb-8">Add products to compare them side by side</p>
            <Link to="/categories" className="btn-primary text-xs">Browse Products</Link>
          </div>
        ) : (
          <div className={`grid grid-cols-${Math.min(count, 3)} gap-6`} style={{ gridTemplateColumns: `repeat(${Math.min(count, 3)}, 1fr)` }}>
            {compareList.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream-50 rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <button onClick={() => removeFromCompare(product._id)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white">
                    <HiOutlineX size="14" className="text-navy" />
                  </button>
                  <div className="aspect-square overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-serif text-base text-navy">{product.title}</h3>
                  <div className="flex items-center gap-1">
                    <HiOutlineStar size="14" className="text-amber-400 fill-current" />
                    <span className="text-sm font-sans text-navy">{product.rating}</span>
                    <span className="text-xs text-navy/30 font-sans">({product.reviewCount})</span>
                  </div>
                  <div>
                    <span className="font-serif text-xl text-navy">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-navy/30 line-through font-sans ml-2">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-xs text-navy/50 font-sans leading-relaxed line-clamp-3">{product.description}</p>
                  <button onClick={() => handleAffiliateClick(product)} className="w-full btn-primary text-[10px] py-2.5">
                    <HiOutlineExternalLink size="12" className="mr-1" /> View on Amazon
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
