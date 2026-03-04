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
        return <ImageIcon className="h-5 w-5 text-foreground" />;
      case 'video':
        return <Video className="h-5 w-5 text-foreground" />;
      case 'analytic':
        return <BarChart3 className="h-5 w-5 text-foreground" />;
    }
  };

  const getColor = () => {
    switch (item.itemType) {
      case 'photo':
        return 'from-accent to-secondary';
      case 'video':
        return 'from-secondary to-primary';
      case 'analytic':
        return 'from-primary to-accent';
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-primary/30 bg-card/70 backdrop-blur-sm hover:border-primary/50 transition-all overflow-hidden group shadow-md">
      <div className={`h-2 bg-gradient-to-r ${getColor()}`} />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${getColor()}`}>
              {getIcon()}
            </div>
            <div>
              <CardTitle className="text-base line-clamp-1 text-foreground">{item.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(item.timestamp)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-primary/30 hover:bg-primary/10 text-foreground">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1 border-primary/30 hover:bg-primary/10 text-foreground">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
