import { useState } from 'react';
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

export const Editor = ({
  scriptContent,
  setScriptContent,
  rightPaneContent,
  setRightPaneContent,
  isIndianFormat,
  setIsIndianFormat,
}: EditorProps) => {
  const [format, setFormat] = useState('action');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      const textarea = event.currentTarget;
      // We need a slight delay to allow the newline character to be inserted before we check the line content.
      setTimeout(() => {
        const cursorPosition = textarea.selectionStart;
        const textUpToCursor = textarea.value.substring(0, cursorPosition);
        const lines = textUpToCursor.split('\n');
        // The line before the new empty line is the one we want to check.
        const currentLine = (lines[lines.length - 2] || '').trim();

        // Rule: After a Scene Heading, switch to Action
        if (currentLine.startsWith('INT.') || currentLine.startsWith('EXT.')) {
          setFormat('action');
          return;
        }

        // Rule: After a Transition, switch to Scene Heading
        if (currentLine.endsWith('TO:')) {
          setFormat('scene');
          return;
        }

        // Rule: After a Character, switch to Dialogue
        // Heuristic: The line is all uppercase, not a scene heading, and not a transition.
        if (
          currentLine === currentLine.toUpperCase() &&
          currentLine.length > 0 &&
          !currentLine.startsWith('INT.') &&
          !currentLine.startsWith('EXT.') &&
          !currentLine.endsWith('TO:') &&
          !currentLine.startsWith('(') // Avoid matching parentheticals like (V.O)
        ) {
          setFormat('dialogue');
          return;
        }

        // Rule: If the line was empty (double enter), or we just finished dialogue, default to Action.
        // This makes it easy to move from dialogue back to describing the scene.
        if (currentLine.length === 0 || format === 'dialogue' || format === 'parenthetical') {
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
};