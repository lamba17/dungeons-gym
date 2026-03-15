import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { PlanType, PLAN_PRICES } from '../lib/types';

const PLANS = [
  { id: 'monthly'   as PlanType, label: 'Monthly',          price: '₹1,999/mo',     desc: 'Best for starters' },
  { id: 'quarterly' as PlanType, label: 'Quarterly',        price: '₹4,999/3 mo',   desc: 'Most popular', popular: true },
  { id: 'annual'    as PlanType, label: 'Annual',           price: '₹14,999/yr',    desc: 'Best value' },
  { id: 'personal'  as PlanType, label: 'Personal Training',price: '₹7,999/mo',     desc: 'Dedicated coach' },
];

export default function Signup() {
  const [params]  = useSearchParams();
  const navigate  = useNavigate();
  const { addMember } = useData();
  const { loginMember } = useAuth();

  const [name,     setName]     = useState('');
  const [phone,    setPhone]    = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [plan,     setPlan]     = useState<PlanType>((params.get('plan') as PlanType) || 'monthly');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [step,     setStep]     = useState<1|2>(1);

  useEffect(() => {
    const p = params.get('plan') as PlanType;
    if (p && ['monthly','quarterly','annual','personal'].includes(p)) setPlan(p);
  }, [params]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) { setError('Please fill all fields.'); return; }
    if (phone.length < 10) { setError('Enter a valid 10-digit phone number.'); return; }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const res = addMember({ name, phone, email, password, plan });
    if (!res.ok) { setError(res.error || 'Signup failed'); setLoading(false); return; }

    // Auto login
    loginMember(email, password);
    navigate('/dashboard');
  };

  const selectedPlan = PLANS.find(p => p.id === plan)!;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16"
         style={{ backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(224,6,13,0.05) 0%, transparent 70%)' }}>

      <Link to="/" className="fixed top-6 left-8 font-heading text-sm uppercase tracking-[0.15em] text-foreground/50 hover:text-primary transition-colors">
        ← Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-heading text-3xl font-bold uppercase tracking-[0.15em] block mb-6">
            <span className="text-gradient">Dungeon</span> <span className="text-foreground">Gym</span>
          </Link>
          <h1 className="font-heading text-2xl uppercase tracking-tight">Join The Dungeon</h1>
          <p className="text-foreground/50 text-sm mt-2 font-body">Start your transformation today.</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-sm font-bold transition-all
                ${step >= s ? 'bg-primary text-white' : 'bg-card border border-border text-foreground/40'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`font-heading text-xs uppercase tracking-wider ${step >= s ? 'text-foreground' : 'text-foreground/30'}`}>
                {s === 1 ? 'Your Info' : 'Select Plan'}
              </span>
              {s < 2 && <div className={`w-8 h-0.5 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          {/* Step 1 — Personal info */}
          {step === 1 && (
            <form onSubmit={handleNext} className="flex flex-col gap-5">
              <div>
                <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Rahul Sharma" required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body
                             placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" required maxLength={10}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body
                             placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body
                             placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Create a strong password" required minLength={6}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body pr-11
                               placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 text-sm text-primary">{error}</div>}
              <button type="submit" className="btn-primary-premium py-3 text-sm w-full mt-1">Next — Choose Plan →</button>
              <p className="text-center text-sm text-foreground/50 font-body">
                Already a member?{' '}
                <Link to="/login" className="text-primary hover:underline font-heading text-xs uppercase tracking-wider">Login</Link>
              </p>
            </form>
          )}

          {/* Step 2 — Plan selection */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                {PLANS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`relative text-left p-4 rounded-xl border transition-all duration-300
                      ${plan === p.id ? 'border-primary bg-primary/10' : 'border-border bg-background hover:border-primary/40'}`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2 left-3 bg-primary text-white font-heading text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    {plan === p.id && (
                      <Check className="absolute top-3 right-3 w-4 h-4 text-primary" />
                    )}
                    <p className="font-heading text-xs uppercase tracking-wider text-foreground/60 mb-1">{p.label}</p>
                    <p className="font-heading text-lg font-bold text-primary">{p.price}</p>
                    <p className="text-xs text-foreground/40 font-body mt-1">{p.desc}</p>
                  </button>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-background border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-heading text-xs uppercase tracking-wider text-foreground/50">You're joining with</p>
                  <p className="font-heading text-base font-bold mt-0.5">{selectedPlan.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-foreground/50 text-xs font-body">Total today</p>
                  <p className="font-heading text-xl font-bold text-gradient">
                    ₹{PLAN_PRICES[plan].toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {error && <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 text-sm text-primary">{error}</div>}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="btn-outline-premium py-3 text-sm flex-1">← Back</button>
                <button type="submit" disabled={loading} className="btn-primary-premium py-3 text-sm flex-1">
                  {loading ? 'Creating Account…' : 'Create Account & Pay →'}
                </button>
              </div>

              <p className="text-center text-xs text-foreground/30 font-body">
                By joining you agree to our terms and conditions.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
