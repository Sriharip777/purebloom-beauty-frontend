import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineMenu, HiOutlineX, HiOutlineArrowsExpand } from 'react-icons/hi';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { categoryAPI } from '../../services/api';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/categories' },
  { label: 'Trending', to: '/trending' },
  { label: 'Best Sellers', to: '/best-sellers' },
  { label: 'Deals', to: '/deals' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [megaOpen, setMegaOpen] = useState(false);
  const navigate = useNavigate();
  const { count: wishlistCount } = useWishlist();
  const { count: compareCount } = useCompare();
  const searchRef = useRef(null);
  const megaTimeout = useRef(null);

  useEffect(() => {
    categoryAPI.getAll().then((res) => setCategories(res.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="font-serif text-xl lg:text-2xl tracking-[0.15em] text-navy group-hover:opacity-80 transition-opacity">
                PureBloom
              </span>
              <span className="font-serif text-xl lg:text-2xl tracking-[0.15em] text-bloom-400"> Beauty</span>
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {link.label === 'Categories' ? (
                  <div
                    className="relative"
                    onMouseEnter={() => { clearTimeout(megaTimeout.current); setMegaOpen(true); }}
                    onMouseLeave={() => { megaTimeout.current = setTimeout(() => setMegaOpen(false), 200); }}
                  >
                    <Link to={link.to} className="nav-link">{link.label}</Link>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-xl border border-cream-200 p-6 min-w-[500px]"
                          onMouseEnter={() => clearTimeout(megaTimeout.current)}
                          onMouseLeave={() => setMegaOpen(false)}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {categories.map((cat) => (
                              <Link
                                key={cat._id}
                                to={`/categories/${cat.slug}`}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-50 transition-colors group"
                                onClick={() => setMegaOpen(false)}
                              >
                                {cat.image && (
                                  <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg object-cover" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-navy group-hover:text-bloom-500 font-sans">{cat.name}</p>
                                  <p className="text-[10px] text-navy/40 font-sans">{cat.productCount || 0} products</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to={link.to} className="nav-link">{link.label}</Link>
                )}
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-navy/60 hover:text-navy transition-colors"
              aria-label="Search"
            >
              <HiOutlineSearch size="20" />
            </button>

            <Link to="/compare" className="relative p-2 text-navy/60 hover:text-navy transition-colors hidden sm:block">
              <HiOutlineArrowsExpand size="20" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-navy text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              )}
            </Link>

            <Link to="/wishlist" className="relative p-2 text-navy/60 hover:text-navy transition-colors">
              <HiOutlineHeart size="20" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-navy text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/contact" className="hidden lg:inline-flex btn-primary text-[10px] px-5 py-2.5">
              Get in Touch
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy"
              aria-label="Menu"
            >
              {mobileOpen ? <HiOutlineX size="24" /> : <HiOutlineMenu size="24" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cream-200 bg-white overflow-hidden"
          >
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-4 py-4">
              <div className="relative">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" size="20" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search beauty products..."
                  className="w-full pl-12 pr-4 py-3.5 bg-cream-50 rounded-full border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/30"
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-cream-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-navy/80 hover:bg-cream-50 rounded-xl font-sans text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link to="/compare" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-navy/80 hover:bg-cream-50 rounded-xl font-sans text-sm">
                  Compare ({compareCount})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
