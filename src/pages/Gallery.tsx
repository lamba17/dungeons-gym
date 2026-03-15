import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Category = 'all' | 'interiors' | 'exterior' | 'transformations' | 'outdoor' | 'trainers';

const IMAGES = [
  { src: '/assets/gym-interior-1-DwG0uYU7.jpg',  alt: 'Gym interior with red lighting',    cat: 'interiors' as Category },
  { src: '/assets/gym-interior-2-CV-sh9sk.jpg',  alt: 'Weight room',                        cat: 'interiors' as Category },
  { src: '/assets/facility-strength-gHEzrOcj.jpg', alt: 'Strength zone',                    cat: 'interiors' as Category },
  { src: '/assets/facility-cardio-DCA4ey0A.jpg', alt: 'Cardio zone',                        cat: 'interiors' as Category },
  { src: '/assets/facility-functional-DMiIeSjC.jpg', alt: 'Functional training area',       cat: 'interiors' as Category },
  { src: '/assets/facility-locker-Dld4LqP3.jpg', alt: 'Locker area',                        cat: 'interiors' as Category },
  { src: '/assets/facility-heavy-BykgRoFb.jpg',  alt: 'Heavy equipment section',            cat: 'interiors' as Category },
  { src: '/assets/gym-exterior-BfQyEFQi.jpg',    alt: 'Dungeon Gym exterior',               cat: 'exterior' as Category },
  { src: '/assets/outdoor-bootcamp-B8Iv-bAi.jpg', alt: 'Bootcamps',                         cat: 'outdoor' as Category },
  { src: '/assets/outdoor-workout-CVcvWLsy.jpg', alt: 'Outdoor workouts',                   cat: 'outdoor' as Category },
  { src: '/assets/outdoor-group-Dwjb9TYM.jpg',   alt: 'Group training',                     cat: 'outdoor' as Category },
  { src: '/assets/transform-1-BKPkLdc9.jpg',     alt: 'Rahul S. transformation',            cat: 'transformations' as Category },
  { src: '/assets/transform-2-D9r__3Ok.jpg',     alt: 'Vikram P. transformation',           cat: 'transformations' as Category },
  { src: '/lovable-uploads/f4831424-e81a-4716-a96a-6902caceef03.png', alt: 'Akash Lamba — Founder & Head Coach', cat: 'trainers' as Category },
];

const TABS: { label: string; value: Category }[] = [
  { label: 'ALL',             value: 'all' },
  { label: 'INTERIORS',       value: 'interiors' },
  { label: 'EXTERIOR',        value: 'exterior' },
  { label: 'TRANSFORMATIONS', value: 'transformations' },
  { label: 'OUTDOOR',         value: 'outdoor' },
  { label: 'TRAINERS',        value: 'trainers' },
];

export default function Gallery() {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? IMAGES : IMAGES.filter(i => i.cat === active);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-32 pb-12 text-center px-6 md:px-10 lg:px-20">
        <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
          Our <span className="text-gradient">Gallery</span>
        </h1>
        <p className="text-foreground/50 font-body mb-6">The raw power and intensity of Dungeon Gym</p>
        <div className="w-16 h-1 bg-primary mx-auto" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 px-6 mb-10">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`font-heading text-sm uppercase tracking-[0.15em] px-6 py-2.5 rounded-lg transition-all duration-300 ${
              active === tab.value
                ? 'bg-primary text-white'
                : 'border border-border text-foreground/70 hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filtered.map(img => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="relative group image-hover-zoom rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                flex items-end p-4">
                  <p className="font-heading text-xs uppercase tracking-widest text-white bg-black/50 px-2 py-1 rounded">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
