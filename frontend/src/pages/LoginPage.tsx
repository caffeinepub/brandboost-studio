import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center app-gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="w-full max-w-md mx-4 space-y-8">
        {/* Logo/Wordmark */}
        <div className="text-center">
          <img 
            src="/assets/generated/busy-ai-wordmark.dim_1200x300.png" 
            alt="Busy AI" 
            className="h-16 mx-auto mb-4"
          />
        </div>

        <Card className="backdrop-blur-sm bg-card/90 border-primary/30 shadow-2xl">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              Welcome to Busy AI
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Your professional business assistant for marketing, analytics, and content creation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={loginStatus === 'logging-in'}
              className="btn-glow w-full h-12 text-lg font-semibold text-primary-foreground"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Sign In with Internet Identity'
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Secure authentication powered by Internet Computer
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
