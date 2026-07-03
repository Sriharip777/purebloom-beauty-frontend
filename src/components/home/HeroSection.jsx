import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-bloom-50">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-20 right-[10%] w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-bloom-200/20 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-bloom-100/30 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs lg:text-sm text-bloom-600 uppercase tracking-[0.2em] font-sans font-medium mb-4"
            >
              Curated Beauty Discovery
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-navy leading-[1.05] tracking-tight"
            >
              Discover Your
              <br />
              <span className="italic text-bloom-400">Natural</span> Glow
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base lg:text-lg text-navy/60 leading-relaxed font-sans max-w-lg mx-auto lg:mx-0"
            >
              Explore our curated collection of premium beauty products — from skincare essentials to luxury makeup, all handpicked to help you shine.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link to="/categories" className="btn-primary group">
                Explore Collection
                <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size="16" />
              </Link>
              <Link to="/about" className="text-sm text-navy/50 hover:text-navy font-sans underline underline-offset-4 transition-colors">
                Our Story
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-8 justify-center lg:justify-start"
            >
              {[
                { value: '200+', label: 'Products' },
                { value: '8', label: 'Categories' },
                { value: '5K+', label: 'Happy Users' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl lg:text-3xl text-navy">{stat.value}</p>
                  <p className="text-[10px] text-navy/40 uppercase tracking-widest font-sans mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="relative"
            >
              <motion.div
                style={{ y: y1 }}
                className="relative z-10 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-navy/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
                  alt="PureBloom Beauty"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl rotate-6"
              >
                <img
                  src="https://images.unsplash.com/photo-1570194065650-d99fb4b38d34?w=400"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-8 w-28 h-28 rounded-2xl overflow-hidden shadow-xl -rotate-3"
              >
                <img
                  src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
