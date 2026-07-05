import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import AuroraTextEffect from '../../components/ui/AuroraTextEffect';
import { contactAPI, whatsappAPI } from '../../services/api';
import toast from 'react-hot-toast';

const inputClasses = "w-full rounded-[20px] border border-[#c0c0c0] outline-none box-border px-4 py-3 font-sans text-sm text-navy placeholder:text-navy/30 transition-all duration-300 focus:border-bloom-400 focus:ring-2 focus:ring-bloom-200/50";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await contactAPI.send(form);
      toast.success(res.data.message || 'Message sent successfully!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    whatsappAPI.track({ page: 'contact_page' }).catch(() => {});
    window.open('https://wa.me/919999999999?text=Hi PureBloom Beauty, I want more details about your beauty recommendations.', '_blank');
  };

  return (
    <div className="py-16 lg:py-24 bg-white dark:bg-navy transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12 lg:mb-16">
          <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Get in Touch</p>
          <AuroraTextEffect
            text="Contact Us"
            className="bg-transparent"
            textClassName="font-serif !text-4xl lg:!text-6xl !text-navy dark:!text-white"
            fontSize="clamp(2.5rem, 6vw, 4rem)"
            colors={{ first: 'bg-bloom-300', second: 'bg-rose-300', third: 'bg-beige-300', fourth: 'bg-bloom-200' }}
          />
          <p className="mt-3 text-navy/50 dark:text-navy-300 font-sans text-sm max-w-lg mx-auto">
            Have a question, feedback, or need a beauty recommendation? We would love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -2 }}
            className="w-full max-w-[400px] mx-auto lg:mx-0 bg-white dark:bg-navy-800 shadow-[rgba(0,0,0,0.35)_0px_5px_15px] dark:shadow-[rgba(0,0,0,0.6)_0px_5px_25px] rounded-[10px] box-border p-[20px_30px] transition-shadow duration-300 hover:shadow-[rgba(0,0,0,0.4)_0px_8px_30px]"
          >
            <p className="text-center font-sans text-[28px] font-extrabold text-navy dark:text-cream-100 mb-2">
              Send a Message
            </p>

            <motion.form
              variants={stagger}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit}
              className="flex flex-col gap-[18px]"
            >
              <motion.div variants={fadeUp}>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name *" className={inputClasses} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email *" className={inputClasses} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={inputClasses} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject *" className={inputClasses} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Your Message *" className={`${inputClasses} resize-none`} />
              </motion.div>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="py-[10px] px-[15px] rounded-[20px] border-0 outline-0 bg-navy dark:bg-bloom-500 text-white dark:text-navy cursor-pointer shadow-[rgba(0,0,0,0.24)_0px_3px_8px] font-sans text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-navy-800 dark:hover:bg-bloom-400 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </motion.button>
            </motion.form>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-cream-50 dark:bg-navy-800 rounded-2xl p-6 lg:p-8 transition-shadow duration-300 hover:shadow-xl"
            >
              <h3 className="font-serif text-xl text-navy dark:text-cream-100 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-bloom-500 uppercase tracking-wider font-sans font-medium mb-1">Email</p>
                  <a href="mailto:srihariharipechettis@gmail.com" className="text-sm text-navy/70 dark:text-navy-300 hover:text-navy dark:hover:text-cream-100 font-sans transition-colors">
                    srihariharipechettis@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-bloom-500 uppercase tracking-wider font-sans font-medium mb-1">Response Time</p>
                  <p className="text-sm text-navy/60 dark:text-navy-400 font-sans">We typically respond within 24 hours</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl p-6 lg:p-8 border border-[#25D366]/20 bg-gradient-to-br from-[#25D366]/10 via-[#25D366]/5 to-transparent dark:from-[#25D366]/15 dark:to-navy-900 shadow-lg hover:shadow-[#25D366]/20 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#25D366]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="shrink-0 w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30"
                >
                  <FaWhatsapp size="18" className="text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl text-navy dark:text-cream-100 mb-1">Chat on WhatsApp</h3>
                  <p className="text-sm text-navy/60 dark:text-navy-400 font-sans mb-4">
                    Prefer instant messaging? Reach us on WhatsApp for quick responses.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleWhatsApp}
                    className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase overflow-hidden shadow-md hover:shadow-[#25D366]/40 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <FaWhatsapp size="18" className="group-hover:rotate-[-8deg] transition-transform duration-300" />
                    Start WhatsApp Chat
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
