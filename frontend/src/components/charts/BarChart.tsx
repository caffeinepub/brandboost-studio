interface BarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
}

export default function BarChart({ data }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{item.label}</span>
            <span className="font-semibold">${item.value}</span>
          </div>
          <div className="h-8 bg-slate-800/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                background: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
