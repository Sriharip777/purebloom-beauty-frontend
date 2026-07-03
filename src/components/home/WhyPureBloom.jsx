import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineHeart } from 'react-icons/hi2';

const reasons = [
  { icon: HiOutlineSparkles, title: 'Curated Selection', description: 'Every product is handpicked by beauty experts for quality and effectiveness.' },
  { icon: HiOutlineShieldCheck, title: 'Trusted Brands', description: 'We feature only reputable beauty brands with proven results and clean ingredients.' },
  { icon: HiOutlineTruck, title: 'Easy Amazon Access', description: 'Seamless redirect to Amazon for secure purchasing and fast delivery.' },
  { icon: HiOutlineHeart, title: 'Beauty Community', description: 'Join a community of beauty enthusiasts sharing tips, reviews, and recommendations.' },
];

export default function WhyPureBloom() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Why PureBloom</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight">
              Curated Beauty,<br />
              <span className="italic">Thoughtfully</span> Chosen
            </h2>
            <p className="mt-6 text-navy/60 font-sans leading-relaxed">
              At PureBloom Beauty, we believe that finding the right beauty products should be a joy, not a chore. 
              Our team carefully curates every product in our collection, ensuring that each item meets our standards 
              for quality, ingredients, and performance. Whether you are building a skincare routine or looking 
              for that perfect lip shade, we make discovery effortless and delightful.
            </p>
            <p className="mt-4 text-navy/50 font-sans text-sm">
              As an Amazon affiliate partner, every purchase you make supports our mission to bring you the best 
              in beauty — at no extra cost to you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-navy/10">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"
                alt="PureBloom Beauty curation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-[220px]">
              <p className="font-serif text-lg text-navy">50+</p>
              <p className="text-[10px] text-navy/40 uppercase tracking-widest font-sans">Premium Brands</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 lg:mt-24">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 lg:p-8 rounded-2xl bg-cream-50 hover:bg-cream-100 transition-colors duration-300"
            >
              <reason.icon className="text-bloom-400 mb-4" size="28" />
              <h3 className="font-serif text-lg text-navy mb-2">{reason.title}</h3>
              <p className="text-sm text-navy/50 font-sans leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
