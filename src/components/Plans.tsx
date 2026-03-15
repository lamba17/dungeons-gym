import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  featured: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '₹1,999',
    period: '/month',
    featured: false,
    features: [
      'Full gym access',
      'Locker facility',
      'Free Wi-Fi',
      'Basic fitness assessment',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: '₹4,999',
    period: '/3 months',
    featured: true,
    features: [
      'Full gym access',
      'Locker facility',
      'Free Wi-Fi',
      'Diet consultation',
      '1 personal training session',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '₹14,999',
    period: '/year',
    featured: false,
    features: [
      'Full gym access',
      'Locker facility',
      'Free Wi-Fi',
      'Monthly diet plans',
      '4 personal training sessions',
      'Priority booking',
    ],
  },
  {
    id: 'personal',
    name: 'Personal Training',
    price: '₹7,999',
    period: '/month',
    featured: false,
    features: [
      'Dedicated personal trainer',
      'Custom workout plans',
      'Nutrition coaching',
      'Progress tracking',
      'Unlimited gym access',
      'Recovery guidance',
    ],
  },
];

export default function Plans() {
  return (
    <section id="plans"
      className="px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-28 lg:px-20 lg:pt-24 lg:pb-36 bg-secondary/50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Choose Your Path
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Membership <span className="text-gradient">Plans</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {PLANS.map(plan => (
            <motion.div
              key={plan.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className={`relative bg-card rounded-xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-2
                ${plan.featured
                  ? 'red-border-glow ring-1 ring-primary/30'
                  : 'border border-border hover:border-primary/30'}`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white
                                font-heading text-xs uppercase tracking-[0.2em] px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <p className="font-heading text-xs uppercase tracking-[0.3em] text-primary mb-3">{plan.name}</p>

              <div className="flex items-end gap-1 mb-6">
                <span className="font-heading text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-foreground/50 text-sm mb-1 font-body">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground/80 font-body">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={`/signup?plan=${plan.id}`}
                className={`${plan.featured ? 'btn-primary-premium' : 'btn-outline-premium'} w-full py-3 mt-auto text-center text-sm`}
              >
                Join Now
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
