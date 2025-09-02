import { Textarea } from '@/components/ui/textarea';

interface LoglineEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const LoglineEditor = ({ content, setContent }: LoglineEditorProps) => {
  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Logline</h2>
      <p className="text-sm text-muted-foreground mb-4">
        A one-sentence summary of your story.
      </p>
      <div className="flex-1 flex">
        <Textarea
          placeholder="Enter your logline here..."
          className="w-full resize-none text-base font-mono leading-relaxed p-4 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};