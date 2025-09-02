import { Link } from 'react-router-dom';
import { Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="container flex flex-col items-center justify-center text-center py-20 md:py-32">
      <Feather className="h-16 w-16 mb-6 text-primary animate-pulse" />
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
        Bring Your Screenplay to Life
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
        MindPaperScreen is a simple, intuitive, and powerful tool for writers.
        Focus on your story with smart formatting, seamless organization, and a distraction-free interface.
      </p>
      <Button size="lg" asChild>
        <Link to="/editor">Start Writing for Free</Link>
      </Button>
    </section>
  );
};