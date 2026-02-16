import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MessageSquare, Wand2, BarChart3, Image, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  onNavigate?: () => void;
}

const navItems = [
  { path: '/', label: 'Chat', icon: MessageSquare },
  { path: '/maker', label: 'Photo/Video Maker', icon: Wand2 },
  { path: '/analytics', label: 'Business Analytics', icon: BarChart3 },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/shop', label: 'Shop Maker', icon: ShoppingBag },
];

export default function SidebarNav({ onNavigate }: SidebarNavProps) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleNavigate = (path: string) => {
    navigate({ to: path });
    onNavigate?.();
  };

  return (
    <nav className="flex-1 p-4 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
        
        return (
          <Button
            key={item.path}
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start gap-3 h-12 text-base transition-all duration-200',
              isActive
                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border border-primary/30 shadow-md'
                : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
            )}
            onClick={() => handleNavigate(item.path)}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}
