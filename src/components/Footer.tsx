import { Save, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface FooterProps {
  wordCount: number;
  pageCount: number;
  lastSaved: Date;
  onSave: () => void;
}

export const Footer = ({ wordCount, pageCount, lastSaved, onSave }: FooterProps) => {
  return (
    <footer className="flex items-center justify-between p-2 border-t bg-card text-card-foreground text-sm flex-wrap gap-2">
      <div className="flex items-center gap-4 flex-wrap">
        <span>Page: {pageCount}/10</span>
        <span>Words: {wordCount}</span>
        <Badge variant="destructive">10-page limit for free users</Badge>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-end">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Auto-saved: {format(lastSaved, 'p')}</span>
        </div>
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="mr-2 h-4 w-4" /> Save Now
        </Button>
      </div>
    </footer>
  );
};