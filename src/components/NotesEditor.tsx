import { Textarea } from '@/components/ui/textarea';

interface NotesEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const NotesEditor = ({ content, setContent }: NotesEditorProps) => {
  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <p className="text-sm text-muted-foreground mb-4">
        A scratchpad for your ideas, research, and reminders.
      </p>
      <div className="flex-1 flex">
        <Textarea
          placeholder="Jot down your notes here..."
          className="w-full resize-none text-base font-mono leading-relaxed p-4 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};