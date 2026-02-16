import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, BarChart3, Image as ImageIcon, Video } from 'lucide-react';
import { GalleryItem } from '@/backend';

interface GalleryCardProps {
  item: GalleryItem;
}

export default function GalleryCard({ item }: GalleryCardProps) {
  const getIcon = () => {
    switch (item.itemType) {
      case 'photo':
        return <ImageIcon className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'analytic':
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getColor = () => {
    switch (item.itemType) {
      case 'photo':
        return 'from-pink-500 to-purple-500';
      case 'video':
        return 'from-orange-500 to-red-500';
      case 'analytic':
        return 'from-blue-500 to-cyan-500';
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm hover:border-primary/40 transition-all overflow-hidden group">
      <div className={`h-2 bg-gradient-to-r ${getColor()}`} />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${getColor()}`}>
              {getIcon()}
            </div>
            <div>
              <CardTitle className="text-base line-clamp-1">{item.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(item.timestamp)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
