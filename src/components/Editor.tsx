import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const Editor = () => {
  const screenplayPlaceholder = `INT. COFFEE SHOP - DAY

Sunlight streams through the window.

JOHN (30s), nursing a cold coffee, stares at his laptop. JANE (30s) approaches, holding two fresh cups.

JANE
Thought you could use a refill.

JOHN
(Without looking up)
Thanks. I'm stuck on this scene.

JANE
(Smiling)
Writer's block? Or just procrastinating on Reddit?
`;

  return (
    <div className="flex-1 flex flex-col p-4 bg-background">
      <div className="flex items-center justify-between mb-4 pb-4 border-b flex-wrap gap-4">
        <ToggleGroup type="single" defaultValue="action" className="flex-wrap justify-start">
          <ToggleGroupItem value="scene">Scene Heading</ToggleGroupItem>
          <ToggleGroupItem value="action">Action</ToggleGroupItem>
          <ToggleGroupItem value="character">Character</ToggleGroupItem>
          <ToggleGroupItem value="dialogue">Dialogue</ToggleGroupItem>
          <ToggleGroupItem value="parenthetical">Parenthetical</ToggleGroupItem>
          <ToggleGroupItem value="transition">Transition</ToggleGroupItem>
        </ToggleGroup>
        <div className="flex items-center space-x-2">
          <Label htmlFor="layout-switch">Indian Cinema Format</Label>
          <Switch id="layout-switch" />
        </div>
      </div>
      <Textarea
        placeholder="Start writing your screenplay..."
        className="flex-1 resize-none text-base font-mono leading-relaxed p-4 rounded-md"
        defaultValue={screenplayPlaceholder}
      />
    </div>
  );
};