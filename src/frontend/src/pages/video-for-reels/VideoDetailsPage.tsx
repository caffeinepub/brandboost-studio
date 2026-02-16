import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMakerDraft } from '@/hooks/useMakerDraft';

export default function VideoDetailsPage() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useMakerDraft('video');

  const [formData, setFormData] = useState({
    businessName: draft?.businessName || '',
    serviceProduct: draft?.serviceProduct || '',
    offers: draft?.offers || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    updateDraft(formData);
    navigate({ to: '/maker/video/style' });
  };

  const isValid = formData.businessName && formData.serviceProduct;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Video for Reels/Shorts</h1>
        <p className="text-muted-foreground mt-2">Enter your business details</p>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Video Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              placeholder="Your Business Name"
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              className="bg-slate-900/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceProduct">Service/Product *</Label>
            <Input
              id="serviceProduct"
              placeholder="What do you offer?"
              value={formData.serviceProduct}
              onChange={(e) => handleChange('serviceProduct', e.target.value)}
              className="bg-slate-900/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offers">Special Offers</Label>
            <Textarea
              id="offers"
              placeholder="Any special promotions or offers?"
              value={formData.offers}
              onChange={(e) => handleChange('offers', e.target.value)}
              className="bg-slate-900/50 border-primary/20 min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            Continue to Style Selection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
