import { useState, forwardRef, useEffect, useCallback } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Mic } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

  const handleSpeechResult = useCallback((transcript: string) => {
    const textarea = (ref as React.RefObject<HTMLTextAreaElement>)?.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newContent = 
        scriptContent.substring(0, start) + 
        transcript + 
        scriptContent.substring(end);
      
      setScriptContent(newContent);

      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + transcript.length;
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
      }, 0);
    } else {
      setScriptContent(prev => prev + transcript);
    }
  }, [scriptContent, setScriptContent, ref]);

  const { isListening, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition({ onResult: handleSpeechResult });

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
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'j') {
      event.preventDefault();
      const textarea = event.currentTarget;
      const { value, selectionStart } = textarea;

      const lineEndIndex = value.indexOf('\n', selectionStart);
      if (lineEndIndex === -1) return;

      let nextContentStartIndex = lineEndIndex + 1;
      while (nextContentStartIndex < value.length && /\s/.test(value[nextContentStartIndex])) {
        nextContentStartIndex++;
      }

      if (nextContentStartIndex >= value.length) return;

      const nextLineEndIndex = value.indexOf('\n', nextContentStartIndex);
      const endOfNextLine = nextLineEndIndex === -1 ? value.length : nextLineEndIndex;

      const nextLineText = value.substring(nextContentStartIndex, endOfNextLine);
      const part1 = value.substring(0, lineEndIndex);
      const part2 = value.substring(endOfNextLine);
      const newContent = `${part1} ${nextLineText.trim()}${part2}`;
      
      setScriptContent(newContent);

      setTimeout(() => {
        textarea.focus();
        const newCursorPos = lineEndIndex + 1;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
      return;
    }

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
        if (format === 'action') {
          const characterCandidate = currentLine.replace(/\(.*\)/g, '').trim();
          if (
            characterCandidate.length > 0 &&
            characterCandidate === characterCandidate.toUpperCase() &&
            characterCandidate.split(' ').length <= 5 &&
            !characterCandidate.endsWith(':')
          ) {
            setFormat('dialogue');
            return;
          }
        }
        setFormat('action');
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
          <Tooltip>
            <TooltipTrigger asChild>
              <span> 
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={() => isListening ? stopListening() : startListening()}
                  disabled={!hasRecognitionSupport}
                  className={isListening ? 'animate-pulse' : ''}
                >
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">{isListening ? 'Stop recording' : 'Start recording'}</span>
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{hasRecognitionSupport ? (isListening ? 'Stop recording' : 'Start recording (Speech-to-Text)') : 'Speech recognition not supported'}</p>
            </TooltipContent>
          </Tooltip>
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