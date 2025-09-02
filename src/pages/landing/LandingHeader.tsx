import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Film className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold">MindPaperScreen</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild variant="ghost">
            <Link to="/editor">Go to Editor</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};