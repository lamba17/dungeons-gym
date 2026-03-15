import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut, CreditCard, Calendar, Shield, Clock,
  ChevronRight, CheckCircle, AlertCircle, TrendingUp,
  Dumbbell, Home, History, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatDate, formatRupees, isOverdue } from '../lib/utils';
import { PLAN_DISPLAY, PLAN_PRICES } from '../lib/types';
import PaymentModal from '../components/member/PaymentModal';

type Tab = 'overview' | 'payments' | 'notifications';

export default function MemberDashboard() {
  const { currentMember, logout } = useAuth();
  const { payments } = useData();
  const navigate = useNavigate();
  const [tab, setTab]                     = useState<Tab>('overview');
  const [showPayModal, setShowPayModal]   = useState(false);
  const [paySuccess, setPaySuccess]       = useState(false);

  if (!currentMember) { navigate('/login'); return null; }

  const myPayments = payments
    .filter(p => p.memberId === currentMember.id && p.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const isOverdueNow = isOverdue(currentMember.nextPaymentDue) || currentMember.status === 'pending';
  const totalSpent   = myPayments.reduce((s, p) => s + p.amount, 0);

  const handleLogout = () => { logout(); navigate('/'); };

  const statusBadge = () => {
    if (currentMember.status === 'active') return (
      <span className="badge-active"><CheckCircle className="w-3.5 h-3.5" />Active</span>
    );
    if (currentMember.status === 'pending') return (
      <span className="badge-pending"><AlertCircle className="w-3.5 h-3.5" />Payment Due</span>
    );
    return <span className="badge-expired">Expired</span>;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border fixed top-0 left-0 h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-heading text-xl font-bold uppercase tracking-[0.15em]">
            <span className="text-gradient">Dungeon</span> <span className="text-foreground">Gym</span>
          </Link>
          <p className="font-heading text-xs uppercase tracking-[0.15em] text-foreground/30 mt-1">Member Portal</p>
        </div>

        {/* Avatar */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-heading text-lg font-bold text-primary flex-shrink-0">
            {currentMember.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="font-heading text-sm font-semibold truncate">{currentMember.name}</p>
            <p className="text-xs text-foreground/40 truncate font-body">{currentMember.email}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {[
            { id: 'overview'      as Tab, icon: Home,    label: 'Overview' },
            { id: 'payments'      as Tab, icon: History, label: 'Payment History' },
            { id: 'notifications' as Tab, icon: Bell,    label: 'Notifications' },
          ].map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-heading text-xs uppercase tracking-[0.1em]
                ${tab === item.id ? 'bg-primary/15 text-primary' : 'text-foreground/50 hover:text-foreground hover:bg-card'}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground/40 hover:text-foreground transition-colors font-heading text-xs uppercase tracking-[0.1em]">
            <Dumbbell className="w-4 h-4" /> Visit Site
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground/40 hover:text-primary transition-colors font-heading text-xs uppercase tracking-[0.1em]">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-6 md:px-10 py-4 flex items-center justify-between">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40">Member Portal</p>
            <h1 className="font-heading text-xl font-bold">
              {tab === 'overview'      ? 'Dashboard Overview' :
               tab === 'payments'      ? 'Payment History'    :
               'Notifications'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {statusBadge()}
            <button onClick={handleLogout} className="md:hidden flex items-center gap-1 text-foreground/40 hover:text-primary transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10">

          {/* ── OVERVIEW TAB ── */}
          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

              {/* Payment due alert */}
              {isOverdueNow && !paySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-heading text-sm font-semibold text-primary">Payment Due</p>
                      <p className="text-xs text-foreground/60 font-body">
                        Your {PLAN_DISPLAY[currentMember.plan]} payment of{' '}
                        <strong className="text-primary">{formatRupees(PLAN_PRICES[currentMember.plan])}</strong> is due.
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowPayModal(true)} className="btn-primary-premium text-xs py-2 px-5 flex-shrink-0">
                    Pay Now <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              {/* Success banner */}
              {paySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm font-body text-green-300">
                    Payment successful! Your membership has been renewed.
                  </p>
                </motion.div>
              )}

              {/* Stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Shield,      label: 'Membership',    val: PLAN_DISPLAY[currentMember.plan], sub: currentMember.status },
                  { icon: Calendar,    label: 'Member Since',  val: formatDate(currentMember.joinDate), sub: 'Join Date' },
                  { icon: Clock,       label: 'Next Due',      val: formatDate(currentMember.nextPaymentDue), sub: isOverdueNow ? 'Overdue!' : 'Upcoming' },
                  { icon: TrendingUp,  label: 'Total Spent',   val: formatRupees(totalSpent), sub: `${myPayments.length} payments` },
                ].map(card => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="stat-card"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-heading text-xs uppercase tracking-[0.15em] text-foreground/40">{card.label}</p>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <card.icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <p className="font-heading text-lg font-bold truncate">{card.val}</p>
                    <p className={`text-xs mt-1 font-body ${card.sub === 'Overdue!' ? 'text-primary' : 'text-foreground/40'}`}>
                      {card.sub}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Membership card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,6,13,0.08),transparent_70%)]" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="font-heading text-xs uppercase tracking-[0.3em] text-foreground/40 mb-1">Membership Card</p>
                        <p className="font-heading text-2xl font-bold uppercase">{PLAN_DISPLAY[currentMember.plan]}</p>
                      </div>
                      <Dumbbell className="w-8 h-8 text-primary/30" />
                    </div>
                    <p className="font-heading text-xl font-bold tracking-[0.1em] text-foreground/80 mb-1">
                      {currentMember.name.toUpperCase()}
                    </p>
                    <p className="font-body text-xs text-foreground/40">{currentMember.email}</p>
                    <p className="font-body text-xs text-foreground/40">{currentMember.phone}</p>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <div>
                        <p className="font-heading text-[0.6rem] uppercase tracking-[0.2em] text-foreground/30">Valid From</p>
                        <p className="font-heading text-sm">{formatDate(currentMember.joinDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-heading text-[0.6rem] uppercase tracking-[0.2em] text-foreground/30">Next Renewal</p>
                        <p className={`font-heading text-sm ${isOverdueNow ? 'text-primary' : ''}`}>
                          {formatDate(currentMember.nextPaymentDue)}
                        </p>
                      </div>
                      {statusBadge()}
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex flex-col gap-4">
                  <button onClick={() => setShowPayModal(true)}
                    className="bg-card border border-border hover:border-primary/40 rounded-xl p-5 text-left transition-all hover:-translate-y-0.5 group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold">Pay Membership Fee</p>
                        <p className="text-xs text-foreground/40 font-body">
                          {formatRupees(PLAN_PRICES[currentMember.plan])} via UPI or Card
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors" />
                  </button>

                  <button onClick={() => setTab('payments')}
                    className="bg-card border border-border hover:border-primary/40 rounded-xl p-5 text-left transition-all hover:-translate-y-0.5 group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <History className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold">View Payment History</p>
                        <p className="text-xs text-foreground/40 font-body">{myPayments.length} transactions recorded</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors" />
                  </button>

                  {/* Last payment */}
                  {myPayments[0] && (
                    <div className="bg-card border border-border rounded-xl p-5">
                      <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3">Last Payment</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-heading text-base font-bold">{formatRupees(myPayments[0].amount)}</p>
                          <p className="text-xs text-foreground/40 font-body">{formatDate(myPayments[0].date)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="badge-paid"><CheckCircle className="w-3 h-3" />Paid</span>
                          <p className="text-xs text-foreground/30 uppercase font-heading tracking-wider">
                            {myPayments[0].method.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PAYMENTS TAB ── */}
          {tab === 'payments' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-foreground/50 text-sm font-body">All {myPayments.length} transactions</p>
                <button onClick={() => setShowPayModal(true)} className="btn-primary-premium text-xs py-2 px-5">
                  + Pay Now
                </button>
              </div>
              {myPayments.length === 0 ? (
                <div className="text-center py-20 text-foreground/30">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-heading text-sm uppercase tracking-wider">No payments yet</p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <table className="dash-table">
                    <thead>
                      <tr><th>#</th><th>Date</th><th>Plan</th><th>Amount</th><th>Method</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {myPayments.map((p, i) => (
                        <tr key={p.id}>
                          <td className="text-foreground/30">{myPayments.length - i}</td>
                          <td>{formatDate(p.date)}</td>
                          <td className="font-heading text-xs uppercase tracking-wider">{PLAN_DISPLAY[p.plan]}</td>
                          <td className="font-heading font-bold text-primary">{formatRupees(p.amount)}</td>
                          <td className="font-heading text-xs uppercase tracking-wider text-foreground/50">{p.method}</td>
                          <td><span className="badge-paid"><CheckCircle className="w-3 h-3" />Paid</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {tab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-col gap-4 max-w-2xl">
                {isOverdueNow && (
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-5 flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading text-sm font-semibold text-primary mb-1">Payment Due Reminder</p>
                      <p className="text-sm text-foreground/70 font-body">
                        Your {PLAN_DISPLAY[currentMember.plan]} fee of{' '}
                        <strong>{formatRupees(PLAN_PRICES[currentMember.plan])}</strong> is due.
                        Please pay to keep your membership active.
                      </p>
                      <button onClick={() => setShowPayModal(true)} className="btn-primary-premium text-xs py-2 px-4 mt-3">
                        Pay Now
                      </button>
                    </div>
                  </div>
                )}
                <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-semibold mb-1">Welcome to Dungeon Gym!</p>
                    <p className="text-sm text-foreground/60 font-body">
                      Your membership is confirmed. Joined on {formatDate(currentMember.joinDate)}.
                      Train hard, beast mode activated!
                    </p>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
                  <Bell className="w-5 h-5 text-primary/50 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-semibold mb-1">Gym Timing Reminder</p>
                    <p className="text-sm text-foreground/60 font-body">
                      Mon–Sat: 5:00 AM – 11:00 PM · Sunday: 6:00 AM – 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 flex">
        {[
          { id: 'overview'      as Tab, icon: Home,    label: 'Home' },
          { id: 'payments'      as Tab, icon: History, label: 'History' },
          { id: 'notifications' as Tab, icon: Bell,    label: 'Alerts' },
        ].map(item => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors
              ${tab === item.id ? 'text-primary' : 'text-foreground/40'}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-heading text-[0.6rem] uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <PaymentModal
          member={currentMember}
          onClose={() => setShowPayModal(false)}
          onSuccess={() => { setShowPayModal(false); setPaySuccess(true); setTab('payments'); }}
        />
      )}
    </div>
  );
}
