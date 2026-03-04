import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMakerDraft } from '@/hooks/useMakerDraft';
import { Upload } from 'lucide-react';

export default function PhotoDetailsPage() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useMakerDraft('photo');

  const [formData, setFormData] = useState({
    companyName: draft?.companyName || '',
    category: draft?.category || '',
    productService: draft?.productService || '',
    specialOffer: draft?.specialOffer || '',
    address: draft?.address || '',
    contact: draft?.contact || '',
    additionalDetails: draft?.additionalDetails || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    updateDraft(formData);
    navigate({ to: '/maker/photo/theme' });
  };

  const isValid = formData.companyName && formData.category && formData.productService;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Photo for Post</h1>
        <p className="text-muted-foreground mt-2">Enter your business details</p>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="SparkNest Tech Solutions"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="bg-slate-900/50 border-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                placeholder="Technical"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="bg-slate-900/50 border-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productService">Product/Service *</Label>
            <Input
              id="productService"
              placeholder="Smart Home Products, Student Tech Kits, Custom Projects"
              value={formData.productService}
              onChange={(e) => handleChange('productService', e.target.value)}
              className="bg-slate-900/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialOffer">Special Offer</Label>
            <Input
              id="specialOffer"
              placeholder="Grand Launch Offer: 20% OFF on all Smart Home Products"
              value={formData.specialOffer}
              onChange={(e) => handleChange('specialOffer', e.target.value)}
              className="bg-slate-900/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="SparkNest Tech Solutions Near New Bus Stand, Tirunelveli"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="bg-slate-900/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              placeholder="Phone: +91 98765 43210 Email: info@sparknesttech.in"
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              className="bg-slate-900/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Founded by young engineering innovators&#10;Affordable products for students&#10;Free demo for schools and colleges&#10;Bulk order discount available"
              value={formData.additionalDetails}
              onChange={(e) => handleChange('additionalDetails', e.target.value)}
              className="bg-slate-900/50 border-primary/20 min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Your Image (Optional)</Label>
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer bg-slate-900/30">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload an image</p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            Continue to Theme Selection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
