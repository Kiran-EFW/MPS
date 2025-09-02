import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="container flex flex-col items-center justify-center text-center py-20 md:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Masterpiece?</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Click the button below to jump into the editor. No sign-up required.
      </p>
      <Button size="lg" asChild>
        <Link to="/editor">Start Writing Now</Link>
      </Button>
    </section>
  );
};