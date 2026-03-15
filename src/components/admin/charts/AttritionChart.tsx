import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

interface DataPoint { month: string; left: number }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="font-heading text-xs uppercase tracking-wider text-foreground/50 mb-1">{label}</p>
      <p className="text-base font-heading font-bold text-primary">
        {payload[0]?.value} member{payload[0]?.value !== 1 ? 's' : ''} left
      </p>
    </div>
  );
};

export default function AttritionChart({ data }: { data: DataPoint[] }) {
  const avg = data.reduce((s, d) => s + d.left, 0) / data.length;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" tick={{ fill: 'rgba(245,245,245,0.4)', fontSize: 10, fontFamily: 'Oswald' }}
          axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: 'rgba(245,245,245,0.4)', fontSize: 10, fontFamily: 'Oswald' }}
          axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={avg} stroke="rgba(224,6,13,0.3)" strokeDasharray="4 2"
          label={{ value: 'Avg', fill: 'rgba(224,6,13,0.5)', fontSize: 10, fontFamily: 'Oswald' }} />
        <Line
          type="monotone"
          dataKey="left"
          stroke="#e0060d"
          strokeWidth={2.5}
          dot={{ r: 5, fill: '#e0060d', strokeWidth: 0 }}
          activeDot={{ r: 7, fill: '#ff4444' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
