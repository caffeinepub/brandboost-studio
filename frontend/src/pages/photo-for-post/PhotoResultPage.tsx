import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMakerDraft } from '@/hooks/useMakerDraft';
import { useGalleryPublish } from '@/hooks/useGalleryPublish';
import { Download, Save } from 'lucide-react';
import { renderPosterToCanvas } from '@/lib/poster/renderPosterToCanvas';
import { toast } from 'sonner';

export default function PhotoResultPage() {
  const { draft } = useMakerDraft('photo');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { publishPhoto } = useGalleryPublish();

  useEffect(() => {
    if (canvasRef.current && draft) {
      renderPosterToCanvas(canvasRef.current, draft);
    }
  }, [draft]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `${draft?.companyName || 'poster'}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    toast.success('Poster downloaded successfully!');
  };

  const handleSaveToGallery = async () => {
    if (!canvasRef.current || !draft) return;

    const dataUrl = canvasRef.current.toDataURL('image/png');
    await publishPhoto(draft.companyName || 'Untitled Poster', dataUrl);
    toast.success('Poster saved to gallery!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Generated Poster</h1>
        <p className="text-muted-foreground mt-2">Download or save to gallery</p>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center bg-slate-900/50 rounded-lg p-8">
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-2xl" />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleDownload}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg gap-2"
            >
              <Download className="h-5 w-5" />
              Download PNG
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
