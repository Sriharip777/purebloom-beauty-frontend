import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineStar, HiOutlineExternalLink, HiOutlineEye, HiOutlineHeart } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { productAPI, whatsappAPI } from '../../services/api';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product, index = 0 }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const inWishlist = isInWishlist(product._id);
  const inCompare = isInCompare(product._id);

  const handleAffiliateClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await productAPI.trackClick(product._id);
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    whatsappAPI.track({ productId: product._id, productTitle: product.title, page: 'product_card' }).catch(() => {});
    window.open(`https://wa.me/919999999999?text=Hi PureBloom Beauty, I am interested in this product: ${product.title}`, '_blank');
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-all duration-500"
      >
        <Link to={`/products/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-cream-50">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            {discount > 0 && (
              <motion.span
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  product.isDeal ? 'bg-red-500 text-white' : product.isBestSeller ? 'bg-navy text-white' : product.isTrending ? 'bg-bloom-200 text-navy' : 'bg-navy text-white'
                }`}
              >
                {product.isDeal ? `-${discount}%` : product.isBestSeller ? 'Best Seller' : product.isTrending ? 'Trending' : `-${discount}%`}
              </motion.span>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true); }}
                className="flex-1 bg-white/95 backdrop-blur-sm text-navy text-[10px] font-medium py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:bg-white transition-all font-sans"
              >
                <HiOutlineEye size="12" /> Quick View
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-9 h-9 bg-[#25D366]/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#25D366] transition-all"
              >
                <FaWhatsapp size="14" className="text-white" />
              </button>
            </motion.div>

            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); inWishlist ? removeFromWishlist(product._id) : addToWishlist(product); }}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                inWishlist ? 'bg-red-50 text-red-500' : 'bg-white/90 text-navy/40 hover:text-red-400'
              }`}
            >
              <HiOutlineHeart size="16" className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>
        </Link>

        <div className="p-4 lg:p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Link to={`/products/${product.slug}`} className="flex-1 min-w-0">
              <h3 className="font-serif text-sm lg:text-base text-navy leading-tight truncate hover:text-bloom-500 transition-colors">
                {product.title}
              </h3>
            </Link>
          </div>

          {product.shortDescription && (
            <p className="text-[11px] text-navy/40 font-sans mb-2 line-clamp-1">{product.shortDescription}</p>
          )}

          <div className="flex items-center gap-1.5 mb-2">
            <HiOutlineStar size="12" className="text-amber-400 fill-current" />
            <span className="text-xs font-medium text-navy font-sans">{product.rating}</span>
            <span className="text-[10px] text-navy/30 font-sans">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="font-serif text-lg text-navy">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-navy/30 line-through font-sans">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <label className="flex items-center gap-1.5 cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={inCompare}
                onChange={() => inCompare ? removeFromCompare(product._id) : addToCompare(product)}
                className="w-3 h-3 rounded border-navy/30 text-navy focus:ring-navy"
              />
              <span className="text-[10px] text-navy/40 font-sans">Compare</span>
            </label>
          </div>

          <button
            onClick={handleAffiliateClick}
            className="w-full mt-2 bg-navy text-white text-[10px] font-medium py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:bg-navy-700 transition-all duration-300 tracking-wider uppercase font-sans"
          >
            <HiOutlineExternalLink size="12" /> View on Amazon
          </button>
        </div>
      </motion.div>

      <QuickViewModal product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}
