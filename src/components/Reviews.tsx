import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  { initials: 'RS', name: 'Rahul Sharma',  achievement: 'Lost 18kg in 5 months',        quote: 'Best gym environment in the city. The vibe is intense and motivating. Every session feels like a war — and I love it.', featured: true },
  { initials: 'PV', name: 'Priya Verma',   achievement: 'Gained lean muscle in 3 months', quote: 'Dungeon Gym is not just a gym, it\'s a lifestyle. The trainers push you beyond your limits. Akash sir is truly inspiring.' },
  { initials: 'AP', name: 'Arjun Patel',   achievement: 'Deadlift PR: 200kg',             quote: 'The equipment, the atmosphere, the coaching — everything is top notch. Best investment I\'ve made in my health.' },
  { initials: 'SK', name: 'Sneha Kapoor',  achievement: 'Complete body transformation',  quote: 'I was skeptical at first but Dungeon Gym completely changed my life. Lost 20kg and gained so much confidence!' },
  { initials: 'DY', name: 'Deepak Yadav',  achievement: 'Lost 25kg in 8 months',         quote: 'Hardcore gym with a community feel. The trainers genuinely care about your progress. I\'ve tried 5 gyms — this is the best.' },
  { initials: 'AS', name: 'Ananya Singh',  achievement: 'Strength doubled in 4 months',  quote: 'Amazing place to train. The red and black theme gives such a powerful vibe. I\'ve never been more motivated!' },
];

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-28 lg:px-20 lg:pt-24 lg:pb-36 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            What Members Say
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Member <span className="text-gradient">Reviews</span>
          </h2>
          {/* Rating badge */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            </div>
            <span className="font-heading text-xl font-bold">5.0</span>
            <span className="text-foreground/50 text-sm">Based on 200+ Google Reviews</span>
          </div>
        </motion.div>

        {/* Scrollable row */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-4 mt-10 cursor-grab select-none scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
          onMouseDown={e => {
            const el = trackRef.current!;
            let startX = e.pageX - el.offsetLeft;
            let scrollLeft = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              const x = ev.pageX - el.offsetLeft;
              el.scrollLeft = scrollLeft - (x - startX);
            };
            const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
          }}
        >
          {REVIEWS.map(r => (
            <div
              key={r.name}
              className={`flex-shrink-0 w-[320px] md:w-[340px] rounded-xl p-6 flex flex-col gap-4 transition-all duration-500
                bg-card border ${r.featured
                  ? 'border-primary/30 shadow-[0_0_30px_rgba(224,6,13,0.08)]'
                  : 'border-border hover:border-primary/30'}`}
            >
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed italic flex-1">"{r.quote}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-heading text-sm font-bold text-primary flex-shrink-0">
                  {r.initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold">{r.name}</p>
                  <p className="text-foreground/50 text-xs">{r.achievement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
