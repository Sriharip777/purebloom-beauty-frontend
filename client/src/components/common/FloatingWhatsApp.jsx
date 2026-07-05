import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappAPI } from '../../services/api';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    whatsappAPI.track({ page: 'floating_button' }).catch(() => {});
    window.open(
      'https://wa.me/919999999999?text=Hi PureBloom Beauty, I want to know more about your beauty recommendations.',
      '_blank'
    );
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:shadow-xl transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        aria-label="Chat on WhatsApp"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          <FaWhatsapp size="20" className="text-white" />
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
}
