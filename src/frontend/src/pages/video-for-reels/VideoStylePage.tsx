import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useMakerDraft } from '@/hooks/useMakerDraft';
import { Check } from 'lucide-react';

const styles = [
  { id: 'fade', name: 'Smooth Fade', description: 'Gentle transitions with fade effects' },
  { id: 'slide', name: 'Dynamic Slide', description: 'Energetic sliding animations' },
  { id: 'zoom', name: 'Zoom Impact', description: 'Bold zoom-in effects' },
];

export default function VideoStylePage() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useMakerDraft('video');
  const [selectedStyle, setSelectedStyle] = useState(draft?.style || 'fade');

  const handleContinue = () => {
    updateDraft({ style: selectedStyle });
    navigate({ to: '/maker/video/result' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Choose Animation Style</h1>
        <p className="text-muted-foreground mt-2">Select transitions and effects for your video</p>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Animation Styles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle}>
            <div className="space-y-3">
              {styles.map((style) => (
                <div key={style.id} className="relative">
                  <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                  <Label
                    htmlFor={style.id}
                    className="flex items-center gap-4 rounded-lg border-2 border-primary/20 bg-slate-900/50 p-4 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{style.name}</div>
                      <div className="text-sm text-muted-foreground">{style.description}</div>
                    </div>
                    {selectedStyle === style.id && (
                      <div className="bg-primary rounded-full p-1">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <Button
            onClick={handleContinue}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            Generate Video Preview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
