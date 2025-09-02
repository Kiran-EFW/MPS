import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Film, Feather, Wand2, FolderKanban, Printer } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Landing = () => {
  const features = [
    {
      icon: Wand2,
      title: 'Smart Formatting',
      description: 'Focus on writing, not on formatting. Our editor understands screenplay conventions and helps you format your script as you type.',
    },
    {
      icon: FolderKanban,
      title: 'Project Organization',
      description: 'Keep your title page, logline, synopsis, and notes all in one place. Navigate your project with ease.',
    },
    {
      icon: Printer,
      title: 'Industry Standard',
      description: 'Export to PDF and print with proper, industry-standard screenplay formatting, ready for submission.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container flex flex-col items-center justify-center text-center py-20 md:py-32">
          <Feather className="h-16 w-16 mb-6 text-primary" />
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

        {/* Features Section */}
        <section className="bg-muted/40 py-20 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Write</h3>
              <p className="text-muted-foreground mb-12">
                From the first idea to the final draft, we've got you covered.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <feature.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="container flex flex-col items-center justify-center text-center py-20 md:py-32">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Masterpiece?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Click the button below to jump into the editor. No sign-up required.
          </p>
          <Button size="lg" asChild>
            <Link to="/editor">Start Writing Now</Link>
          </Button>
        </section>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} MindPaperScreen. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;