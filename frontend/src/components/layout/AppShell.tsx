import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import SidebarNav from '@/components/navigation/SidebarNav';
import AppHeader from '@/components/layout/AppHeader';
import ButterflyBackground from '@/components/background/ButterflyBackground';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen app-gradient-bg relative">
      <ButterflyBackground />
      
      <div className="flex h-screen relative z-10">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-primary/20 bg-card/60 backdrop-blur-sm">
          <div className="p-6 border-b border-primary/20">
            <img 
              src="/assets/generated/busy-ai-wordmark.dim_1200x300.png" 
              alt="Busy AI" 
              className="h-10 w-auto"
            />
          </div>
          <SidebarNav />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden fixed top-4 left-4 z-50">
            <Button variant="outline" size="icon" className="bg-card/80 backdrop-blur-sm border-primary/30">
              <Menu className="h-5 w-5 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-card/95 backdrop-blur-sm border-primary/30">
            <div className="p-6 border-b border-primary/20">
              <img 
                src="/assets/generated/busy-ai-wordmark.dim_1200x300.png" 
                alt="Busy AI" 
                className="h-10 w-auto"
              />
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
