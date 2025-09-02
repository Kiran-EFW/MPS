import { Save, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between p-2 border-t bg-card text-card-foreground text-sm">
      <div className="flex items-center gap-4">
        <span>Page: 1/10</span>
        <span>Words: 88</span>
        <Badge variant="destructive">10-page limit for free users</Badge>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Auto-saved: 10:32 AM</span>
        </div>
        <Button variant="outline" size="sm">
          <Save className="mr-2 h-4 w-4" /> Save Now
        </Button>
      </div>
    </footer>
  );
};