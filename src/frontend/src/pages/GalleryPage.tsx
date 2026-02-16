import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGalleryItems } from '@/hooks/useGalleryItems';
import GalleryCard from '@/components/gallery/GalleryCard';
import { Loader2 } from 'lucide-react';
import { GalleryItemType } from '@/backend';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'all' | GalleryItemType>('all');
  const { data: items, isLoading } = useGalleryItems(activeTab === 'all' ? null : activeTab);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground mt-2">View and manage all your generated content</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        <TabsList className="bg-slate-900/50 border border-primary/20">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="photo">Photos</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="analytic">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <GalleryCard key={item.id.toString()} item={item} />
              ))}
            </div>
          ) : (
            <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm">
              <CardContent className="py-12 text-center text-muted-foreground">
                No items found. Start creating content to see it here!
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
