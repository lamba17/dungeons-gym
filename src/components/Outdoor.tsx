import { motion } from 'framer-motion';

const CARDS = [
  { label: 'BOOTCAMPS',         img: '/assets/outdoor-bootcamp-B8Iv-bAi.jpg' },
  { label: 'OUTDOOR WORKOUTS',  img: '/assets/outdoor-workout-CVcvWLsy.jpg' },
  { label: 'GROUP TRAINING',    img: '/assets/outdoor-group-Dwjb9TYM.jpg' },
];

export default function Outdoor() {
  return (
    <section id="outdoor"
      className="px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-28 lg:px-20 lg:pt-24 lg:pb-36 bg-background">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Beyond The Walls
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Outdoor <span className="text-gradient">Activities</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {CARDS.map(({ label, img }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="relative group image-hover-zoom rounded-xl overflow-hidden h-80 md:h-[420px] cursor-pointer"
            >
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/40 rounded-xl transition-all duration-500 z-10" />
              <img src={img} alt={label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="outdoor-card-overlay absolute inset-0" />
              <div className="absolute bottom-0 left-0 p-6 font-heading text-xl uppercase tracking-widest text-white z-10">
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
