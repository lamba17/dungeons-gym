import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, TrendingUp, CreditCard, AlertTriangle, LogOut,
  Dumbbell, BarChart2, Table2, Bell, Home, ChevronRight,
  UserMinus, Clock, CheckCircle, UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  formatDate, formatRupees,
  buildRevenueData, buildMemberGrowthData, buildAttritionData,
  pendingMembers, expiringMembers, joinedThisMonth
} from '../lib/utils';
import { PLAN_DISPLAY, PLAN_PRICES } from '../lib/types';
import MemberGrowthChart from '../components/admin/charts/MemberGrowthChart';
import RevenueChart from '../components/admin/charts/RevenueChart';
import AttritionChart from '../components/admin/charts/AttritionChart';
import ExpiryChart from '../components/admin/charts/ExpiryChart';

type Tab = 'overview' | 'analytics' | 'members' | 'payments' | 'pending';
type Range = 3 | 6 | 12;

export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth();
  const { members, payments } = useData();
  const navigate = useNavigate();
  const [tab,   setTab]   = useState<Tab>('overview');
  const [range, setRange] = useState<Range>(12);

  if (!isAdmin) { navigate('/login'); return null; }

  const handleLogout = () => { logout(); navigate('/'); };

  // Computed stats
  const activeMembers   = members.filter(m => !m.isLeft && m.status === 'active');
  const pendingList     = pendingMembers(members);
  const expiringList    = expiringMembers(members);
  const joinedThisM     = joinedThisMonth(members);
  const leftMembers     = members.filter(m => m.isLeft);
  const completedPays   = payments.filter(p => p.status === 'completed');

  // Monthly revenue (current month)
  const now = new Date();
  const thisMonthRevenue = completedPays.filter(p => {
    const d = new Date(p.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((s, p) => s + p.amount, 0);

  // Total revenue
  const totalRevenue = completedPays.reduce((s, p) => s + p.amount, 0);

  // Chart data
  const revenueData  = useMemo(() => buildRevenueData(payments, range), [payments, range]);
  const growthData   = useMemo(() => buildMemberGrowthData(members, range), [members, range]);
  const attritionData = useMemo(() => buildAttritionData(members, range), [members, range]);

  const stats = [
    { icon: Users,       label: 'Total Members',       val: members.filter(m => !m.isLeft).length, sub: `${members.length} ever`, color: 'text-blue-400',  bg: 'bg-blue-500/10' },
    { icon: CheckCircle, label: 'Active Members',       val: activeMembers.length,   sub: `${pendingList.length} pending`, color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: UserPlus,    label: 'Joined This Month',    val: joinedThisM.length,     sub: 'New this month',    color: 'text-primary',   bg: 'bg-primary/10' },
    { icon: UserMinus,   label: 'Members Left',         val: leftMembers.length,     sub: 'Total attrition',   color: 'text-red-400',   bg: 'bg-red-500/10' },
    { icon: TrendingUp,  label: 'Monthly Revenue',      val: formatRupees(thisMonthRevenue), sub: 'This month', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { icon: CreditCard,  label: 'Total Revenue',        val: formatRupees(totalRevenue),     sub: 'All time',   color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  const NAV = [
    { id: 'overview'  as Tab, icon: Home,         label: 'Overview' },
    { id: 'analytics' as Tab, icon: BarChart2,    label: 'Analytics' },
    { id: 'members'   as Tab, icon: Users,        label: 'Members' },
    { id: 'payments'  as Tab, icon: CreditCard,   label: 'Payments' },
    { id: 'pending'   as Tab, icon: Bell,         label: 'Pending', badge: pendingList.length },
  ];

  const SortedPayments = [...completedPays].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background text-foreground flex">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border fixed top-0 left-0 h-full z-40">
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-heading text-xl font-bold uppercase tracking-[0.15em]">
            <span className="text-gradient">Dungeon</span> <span className="text-foreground">Gym</span>
          </Link>
          <p className="font-heading text-xs uppercase tracking-[0.15em] text-primary/70 mt-1">Admin Panel</p>
        </div>

        {/* Admin avatar */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center font-heading text-sm font-bold text-primary">
            AL
          </div>
          <div>
            <p className="font-heading text-sm font-semibold">Akash Lamba</p>
            <p className="text-xs text-foreground/40 font-body">Gym Owner</p>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-heading text-xs uppercase tracking-[0.1em] relative
                ${tab === item.id ? 'bg-primary/15 text-primary' : 'text-foreground/50 hover:text-foreground hover:bg-background/50'}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.badge && item.badge > 0 && (
                <span className="ml-auto bg-primary text-white text-[0.6rem] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground/40 hover:text-foreground transition-colors font-heading text-xs uppercase tracking-[0.1em]">
            <Dumbbell className="w-4 h-4" /> View Site
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground/40 hover:text-primary transition-colors font-heading text-xs uppercase tracking-[0.1em]">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-6 md:px-10 py-4 flex items-center justify-between">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40">Admin Portal</p>
            <h1 className="font-heading text-xl font-bold">
              {tab === 'overview'  ? 'Dashboard Overview' :
               tab === 'analytics' ? 'Analytics & Charts' :
               tab === 'members'   ? 'All Members'        :
               tab === 'payments'  ? 'Payment Records'    :
               'Pending Payments'}
            </h1>
          </div>
          {pendingList.length > 0 && (
            <button onClick={() => setTab('pending')}
              className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary rounded-lg px-3 py-2 font-heading text-xs uppercase tracking-wider hover:bg-primary/20 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              {pendingList.length} Pending
            </button>
          )}
        </div>

        <div className="p-6 md:p-10">

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="stat-card"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-heading text-xs uppercase tracking-[0.15em] text-foreground/40">{s.label}</p>
                      <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                        <s.icon className={`w-4 h-4 ${s.color}`} />
                      </div>
                    </div>
                    <p className={`font-heading text-2xl font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-xs text-foreground/40 mt-1 font-body">{s.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Pending alert */}
              {pendingList.length > 0 && (
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-5 mb-8">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-heading text-sm font-semibold text-primary">
                          {pendingList.length} Member{pendingList.length > 1 ? 's' : ''} Have Pending Payments
                        </p>
                        <p className="text-xs text-foreground/60 font-body mt-0.5">
                          {pendingList.map(m => m.name.split(' ')[0]).join(', ')}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setTab('pending')}
                      className="flex items-center gap-2 btn-primary-premium text-xs py-2 px-4">
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Quick charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">Revenue (12 Months)</p>
                  <RevenueChart data={buildRevenueData(payments, 12)} compact />
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">Member Growth (12 Months)</p>
                  <MemberGrowthChart data={buildMemberGrowthData(members, 12)} compact />
                </div>
              </div>

              {/* Recent payments table */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <p className="font-heading text-sm uppercase tracking-[0.2em]">Recent Payments</p>
                  <button onClick={() => setTab('payments')} className="text-primary font-heading text-xs uppercase tracking-wider hover:underline">
                    View All
                  </button>
                </div>
                <table className="dash-table">
                  <thead><tr><th>Member</th><th>Plan</th><th>Amount</th><th>Date</th><th>Method</th></tr></thead>
                  <tbody>
                    {SortedPayments.slice(0, 8).map(p => (
                      <tr key={p.id}>
                        <td className="font-semibold">{p.memberName}</td>
                        <td className="font-heading text-xs uppercase tracking-wider text-foreground/50">{PLAN_DISPLAY[p.plan]}</td>
                        <td className="font-heading font-bold text-primary">{formatRupees(p.amount)}</td>
                        <td className="text-foreground/50">{formatDate(p.date)}</td>
                        <td className="font-heading text-xs uppercase tracking-wider">{p.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── ANALYTICS ── */}
          {tab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Range selector */}
              <div className="flex items-center gap-2 mb-6 bg-card border border-border rounded-xl p-1 w-fit">
                {([3, 6, 12] as Range[]).map(r => (
                  <button key={r} onClick={() => setRange(r)}
                    className={`px-4 py-2 rounded-lg font-heading text-xs uppercase tracking-wider transition-all
                      ${range === r ? 'bg-primary text-white' : 'text-foreground/50 hover:text-foreground'}`}>
                    {r} Mo
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-1">Member Growth Trend</p>
                  <p className="text-xs text-foreground/30 font-body mb-4">Active members over last {range} months</p>
                  <MemberGrowthChart data={growthData} />
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-1">Revenue Trend</p>
                  <p className="text-xs text-foreground/30 font-body mb-4">Monthly revenue over last {range} months</p>
                  <RevenueChart data={revenueData} />
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-1">Attrition Rate</p>
                  <p className="text-xs text-foreground/30 font-body mb-4">Members who left per month</p>
                  <AttritionChart data={attritionData} />
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-1">Upcoming Renewals</p>
                  <p className="text-xs text-foreground/30 font-body mb-4">Memberships expiring in next 30 days</p>
                  <ExpiryChart members={expiringList} allMembers={members} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── MEMBERS ── */}
          {tab === 'members' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <p className="text-foreground/50 text-sm font-body">{members.length} total members in database</p>
                <div className="flex gap-2">
                  <span className="badge-active">Active: {activeMembers.length}</span>
                  <span className="badge-pending">Pending: {pendingList.length}</span>
                  <span className="badge-expired">Left: {leftMembers.length}</span>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-x-auto">
                <table className="dash-table min-w-[700px]">
                  <thead>
                    <tr>
                      <th>Name</th><th>Plan</th><th>Phone</th>
                      <th>Join Date</th><th>Next Due</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(m => (
                      <tr key={m.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-heading text-xs font-bold text-primary flex-shrink-0">
                              {m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{m.name}</p>
                              <p className="text-xs text-foreground/40">{m.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="font-heading text-xs uppercase tracking-wider text-foreground/60">{PLAN_DISPLAY[m.plan]}</td>
                        <td className="text-foreground/60">{m.phone}</td>
                        <td className="text-foreground/60">{formatDate(m.joinDate)}</td>
                        <td className={m.isLeft ? 'text-foreground/30' : ''}>{m.isLeft ? '—' : formatDate(m.nextPaymentDue)}</td>
                        <td>
                          {m.isLeft ? <span className="badge-expired">Left</span> :
                           m.status === 'active'  ? <span className="badge-active">Active</span> :
                           m.status === 'pending' ? <span className="badge-pending">Pending</span> :
                           <span className="badge-expired">Expired</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── PAYMENTS ── */}
          {tab === 'payments' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Revenue summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue',    val: formatRupees(totalRevenue),       sub: `${completedPays.length} transactions` },
                  { label: 'This Month',        val: formatRupees(thisMonthRevenue),   sub: 'Current month' },
                  { label: 'UPI Payments',      val: completedPays.filter(p => p.method === 'upi').length,  sub: 'via UPI' },
                  { label: 'Card Payments',     val: completedPays.filter(p => p.method === 'card').length, sub: 'via Card' },
                ].map(c => (
                  <div key={c.label} className="stat-card">
                    <p className="font-heading text-xs uppercase tracking-[0.15em] text-foreground/40 mb-2">{c.label}</p>
                    <p className="font-heading text-xl font-bold text-primary">{c.val}</p>
                    <p className="text-xs text-foreground/40 mt-1 font-body">{c.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl overflow-x-auto">
                <table className="dash-table min-w-[700px]">
                  <thead>
                    <tr><th>#</th><th>Member</th><th>Plan</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {SortedPayments.map((p, i) => (
                      <tr key={p.id}>
                        <td className="text-foreground/30">{SortedPayments.length - i}</td>
                        <td className="font-semibold">{p.memberName}</td>
                        <td className="font-heading text-xs uppercase tracking-wider text-foreground/50">{PLAN_DISPLAY[p.plan]}</td>
                        <td className="font-heading font-bold text-primary">{formatRupees(p.amount)}</td>
                        <td className="text-foreground/60">{formatDate(p.date)}</td>
                        <td className="font-heading text-xs uppercase tracking-wider">{p.method}</td>
                        <td><span className="badge-paid"><CheckCircle className="w-3 h-3" />Paid</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── PENDING ── */}
          {tab === 'pending' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Pending members */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <h2 className="font-heading text-lg uppercase tracking-wider">Pending Payments</h2>
                  <span className="bg-primary text-white font-heading text-xs px-2 py-0.5 rounded-full">
                    {pendingList.length}
                  </span>
                </div>

                {pendingList.length === 0 ? (
                  <div className="bg-card border border-border rounded-2xl p-12 text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="font-heading text-sm uppercase tracking-wider text-green-400">All Payments Up to Date!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {pendingList.map(m => (
                      <motion.div key={m.id}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-primary/20 rounded-xl p-5 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-heading text-sm font-bold text-primary">
                            {m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-heading text-sm font-semibold">{m.name}</p>
                            <p className="text-xs text-foreground/40 font-body">{m.phone}</p>
                          </div>
                          <span className="ml-auto badge-pending">Pending</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="font-heading uppercase tracking-wider text-foreground/30 mb-0.5">Plan</p>
                            <p className="font-body text-foreground/70">{PLAN_DISPLAY[m.plan]}</p>
                          </div>
                          <div>
                            <p className="font-heading uppercase tracking-wider text-foreground/30 mb-0.5">Amount Due</p>
                            <p className="font-heading font-bold text-primary">{formatRupees(PLAN_PRICES[m.plan])}</p>
                          </div>
                          <div>
                            <p className="font-heading uppercase tracking-wider text-foreground/30 mb-0.5">Due Since</p>
                            <p className="text-primary font-body">{formatDate(m.nextPaymentDue)}</p>
                          </div>
                          <div>
                            <p className="font-heading uppercase tracking-wider text-foreground/30 mb-0.5">Last Paid</p>
                            <p className="font-body text-foreground/60">{m.lastPaymentDate ? formatDate(m.lastPaymentDate) : '—'}</p>
                          </div>
                        </div>
                        {/* Reminder button */}
                        <a href={`https://wa.me/91${m.phone}?text=${encodeURIComponent(
                          `Hi ${m.name.split(' ')[0]}! 👋 This is a reminder from Dungeon Gym. Your ${PLAN_DISPLAY[m.plan]} fee of ₹${PLAN_PRICES[m.plan]} is due. Please visit the gym portal to pay: https://dungeon-gym.netlify.app/login 💪`
                        )}`}
                          target="_blank" rel="noopener noreferrer"
                          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
                                     border border-border hover:border-green-500/40 text-foreground/50 hover:text-green-400
                                     font-heading text-xs uppercase tracking-wider transition-all"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Send WhatsApp Reminder
                        </a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Expiring soon */}
              {expiringList.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <h2 className="font-heading text-lg uppercase tracking-wider">Expiring Within 30 Days</h2>
                    <span className="bg-yellow-500/20 text-yellow-400 font-heading text-xs px-2 py-0.5 rounded-full border border-yellow-500/30">
                      {expiringList.length}
                    </span>
                  </div>
                  <div className="bg-card border border-border rounded-2xl overflow-x-auto">
                    <table className="dash-table">
                      <thead>
                        <tr><th>Member</th><th>Plan</th><th>Expiry Date</th><th>Amount Due</th></tr>
                      </thead>
                      <tbody>
                        {expiringList.map(m => (
                          <tr key={m.id}>
                            <td className="font-semibold">{m.name}</td>
                            <td className="font-heading text-xs uppercase tracking-wider text-foreground/60">{PLAN_DISPLAY[m.plan]}</td>
                            <td className="text-yellow-400 font-heading">{formatDate(m.nextPaymentDue)}</td>
                            <td className="font-heading font-bold text-primary">{formatRupees(PLAN_PRICES[m.plan])}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 flex">
        {NAV.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors relative
              ${tab === item.id ? 'text-primary' : 'text-foreground/40'}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-heading text-[0.55rem] uppercase tracking-wider">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="absolute top-1.5 right-1/4 bg-primary text-white text-[0.55rem] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
