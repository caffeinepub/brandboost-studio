import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from '@/components/layout/AppShell';
import AuthGate from '@/components/auth/AuthGate';
import ProfileSetupModal from '@/components/auth/ProfileSetupModal';
import LoginPage from '@/pages/LoginPage';
import ChatPage from '@/pages/ChatPage';
import MakerLandingPage from '@/pages/MakerLandingPage';
import BusinessAnalyticsPage from '@/pages/BusinessAnalyticsPage';
import GalleryPage from '@/pages/GalleryPage';
import ShopMakerPage from '@/pages/ShopMakerPage';
import PhotoDetailsPage from '@/pages/photo-for-post/PhotoDetailsPage';
import PhotoThemePage from '@/pages/photo-for-post/PhotoThemePage';
import PhotoResultPage from '@/pages/photo-for-post/PhotoResultPage';
import VideoDetailsPage from '@/pages/video-for-reels/VideoDetailsPage';
import VideoStylePage from '@/pages/video-for-reels/VideoStylePage';
import VideoResultPage from '@/pages/video-for-reels/VideoResultPage';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AuthGate>
      <ProfileSetupModal />
      <AppShell>
        <Outlet />
      </AppShell>
    </AuthGate>
  ),
});

const chatRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/',
  component: ChatPage,
});

const makerRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/maker',
  component: MakerLandingPage,
});

const photoDetailsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/maker/photo/details',
  component: PhotoDetailsPage,
});

const photoThemeRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/maker/photo/theme',
  component: PhotoThemePage,
});

const photoResultRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/maker/photo/result',
  component: PhotoResultPage,
});

const videoDetailsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/maker/video/details',
  component: VideoDetailsPage,
});

const videoStyleRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/maker/video/style',
  component: VideoStylePage,
});

const videoResultRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/maker/video/result',
  component: VideoResultPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/analytics',
  component: BusinessAnalyticsPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/gallery',
  component: GalleryPage,
});

const shopRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/shop',
  component: ShopMakerPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  appLayoutRoute.addChildren([
    chatRoute,
    makerRoute,
    photoDetailsRoute,
    photoThemeRoute,
    photoResultRoute,
    videoDetailsRoute,
    videoStyleRoute,
    videoResultRoute,
    analyticsRoute,
    galleryRoute,
    shopRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
