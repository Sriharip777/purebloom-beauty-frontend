import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappAPI } from '../../services/api';

export default function HomeContactSection() {
  const handleWhatsApp = () => {
    whatsappAPI.track({ page: 'home_contact_section' }).catch(() => {});
    window.open(
      'https://wa.me/919999999999?text=Hi PureBloom Beauty, I want to know more about your beauty recommendations.',
      '_blank'
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Get in Touch</p>
          <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight">
            We'd Love to <span className="italic">Hear</span> From You
          </h2>
          <p className="mt-4 text-navy/50 font-sans text-sm max-w-lg mx-auto">
            Have a question about a product, need a beauty recommendation, or just want to say hello? We are here for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="btn-primary text-xs group">
            <HiOutlineMail className="mr-2" size="16" />
            Send a Message
          </Link>
          <button onClick={handleWhatsApp} className="btn-outline text-xs flex items-center gap-2">
            <FaWhatsapp size="16" />
            Chat on WhatsApp
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-navy/30 text-xs font-sans"
        >
          Or email us directly at{' '}
          <a href="mailto:srihariharipechettis@gmail.com" className="text-navy/50 hover:text-navy underline underline-offset-2 transition-colors">
            srihariharipechettis@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
