import { motion } from 'framer-motion';

const FACILITIES = [
  { label: 'Strength Zone',       img: '/assets/facility-strength-gHEzrOcj.jpg' },
  { label: 'Cardio Zone',         img: '/assets/facility-cardio-DCA4ey0A.jpg' },
  { label: 'Functional Training', img: '/assets/facility-functional-DMiIeSjC.jpg' },
  { label: 'Locker Area',         img: '/assets/facility-locker-Dld4LqP3.jpg' },
  { label: 'Heavy Equipment',     img: '/assets/facility-heavy-BykgRoFb.jpg' },
];

export default function Facilities() {
  return (
    <section id="facilities"
      className="px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-28 lg:px-20 lg:pt-24 lg:pb-36 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            World-Class Equipment
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Our <span className="text-gradient">Facilities</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FACILITIES.map(({ label, img }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="relative group image-hover-zoom rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Border hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/40 rounded-xl transition-all duration-500 z-10" />
              <img
                src={img}
                alt={label}
                className="w-full h-72 sm:h-80 object-cover"
              />
              {/* Label */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 font-heading text-lg uppercase tracking-widest text-white"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
