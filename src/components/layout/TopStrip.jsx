import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';

export default function TopStrip() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-navy text-white/80 text-[11px] font-sans tracking-wider"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          <p className="hidden sm:block">Curated beauty picks for your everyday glow</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="mailto:srihariharipechettis@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <HiOutlineMail size="12" />
              <span className="hidden xs:inline">srihariharipechettis@gmail.com</span>
            </a>
            <a
              href="https://wa.me/919999999999?text=Hi PureBloom Beauty, I want to know more about your beauty recommendations."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <HiOutlinePhone size="12" />
              <span>Support</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
