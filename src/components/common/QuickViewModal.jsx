import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineStar, HiOutlineExternalLink } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { productAPI, whatsappAPI } from '../../services/api';

export default function QuickViewModal({ product, open, onClose }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (!product) return null;

  const handleAffiliateClick = async () => {
    try {
      await productAPI.trackClick(product._id);
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = () => {
    whatsappAPI.track({ productId: product._id, productTitle: product.title, page: 'quick_view_modal' }).catch(() => {});
    window.open(
      `https://wa.me/919999999999?text=Hi PureBloom Beauty, I am interested in this product: ${product.title}`,
      '_blank'
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <HiOutlineX size="20" className="text-navy" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-cream-50 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                {(product.isTrending || product.isBestSeller || product.isDeal) && (
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    product.isDeal ? 'badge-deal' : product.isBestSeller ? 'badge-bestseller' : 'badge-trending'
                  }`}>
                    {product.isDeal ? 'Deal' : product.isBestSeller ? 'Best Seller' : 'Trending'}
                  </span>
                )}
              </div>

              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <p className="text-xs text-bloom-500 font-medium uppercase tracking-widest font-sans mb-1">
                  {product.category?.name || product.brand}
                </p>
                <h2 className="font-serif text-xl lg:text-2xl text-navy mb-3 leading-tight">{product.title}</h2>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <HiOutlineStar size="16" className="text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-navy font-sans">{product.rating}</span>
                    <span className="text-xs text-navy/40 font-sans">({product.reviewCount})</span>
                  </div>
                </div>

                <p className="text-sm text-navy/60 leading-relaxed font-sans mb-4">{product.shortDescription || product.description?.slice(0, 120)}</p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-2xl text-navy">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-navy/40 line-through font-sans">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  {product.discount > 0 && (
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-sans">{product.discount}% OFF</span>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button onClick={handleAffiliateClick} className="w-full btn-primary text-xs py-3">
                    <HiOutlineExternalLink size="14" className="mr-2" />
                    View on Amazon
                  </button>
                  <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-xs font-medium tracking-wider uppercase hover:bg-[#20bd5a] transition-all duration-300">
                    <FaWhatsapp size="14" />
                    Ask on WhatsApp
                  </button>
                  <button
                    onClick={() => isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product)}
                    className="w-full text-xs font-sans text-navy/60 hover:text-navy py-2 transition-colors"
                  >
                    {isInWishlist(product._id) ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
