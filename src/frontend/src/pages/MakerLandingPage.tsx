import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Video, ShoppingBag, Lightbulb, FileText } from 'lucide-react';

const features = [
  {
    title: 'Photo for Post',
    description: 'Create stunning posters and social media images',
    icon: Image,
    color: 'from-pink-500 to-purple-500',
    path: '/maker/photo/details',
  },
  {
    title: 'Video for Reels/Shorts',
    description: 'Generate engaging short-form video content',
    icon: Video,
    color: 'from-orange-500 to-red-500',
    path: '/maker/video/details',
  },
];

export default function MakerLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Photo & Video Maker</h1>
        <p className="text-muted-foreground mt-2">Create professional marketing content with AI-powered tools</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="border-primary/30 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate({ to: feature.path })}
                  className="btn-glow w-full text-primary-foreground"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
