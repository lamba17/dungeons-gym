import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [tab, setTab]           = useState<'member' | 'admin'>('member');
  const [identifier, setId]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { loginMember, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate async

    if (tab === 'member') {
      const res = loginMember(identifier, password);
      if (res.ok) navigate('/dashboard');
      else setError(res.error || 'Login failed');
    } else {
      const res = loginAdmin(identifier, password);
      if (res.ok) navigate('/admin');
      else setError(res.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4"
         style={{ backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(224,6,13,0.05) 0%, transparent 70%)' }}>

      {/* Back link */}
      <Link to="/" className="fixed top-6 left-8 font-heading text-sm uppercase tracking-[0.15em] text-foreground/50 hover:text-primary transition-colors">
        ← Dungeon Gym
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="font-heading text-3xl font-bold uppercase tracking-[0.15em] block mb-6">
            <span className="text-gradient">Dungeon</span> <span className="text-foreground">Gym</span>
          </Link>
          <h1 className="font-heading text-2xl uppercase tracking-tight">Welcome Back</h1>
          <p className="text-foreground/50 text-sm mt-2 font-body">Enter the dungeon. Forge your legacy.</p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-card border border-border rounded-xl p-1 mb-6">
          {(['member', 'admin'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setId(''); setPassword(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-heading text-xs uppercase tracking-[0.15em] transition-all duration-300
                ${tab === t ? 'bg-primary text-white' : 'text-foreground/50 hover:text-foreground'}`}
            >
              {t === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {t === 'member' ? 'Member' : 'Admin'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-5">
          <div>
            <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">
              {tab === 'member' ? 'Email or Phone Number' : 'Admin Email'}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={e => setId(e.target.value)}
              placeholder={tab === 'member' ? 'rahul@example.com or 9876543210' : 'admin@dungeongym.com'}
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body
                         placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          <div>
            <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body pr-11
                           placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 text-sm text-primary font-body">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-premium py-3 text-sm w-full mt-1"
          >
            {loading ? 'Signing In…' : `Sign In as ${tab === 'member' ? 'Member' : 'Admin'}`}
          </button>

          {tab === 'member' && (
            <p className="text-center text-sm text-foreground/50 font-body">
              New here?{' '}
              <Link to="/signup" className="text-primary hover:underline font-heading text-xs uppercase tracking-wider">
                Join Now
              </Link>
            </p>
          )}

          {/* Demo hint */}
          <div className="bg-background border border-border rounded-lg p-3 text-xs font-body text-foreground/40">
            <p className="font-heading text-[0.65rem] uppercase tracking-wider text-foreground/30 mb-1">Demo Credentials</p>
            {tab === 'member'
              ? <><p>Email: <span className="text-primary/70">rahul@example.com</span></p><p>Pass: <span className="text-primary/70">rahul123</span></p></>
              : <><p>Email: <span className="text-primary/70">admin@dungeongym.com</span></p><p>Pass: <span className="text-primary/70">admin123</span></p></>
            }
          </div>
        </form>
      </motion.div>
    </div>
  );
}
