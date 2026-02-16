import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMakerDraft } from '@/hooks/useMakerDraft';
import { useGalleryPublish } from '@/hooks/useGalleryPublish';
import { Download, Save } from 'lucide-react';
import VideoPreview from '@/components/video/VideoPreview';
import { toast } from 'sonner';

export default function VideoResultPage() {
  const { draft } = useMakerDraft('video');
  const { publishVideo } = useGalleryPublish();

  const handleDownload = () => {
    toast.info('Video export: This feature generates a preview animation. Full MP4 export requires additional video encoding libraries.');
  };

  const handleSaveToGallery = async () => {
    if (!draft) return;
    await publishVideo(draft.businessName || 'Untitled Video', 'video-preview');
    toast.success('Video saved to gallery!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Video Preview</h1>
        <p className="text-muted-foreground mt-2">Animated preview of your short-form video</p>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center bg-slate-900/50 rounded-lg p-8">
            <VideoPreview draft={draft} />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleDownload}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg gap-2"
            >
              <Download className="h-5 w-5" />
              Export Preview
            </Button>
            <Button
              onClick={handleSaveToGallery}
              variant="outline"
              className="flex-1 h-12 border-primary/20 hover:bg-primary/5 gap-2"
            >
              <Save className="h-5 w-5" />
              Save to Gallery
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
