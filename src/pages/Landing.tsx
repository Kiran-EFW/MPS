import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Film, Feather } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6" />
          <h1 className="text-xl font-bold">MindPaperScreen</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link to="/editor">Go to Editor</Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <Feather className="h-16 w-16 mb-4 text-primary" />
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Bring Your Screenplay to Life
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          MindPaperScreen is a simple, intuitive, and powerful tool for writers.
          Focus on your story with smart formatting, seamless organization, and a distraction-free interface.
        </p>
        <Button size="lg" asChild>
          <Link to="/editor">Start Writing for Free</Link>
        </Button>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MindPaperScreen. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;