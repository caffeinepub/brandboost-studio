import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Loader2 } from 'lucide-react';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing && !identity) {
      navigate({ to: '/login' });
    }
  }, [identity, isInitializing, navigate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center app-gradient-bg">
        <div className="text-center space-y-6">
          <img 
            src="/assets/generated/busy-ai-logo.dim_512x512.png" 
            alt="Busy AI" 
            className="h-24 w-24 mx-auto mb-4"
          />
          <Loader2 className="h-12 w-12 animate-spin text-foreground mx-auto" />
          <p className="text-foreground font-medium text-lg">Loading Busy AI...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center app-gradient-bg">
        <div className="text-center space-y-6">
          <img 
            src="/assets/generated/busy-ai-logo.dim_512x512.png" 
            alt="Busy AI" 
            className="h-24 w-24 mx-auto mb-4"
          />
          <p className="text-foreground font-medium text-lg">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
