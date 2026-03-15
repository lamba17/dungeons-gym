import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface DataPoint { month: string; revenue: number }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="font-heading text-xs uppercase tracking-wider text-foreground/50 mb-1">{label}</p>
      <p className="text-lg font-heading font-bold text-primary">
        ₹{payload[0]?.value?.toLocaleString('en-IN')}
      </p>
    </div>
  );
};

const formatYAxis = (val: number) =>
  val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`;

export default function RevenueChart({ data, compact }: { data: DataPoint[]; compact?: boolean }) {
  const maxVal = Math.max(...data.map(d => d.revenue));
  const h = compact ? 180 : 260;
  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barSize={compact ? 14 : 22}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: 'rgba(245,245,245,0.4)', fontSize: 10, fontFamily: 'Oswald' }}
          axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatYAxis} tick={{ fill: 'rgba(245,245,245,0.4)', fontSize: 10, fontFamily: 'Oswald' }}
          axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224,6,13,0.06)' }} />
        <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i}
              fill={entry.revenue === maxVal ? '#e0060d' : 'rgba(224,6,13,0.4)'}
              opacity={entry.revenue === 0 ? 0.2 : 1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
