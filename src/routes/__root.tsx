import { Outlet, createRootRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemeModal } from '../components/ThemeModal';
import { Palette } from 'lucide-react';
import { Button } from '../components/Button';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const { themeMode, setThemeMode, colorTheme, setColorTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <footer className="fixed bottom-6 right-6 z-40 pointer-events-none">
        <Button 
          variant="tonal" 
          className="rounded-full w-14 h-14 p-0 flex items-center justify-center pointer-events-auto shadow-lg border border-outlineVariant-light/20 dark:border-outlineVariant-dark/20"
          onClick={() => setIsThemeModalOpen(true)}
          aria-label="Motyw i Wygląd"
        >
          <Palette className="w-6 h-6" />
        </Button>
      </footer>

      <ThemeModal 
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
      />

      <main className="container mx-auto px-4 pb-24">
        <Outlet />
      </main>
    </div>
  );
}
