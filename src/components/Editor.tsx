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
          />
        )}
      </div>
    </div>
  );
};