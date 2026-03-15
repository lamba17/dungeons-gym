import { motion } from 'framer-motion';

const DATA = [
  {
    name: 'Rahul S.',
    img: '/assets/transform-1-BKPkLdc9.jpg',
    quote: 'Dungeon Gym changed my life. I went from skinny to strong in 6 months. The trainers here don\'t let you quit.',
  },
  {
    name: 'Vikram P.',
    img: '/assets/transform-2-D9r__3Ok.jpg',
    quote: 'Lost 30kg in one year at Dungeon Gym. The environment, the community, the coaching — everything is world class.',
  },
];

export default function Transformations() {
  return (
    <section id="transformations"
      className="px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-28 lg:px-20 lg:pt-24 lg:pb-36 bg-secondary/50">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Real Results
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Real <span className="text-gradient">Transformations</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DATA.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-2xl overflow-hidden border border-border"
            >
              {/* Before/After — same image, split in half */}
              <div className="relative h-[280px] overflow-hidden">
                <img src={t.img} alt="Before" className="absolute left-0 top-0 w-1/2 h-full object-cover object-left" />
                <img src={t.img} alt="After"  className="absolute right-0 top-0 w-1/2 h-full object-cover object-right" />
                {/* Red divider */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary z-10" />
                <span className="absolute top-3 left-3 font-heading text-xs uppercase tracking-widest bg-black/60 text-white px-2 py-1 rounded">
                  Before
                </span>
                <span className="absolute top-3 right-3 font-heading text-xs uppercase tracking-widest bg-primary/80 text-white px-2 py-1 rounded">
                  After
                </span>
              </div>
              {/* Quote */}
              <div className="p-6">
                <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-2">{t.name}</h4>
                <p className="text-foreground/60 text-sm italic leading-relaxed">"{t.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
