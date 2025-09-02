import { useState, forwardRef } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface EditorProps {
  scriptContent: string;
  setScriptContent: (content: string) => void;
  rightPaneContent: string;
  setRightPaneContent: (content: string) => void;
  isIndianFormat: boolean;
  setIsIndianFormat: (isIndian: boolean) => void;
}

const formats = ['scene', 'action', 'character', 'dialogue', 'parenthetical', 'transition'];

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(({
  scriptContent,
  setScriptContent,
  rightPaneContent,
  setRightPaneContent,
  isIndianFormat,
  setIsIndianFormat,
}, ref) => {
  const [format, setFormat] = useState('action');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const currentIndex = formats.indexOf(format);
      const nextIndex = (currentIndex + 1) % formats.length;
      setFormat(formats[nextIndex]);
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      const textarea = event.currentTarget;
      setTimeout(() => {
        const cursorPosition = textarea.selectionStart;
        const textUpToCursor = textarea.value.substring(0, cursorPosition);
        const lines = textUpToCursor.split('\n');
        const currentLine = (lines[lines.length - 2] || '').trim();

        if (currentLine.length === 0) {
          setFormat('action');
          return;
        }

        if (currentLine.startsWith('INT.') || currentLine.startsWith('EXT.')) {
          setFormat('action');
          return;
        }

        if (format === 'transition' || (currentLine.endsWith(':') && currentLine === currentLine.toUpperCase())) {
          setFormat('scene');
          return;
        }

        if (format === 'character') {
          setFormat('dialogue');
          return;
        }

        if (format === 'dialogue' || format === 'parenthetical') {
          setFormat('character');
          return;
        }

        if (format === 'action' && currentLine.length > 0 && currentLine === currentLine.toUpperCase() && !currentLine.startsWith('(') && !currentLine.endsWith(')')) {
          setFormat('dialogue');
          return;
        }

        if (format === 'action') {
          setFormat('action');
        }
      }, 0);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-background overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-4 border-b flex-wrap gap-4">
        <ToggleGroup
          type="single"
          className="flex-wrap justify-start"
          value={format}
          onValueChange={(value) => {
            if (value) setFormat(value);
          }}
        >
          <ToggleGroupItem value="scene">Scene Heading</ToggleGroupItem>
          <ToggleGroupItem value="action">Action</ToggleGroupItem>
          <ToggleGroupItem value="character">Character</ToggleGroupItem>
          <ToggleGroupItem value="dialogue">Dialogue</ToggleGroupItem>
          <ToggleGroupItem value="parenthetical">Parenthetical</ToggleGroupItem>
          <ToggleGroupItem value="transition">Transition</ToggleGroupItem>
        </ToggleGroup>
        <div className="flex items-center space-x-2">
          <Label htmlFor="layout-switch">Indian Cinema Format</Label>
          <Switch id="layout-switch" checked={isIndianFormat} onCheckedChange={setIsIndianFormat} />
        </div>
      </div>
      <div className="mb-2 text-sm text-muted-foreground">
        Current Format: <span className="capitalize font-semibold text-foreground">{format}</span>
      </div>
      <div className="flex-1 flex gap-4 overflow-y-auto">
        {isIndianFormat ? (
          <>
            <Textarea
              ref={ref}
              placeholder="Video cues, actions..."
              className="flex-1 resize-none text-base font-mono leading-relaxed p-4 rounded-md"
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Textarea
              placeholder="Dialogue, sound..."
              className="flex-1 resize-none text-base font-mono leading-relaxed p-4 rounded-md"
              value={rightPaneContent}
              onChange={(e) => setRightPaneContent(e.target.value)}
            />
          </>
        ) : (
          <Textarea
            ref={ref}
            placeholder="Start writing your screenplay..."
            className="w-full resize-none text-base font-mono leading-relaxed p-4 rounded-md"
            value={scriptContent}
            onChange={(e) => setScriptContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
});