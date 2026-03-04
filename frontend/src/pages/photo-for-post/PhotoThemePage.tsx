import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useMakerDraft } from '@/hooks/useMakerDraft';
import { Check } from 'lucide-react';

const themes = [
  { id: 'modern', name: 'Modern Gradient', colors: ['from-blue-600', 'to-purple-600'] },
  { id: 'professional', name: 'Professional Navy', colors: ['from-slate-800', 'to-blue-900'] },
  { id: 'vibrant', name: 'Vibrant Energy', colors: ['from-orange-500', 'to-pink-600'] },
  { id: 'minimal', name: 'Minimal Dark', colors: ['from-slate-900', 'to-slate-700'] },
];

export default function PhotoThemePage() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useMakerDraft('photo');
  const [selectedTheme, setSelectedTheme] = useState(draft?.theme || 'modern');

  const handleContinue = () => {
    updateDraft({ theme: selectedTheme });
    navigate({ to: '/maker/photo/result' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Choose Your Theme</h1>
        <p className="text-muted-foreground mt-2">Select a design theme for your poster</p>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Available Themes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
            <div className="grid md:grid-cols-2 gap-4">
              {themes.map((theme) => (
                <div key={theme.id} className="relative">
                  <RadioGroupItem value={theme.id} id={theme.id} className="peer sr-only" />
                  <Label
                    htmlFor={theme.id}
                    className="flex flex-col items-center gap-3 rounded-lg border-2 border-primary/20 bg-slate-900/50 p-6 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${theme.colors[0]} ${theme.colors[1]}`} />
                    <span className="font-semibold">{theme.name}</span>
                    {selectedTheme === theme.id && (
                      <div className="absolute top-4 right-4 bg-primary rounded-full p-1">
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
            Generate Poster
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
