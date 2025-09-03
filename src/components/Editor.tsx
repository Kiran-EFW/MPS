import { useState, forwardRef, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface EditorProps {
  scriptContent: string;
  setScriptContent: (content: string) => void;
  rightPaneContent: string;
  setRightPaneContent: (content: string) => void;
  isIndianFormat: boolean;
  setIsIndianFormat: (isIndian: boolean) => void;
}

const formats = ['scene', 'action', 'character', 'dialogue', 'parenthetical', 'transition'];
const formatMap = [
  { name: 'scene', label: 'Scene Heading', shortcut: '1' },
  { name: 'action', label: 'Action', shortcut: '2' },
  { name: 'character', label: 'Character', shortcut: '3' },
  { name: 'dialogue', label: 'Dialogue', shortcut: '4' },
  { name: 'parenthetical', label: 'Parenthetical', shortcut: '5' },
  { name: 'transition', label: 'Transition', shortcut: '6' },
];

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(({
  scriptContent,
  setScriptContent,
  rightPaneContent,
  setRightPaneContent,
  isIndianFormat,
  setIsIndianFormat,
}, ref) => {
  const [format, setFormat] = useState('action');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        const shortcut = parseInt(event.key, 10);
        if (shortcut >= 1 && shortcut <= 6) {
          event.preventDefault();
          setFormat(formats[shortcut - 1]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-4 border-b flex-wrap gap-4">
        <ToggleGroup
          type="single"
          className="flex-wrap justify-start"
          value={format}
          onValueChange={(value) => {
            if (value) setFormat(value);
          }}
        >
          {formatMap.map(item => (
            <ToggleGroupItem value={item.name} key={item.name} className="flex items-center gap-2">
              {item.label}
              <span className="text-xs text-muted-foreground ml-1">(Ctrl+{item.shortcut})</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex items-center space-x-2">
          <Label htmlFor="layout-switch">Indian Cinema Format</Label>
          <Switch id="layout-switch" checked={isIndianFormat} onCheckedChange={setIsIndianFormat} />
        </div>
      </div>
      <div className="mb-2 text-sm text-muted-foreground">
        Current Format: <span className="capitalize font-semibold text-foreground">{format}</span>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {isIndianFormat ? (
          <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-lg border">
            <ResizablePanel>
              <Textarea
                ref={ref}
                placeholder="Video cues, actions..."
                className="h-full w-full resize-none text-base font-mono leading-relaxed p-4 rounded-md border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <Textarea
                placeholder="Dialogue, sound..."
                className="h-full w-full resize-none text-base font-mono leading-relaxed p-4 rounded-md border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={rightPaneContent}
                onChange={(e) => setRightPaneContent(e.target.value)}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <Textarea
            ref={ref}
            placeholder="Start writing your screenplay..."
            className="w-full h-full resize-none text-base font-mono leading-relaxed p-4 rounded-md border"
            value={scriptContent}
            onChange={(e) => setScriptContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
});