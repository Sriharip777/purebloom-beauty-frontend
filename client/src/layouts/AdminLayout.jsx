import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { CoolThemeToggle } from '../components/ui/CoolThemeToggle';
import {
  HiOutlineChartBar, HiOutlineShoppingBag, HiOutlineTag, HiOutlineMail,
  HiOutlineUsers, HiOutlineKey, HiOutlineLogout, HiOutlineMenu, HiOutlineX,
  HiOutlineHome, HiOutlineChevronLeft, HiOutlineBell, HiOutlineSearch,
  HiOutlineSun, HiOutlineMoon,
} from 'react-icons/hi';

const sidebarLinks = [
  { to: '/admin', icon: HiOutlineHome, label: 'Dashboard', exact: true },
  { to: '/admin/products', icon: HiOutlineShoppingBag, label: 'Products' },
  { to: '/admin/categories', icon: HiOutlineTag, label: 'Categories' },
  { to: '/admin/analytics', icon: HiOutlineChartBar, label: 'Analytics' },
  { to: '/admin/messages', icon: HiOutlineMail, label: 'Messages' },
  { to: '/admin/subscribers', icon: HiOutlineUsers, label: 'Subscribers' },
  { to: '/admin/change-password', icon: HiOutlineKey, label: 'Change Password' },
];

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' } }),
};

