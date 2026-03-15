import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface DataPoint { month: string; members: number; new: number }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="font-heading text-xs uppercase tracking-wider text-foreground/50 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-sm font-heading font-bold" style={{ color: entry.color }}>
          {entry.name === 'members' ? 'Total Active' : 'New Joins'}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export default function MemberGrowthChart({ data, compact }: { data: DataPoint[]; compact?: boolean }) {
  const h = compact ? 180 : 260;
  return (
    <ResponsiveContainer width="100%" height={h}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="membersGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#e0060d" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#e0060d" stopOpacity={0.0} />
          </linearGradient>
          <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#ff4444" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#ff4444" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" tick={{ fill: 'rgba(245,245,245,0.4)', fontSize: 10, fontFamily: 'Oswald' }}
          axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(245,245,245,0.4)', fontSize: 10, fontFamily: 'Oswald' }}
          axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        {!compact && <Legend formatter={v => <span style={{ color: 'rgba(245,245,245,0.6)', fontFamily: 'Oswald', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{v === 'members' ? 'Total Active' : 'New Joins'}</span>} />}
        <Area type="monotone" dataKey="members" stroke="#e0060d" strokeWidth={2} fill="url(#membersGrad)" dot={false} activeDot={{ r: 5, fill: '#e0060d' }} />
        <Area type="monotone" dataKey="new"     stroke="#ff6666" strokeWidth={1.5} strokeDasharray="4 2" fill="url(#newGrad)" dot={false} activeDot={{ r: 4, fill: '#ff6666' }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
