import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface TitlePageContent {
  title: string;
  author: string;
  contact: string;
}

interface TitlePageEditorProps {
  content: TitlePageContent;
  setContent: (content: TitlePageContent) => void;
}

export const TitlePageEditor = ({ content, setContent }: TitlePageEditorProps) => {
  const handleChange = (field: keyof TitlePageContent, value: string) => {
    setContent({ ...content, [field]: value });
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Title Page</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Enter the information for your screenplay's title page. This will be the first page of your exported PDF or printed document.
      </p>
      <div className="space-y-6 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="My Awesome Screenplay"
            value={content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Written by</Label>
          <Input
            id="author"
            placeholder="Your Name"
            value={content.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact Information</Label>
          <Textarea
            id="contact"
            placeholder="Your Address&#10;Your Phone Number&#10;Your Email"
            value={content.contact}
            onChange={(e) => handleChange('contact', e.target.value)}
            className="text-lg font-mono"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};