import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { computeAnalytics } from '@/lib/analytics/compute';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import { useSavedAnalytics } from '@/hooks/useSavedAnalytics';
import { useGalleryPublish } from '@/hooks/useGalleryPublish';
import { toast } from 'sonner';

export default function BusinessAnalyticsPage() {
  const [formData, setFormData] = useState({
    initialInvestment: '5000',
    totalRevenue: '18500',
    totalCosts: '9200',
    marketing: '2500',
    operations: '5200',
    other: '1500',
  });

  const [results, setResults] = useState<any>(null);
  const { saveAnalytics } = useSavedAnalytics();
  const { publishAnalytics } = useGalleryPublish();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    const computed = computeAnalytics(formData);
    setResults(computed);
    saveAnalytics(computed);
  };

  const handleSaveToGallery = async () => {
    if (!results) return;
    await publishAnalytics(`Analytics Report - Profit: $${results.profit}`, results);
    toast.success('Analytics saved to gallery!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Business Analytics</h1>
        <p className="text-muted-foreground mt-2">Analyze your business financial performance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-primary/30 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Enter Your Financial Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment" className="text-foreground">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                value={formData.initialInvestment}
                onChange={(e) => handleChange('initialInvestment', e.target.value)}
                className="bg-muted/50 border-primary/30 text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalRevenue" className="text-foreground">Total Revenue ($)</Label>
              <Input
                id="totalRevenue"
                type="number"
                value={formData.totalRevenue}
                onChange={(e) => handleChange('totalRevenue', e.target.value)}
                className="bg-muted/50 border-primary/30 text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalCosts" className="text-foreground">Total Costs ($)</Label>
              <Input
                id="totalCosts"
                type="number"
                value={formData.totalCosts}
                onChange={(e) => handleChange('totalCosts', e.target.value)}
                className="bg-muted/50 border-primary/30 text-foreground"
              />
            </div>

            <div className="pt-4 border-t border-primary/20">
              <h3 className="font-semibold mb-4 text-foreground">Cost Breakdown</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="marketing" className="text-foreground">Marketing ($)</Label>
                  <Input
                    id="marketing"
                    type="number"
                    value={formData.marketing}
                    onChange={(e) => handleChange('marketing', e.target.value)}
                    className="bg-muted/50 border-primary/30 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operations" className="text-foreground">Operations ($)</Label>
                  <Input
                    id="operations"
                    type="number"
                    value={formData.operations}
                    onChange={(e) => handleChange('operations', e.target.value)}
                    className="bg-muted/50 border-primary/30 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other" className="text-foreground">Other ($)</Label>
                  <Input
                    id="other"
                    type="number"
                    value={formData.other}
                    onChange={(e) => handleChange('other', e.target.value)}
                    className="bg-muted/50 border-primary/30 text-foreground"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              className="btn-glow w-full h-12 text-primary-foreground"
            >
              Generate Analytics
            </Button>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-6">
            <Card className="border-primary/30 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Profit</p>
                    <p className="text-2xl font-bold text-green-600">${results.profit}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <p className="text-2xl font-bold text-primary">{results.profitMargin}%</p>
                  </div>
                </div>
                <Button
                  onClick={handleSaveToGallery}
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10 text-foreground"
                >
                  Save to Gallery
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Revenue vs Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={results.barData} />
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart data={results.pieData} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
