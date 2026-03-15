import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Member, PLAN_DISPLAY, PlanType } from '../../../lib/types';

interface Props { members: Member[]; allMembers: Member[] }

const COLORS = ['#e0060d', '#ff4444', '#ff7777', '#ffaaaa'];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="font-heading text-xs uppercase tracking-wider text-foreground/50 mb-1">{payload[0].name}</p>
      <p className="text-base font-heading font-bold text-primary">{payload[0].value} member{payload[0].value !== 1 ? 's' : ''}</p>
    </div>
  );
};

export default function ExpiryChart({ members, allMembers }: Props) {
  if (members.length === 0) {
    // Show plan distribution of all active members instead
    const planCounts = allMembers
      .filter(m => !m.isLeft && m.status === 'active')
      .reduce((acc, m) => { acc[m.plan] = (acc[m.plan] || 0) + 1; return acc; }, {} as Record<PlanType, number>);

    const data = Object.entries(planCounts).map(([plan, count]) => ({
      name: PLAN_DISPLAY[plan as PlanType],
      value: count,
    }));

    if (data.length === 0) {
      return (
        <div className="h-[260px] flex flex-col items-center justify-center text-foreground/30">
          <p className="font-heading text-sm uppercase tracking-wider">No active members</p>
        </div>
      );
    }

    return (
      <div>
        <p className="text-xs text-foreground/30 font-body mb-3 italic">No expiries in 30 days — showing plan distribution</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
              paddingAngle={3} dataKey="value">
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={v => <span style={{ color: 'rgba(245,245,245,0.6)', fontFamily: 'Oswald', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Group expiring members by plan
  const planCounts = members.reduce((acc, m) => {
    acc[m.plan] = (acc[m.plan] || 0) + 1; return acc;
  }, {} as Record<PlanType, number>);

  const data = Object.entries(planCounts).map(([plan, count]) => ({
    name: PLAN_DISPLAY[plan as PlanType],
    value: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={95}
          paddingAngle={3} dataKey="value" label={({ name, value }) => `${value}`}
          labelLine={false}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={v => <span style={{ color: 'rgba(245,245,245,0.6)', fontFamily: 'Oswald', fontSize: 11, textTransform: 'uppercase' }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}
