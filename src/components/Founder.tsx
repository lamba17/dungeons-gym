import { motion } from 'framer-motion';
import { Award, Users, Star } from 'lucide-react';

export default function Founder() {
  return (
    <section className="px-6 pt-16 pb-28 md:px-10 md:pt-20 md:pb-36 lg:px-20 lg:pt-24 lg:pb-44 bg-secondary/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="order-1"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/40
                          shadow-[0_0_40px_rgba(224,6,13,0.15)]">
            <img
              src="/lovable-uploads/f4831424-e81a-4716-a96a-6902caceef03.png"
              alt="Akash Lamba — Founder"
              className="w-full h-[500px] lg:h-[600px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="order-2"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            The Visionary
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-2 leading-[1.05]">
            Meet The <span className="text-gradient">Founder</span>
          </h2>
          <p className="font-heading text-2xl font-bold uppercase tracking-wide mb-1 mt-4">
            AKASH LAMBA
          </p>
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-6">
            Founder &amp; Head Coach
          </p>

          <p className="text-foreground/80 leading-relaxed mb-6 font-body">
            With over a decade of experience in strength training and competitive fitness,
            Akash Lamba built Dungeon Gym with one mission: to create a space where ordinary
            people become extraordinary. His passion for fitness goes beyond lifting — it's
            about forging mental toughness, building discipline, and helping every member
            unlock their full potential. Under his guidance, hundreds of members have achieved
            transformations they never thought possible.
          </p>

          {/* Achievements */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Award,  val: '10+', lab: 'Years Experience' },
              { icon: Users,  val: '500+', lab: 'Members Trained' },
              { icon: Star,   val: '4.9★', lab: 'Google Rating' },
            ].map(({ icon: Icon, val, lab }) => (
              <div key={lab} className="bg-card border border-border rounded-xl p-4 text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="font-heading text-xl font-bold text-gradient">{val}</div>
                <div className="font-heading text-[0.65rem] uppercase tracking-wider text-foreground/50 mt-1">{lab}</div>
              </div>
            ))}
          </div>

          <div className="w-16 h-0.5 bg-primary" />
        </motion.div>
      </div>
    </section>
  );
}
