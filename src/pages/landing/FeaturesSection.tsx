import { Wand2, FolderKanban, Printer } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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

export const FeaturesSection = () => {
  return (
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
            <Card key={feature.title} className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
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
  );
};