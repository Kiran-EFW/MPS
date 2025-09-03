import { Clock, CheckCircle2, Film } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FooterProps {
  wordCount: number;
  pageCount: number;
  saveStatus: 'saving' | 'saved';
}

export const Footer = ({ wordCount, pageCount, saveStatus }: FooterProps) => {
  const screenTime = pageCount; // 1 page ≈ 1 minute of screen time

  return (
    <footer className="flex items-center justify-between p-2 border-t bg-card text-card-foreground text-sm flex-wrap gap-2">
      <div className="flex items-center gap-4 flex-wrap">
        <span>Page: {pageCount}/10</span>
        <span>Words: {wordCount}</span>
        <span className="flex items-center gap-1">
          <Film className="h-4 w-4" />
          <span>~{screenTime} min screen time</span>
        </span>
        <Badge variant="destructive">10-page limit for free users</Badge>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-end">
        {saveStatus === 'saving' ? (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Clock className="h-4 w-4" />
            <span>Saving...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            <span>All changes saved</span>
          </div>
        )}
      </div>
    </footer>
  );
};