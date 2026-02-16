import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Mail, Calendar } from 'lucide-react';

export default function ShopMakerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shop Maker</h1>
        <p className="text-muted-foreground mt-2">Build your online shopping experience</p>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm text-center">
        <CardHeader className="space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl">Coming Soon</CardTitle>
          <CardDescription className="text-lg">
            We're working on an amazing shop builder to help you create your online store with ease
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <Card className="border-primary/20 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-green-400" />
                  Product Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Easily add, edit, and organize your products with our intuitive interface
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Order Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Keep track of orders and manage your inventory in real-time
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Want to be notified when Shop Maker launches?
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg gap-2">
              <Mail className="h-4 w-4" />
              Notify Me
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
