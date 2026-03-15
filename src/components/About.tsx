import { motion } from 'framer-motion';
import { Shield, Zap, Trophy } from 'lucide-react';

const FEATURES = [
  { icon: Shield,  label: 'Elite Equipment',  desc: 'World-class machines and free weights' },
  { icon: Zap,     label: 'Expert Coaches',   desc: 'Certified trainers who push limits' },
  { icon: Trophy,  label: 'Proven Results',   desc: '500+ life-changing transformations' },
];

export default function About() {
  return (
    <section id="about"
      className="px-6 pt-16 pb-28 md:px-10 md:pt-20 md:pb-36 lg:px-20 lg:pt-24 lg:pb-44 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-6 block">
            Who We Are
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-10 leading-[1.05]">
            About <span className="text-gradient">Dungeon Gym</span>
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-5 font-body">
            Born from the raw underground, Dungeon Gym is where strength meets discipline.
            We don't believe in shortcuts — only in the relentless pursuit of transformation.
          </p>
          <p className="text-foreground/70 leading-relaxed mb-8 font-body">
            Every rep, every set, every drop of sweat brings you closer to the warrior you were
            meant to be. This isn't just a gym. This is your battlefield.
          </p>

          {/* Feature pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                <div className="icon-circle mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground mb-1">{label}</p>
                <p className="font-body text-xs text-foreground/50">{desc}</p>
              </div>
            ))}
          </div>

          <div className="w-16 h-0.5 bg-primary mt-10" />
        </motion.div>

        {/* Right — images */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col gap-4"
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/assets/gym-interior-1-DwG0uYU7.jpg"
              alt="Dungeon Gym interior"
              className="w-full h-[350px] md:h-[450px] lg:h-[520px] object-cover rounded-2xl
                         transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src="/assets/gym-exterior-BfQyEFQi.jpg"
              alt="Dungeon Gym exterior"
              className="w-full h-28 md:h-36 object-cover rounded-xl
                         transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
