import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';

export default function DealsBand() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-bloom-50">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <motion.div style={{ y }} className="absolute top-0 right-0 w-96 h-96 bg-bloom-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-xs text-bloom-600 uppercase tracking-[0.2em] font-sans font-medium mb-4">Limited Time</p>
          <h2 className="font-serif text-4xl lg:text-6xl xl:text-7xl text-navy leading-tight">
            Exclusive Beauty
            <br />
            <span className="italic">Deals</span> Await
          </h2>
          <p className="mt-6 text-navy/60 font-sans max-w-lg mx-auto text-base lg:text-lg">
            Discover handpicked beauty products at special prices. From skincare essentials to makeup must-haves — your glow-up starts here.
          </p>

          <div className="mt-8">
            <Link to="/deals" className="btn-primary group text-xs">
              Shop Deals
              <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size="16" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-4 lg:gap-8"
        >
          {[
            'https://images.unsplash.com/photo-1570194065650-d99fb4b38d34?w=200',
            'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200',
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200',
          ].map((src, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              className={`w-20 h-20 lg:w-28 lg:h-28 rounded-2xl overflow-hidden shadow-lg ${i === 1 ? '-mt-4' : ''}`}
            >
              <img src={src} alt="Product" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
