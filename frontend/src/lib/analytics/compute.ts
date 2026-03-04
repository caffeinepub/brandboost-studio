export function computeAnalytics(formData: any) {
  const revenue = parseFloat(formData.totalRevenue) || 0;
  const costs = parseFloat(formData.totalCosts) || 0;
  const profit = revenue - costs;
  const profitMargin = revenue > 0 ? ((profit / revenue) * 100).toFixed(2) : '0.00';

  const marketing = parseFloat(formData.marketing) || 0;
  const operations = parseFloat(formData.operations) || 0;
  const other = parseFloat(formData.other) || 0;

  return {
    profit,
    profitMargin,
    barData: [
      { label: 'Revenue', value: revenue, color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
      { label: 'Costs', value: costs, color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
      { label: 'Profit', value: profit, color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    ],
    pieData: [
      { label: 'Marketing', value: marketing, color: '#f59e0b' },
      { label: 'Operations', value: operations, color: '#8b5cf6' },
      { label: 'Other', value: other, color: '#06b6d4' },
    ],
  };
}