const activeIndicator = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-navy transition-colors duration-300">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl border-b border-cream-200 dark:border-navy-700 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-navy dark:text-cream-100 p-2 hover:bg-cream-100 dark:hover:bg-navy-800 rounded-xl transition-colors">
          {sidebarOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
        <Link to="/admin" className="font-serif text-lg tracking-wider text-navy dark:text-cream-100">PureBloom</Link>
        <CoolThemeToggle size="sm" />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.nav
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-72 h-full bg-white dark:bg-navy-900 border-r border-cream-200 dark:border-navy-700 p-6 pt-20 overflow-y-auto shadow-2xl"
            >
              <SidebarContent links={sidebarLinks} location={location} collapsed={false} onLogout={handleLogout} onNavClick={() => setSidebarOpen(false)} />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.div
        animate={{ width: collapsed ? 80 : 288 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-30"
      >
        <nav className="flex-1 bg-white dark:bg-navy-900 border-r border-cream-200 dark:border-navy-700 flex flex-col overflow-hidden shadow-xl dark:shadow-navy-950/50 relative">
          {/* Decorative gradient orb */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-bloom-200/20 dark:from-bloom-500/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-beige-200/20 dark:from-beige-500/10 to-transparent blur-2xl pointer-events-none" />

          {/* Brand */}
          <div className="relative flex items-center justify-between px-6 py-6 border-b border-cream-200 dark:border-navy-700">
            <AnimatePresence mode="wait">
              {!collapsed ? (
                <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Link to="/admin" className="font-serif text-xl text-navy dark:text-cream-100 tracking-wider">PureBloom</Link>
                  <p className="text-bloom-500 dark:text-bloom-400 text-[10px] mt-0.5 font-sans font-medium uppercase tracking-wider">Admin Panel</p>
                </motion.div>
              ) : (
                <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto">
                  <Link to="/admin" className="font-serif text-lg text-navy dark:text-cream-100">PB</Link>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-navy-400 dark:text-navy-500 hover:bg-cream-100 dark:hover:bg-navy-800 transition-colors"
            >
              <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <HiOutlineChevronLeft size={14} />
              </motion.div>
            </button>
          </div>

          {/* Nav links */}
          <div className="relative flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            <SidebarContent links={sidebarLinks} location={location} collapsed={collapsed} onLogout={handleLogout} />
          </div>

          {/* Bottom: theme toggle + user */}
          <div className="relative border-t border-cream-200 dark:border-navy-700 p-3 space-y-2">
            <div className="flex items-center justify-center">
              <CoolThemeToggle size="sm" />
            </div>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${collapsed ? 'justify-center' : ''}`}>
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-bloom-300 to-bloom-500 flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-white dark:ring-navy-900">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden">
                    <p className="text-xs font-medium text-navy dark:text-cream-100 font-sans truncate max-w-[120px]">{user?.name || 'Admin'}</p>
                    <p className="text-[9px] text-navy-400 dark:text-navy-500 font-sans truncate max-w-[120px]">{user?.email || ''}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Main content area */}
      <motion.div
        animate={{ paddingLeft: collapsed ? 80 : 288 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="transition-[padding] duration-300"
      >
        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border-b border-cream-200 dark:border-navy-700 px-8 py-3 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-bloom-400 to-beige-400" />
            <div>
              <p className="text-sm text-navy-500 dark:text-navy-400 font-sans">
                Welcome back, <span className="font-medium text-navy dark:text-cream-100">{user?.name || 'Admin'}</span>
              </p>
              <p className="text-[10px] text-navy-400 dark:text-navy-500 font-sans">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="text-xs text-navy-400 dark:text-navy-500 hover:text-navy dark:hover:text-cream-100 font-sans transition-colors px-4 py-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-navy-800 border border-transparent hover:border-cream-200 dark:hover:border-navy-700">
                View Site
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-navy-400 dark:text-navy-500 hover:text-rose-500 dark:hover:text-rose-400 font-sans px-4 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 transition-all"
            >
              <HiOutlineLogout size={14} /> Logout
            </motion.button>
          </div>
        </div>

        {/* Gradient accent line below top bar */}
        <div className="hidden lg:block h-0.5 bg-gradient-to-r from-bloom-300 via-beige-300 to-bloom-200 dark:from-bloom-500/30 dark:via-beige-500/30 dark:to-bloom-400/30" />

        {/* Page content */}
        <div className="p-4 lg:p-8 pt-[4.5rem] lg:pt-6">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}

function SidebarContent({ links, location, collapsed, onLogout, onNavClick }) {
  return (
    <>
      {links.map((link, i) => {
        const isActive = link.exact
          ? location.pathname === link.to
          : location.pathname.startsWith(link.to) && link.to !== '/admin';
        return (
          <motion.div
            key={link.to}
            variants={linkVariants}
            initial="hidden"
            animate="show"
            custom={i}
          >
            <Link
              to={link.to}
              onClick={onNavClick}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-all duration-200 group overflow-hidden ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'text-navy dark:text-white bg-gradient-to-r from-bloom-100/80 to-bloom-50/50 dark:from-bloom-500/20 dark:to-bloom-600/10 shadow-sm'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy dark:hover:text-cream-100 hover:bg-cream-100 dark:hover:bg-navy-800'
              }`}
            >
              {/* Active indicator pill */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-bloom-500 to-bloom-400 dark:from-bloom-400 dark:to-bloom-300 shadow-sm shadow-bloom-500/30"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ${
                isActive
                  ? ''
                  : 'group-hover:opacity-100 bg-gradient-to-r from-bloom-100/30 to-transparent dark:from-bloom-500/10'
              }`} />
              <link.icon size={collapsed ? 20 : 18} className="shrink-0 relative z-10" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="font-medium relative z-10"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {collapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-navy dark:bg-navy-800 text-white dark:text-cream-100 text-[10px] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 font-medium">
                  {link.label}
                </div>
              )}
            </Link>
          </motion.div>
        );
      })}

      <div className={`pt-3 mt-3 border-t border-cream-200 dark:border-navy-700 ${collapsed ? 'text-center' : ''}`}>
        <Link
          to="/"
          onClick={onNavClick}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans text-navy-400 dark:text-navy-500 hover:text-navy dark:hover:text-cream-100 hover:bg-cream-100 dark:hover:bg-navy-800 transition-all duration-200 group ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <HiOutlineLogout size={collapsed ? 20 : 18} className="shrink-0 group-hover:scale-110 transition-transform" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>Back to Site</motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </>
  );
}
