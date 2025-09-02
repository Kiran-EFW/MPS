import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { parseScriptToScenes } from '@/utils/screenplay';

interface OutlineEditorProps {
  scriptContent: string;
  onSceneClick: (sceneHeading: string) => void;
}

export const OutlineEditor = ({ scriptContent, onSceneClick }: OutlineEditorProps) => {
  const scenes = parseScriptToScenes(scriptContent);

  const summarizeContent = (content: string) => {
    const actionLines = content.split('\n').filter(line => {
      const trimmed = line.trim();
      const isUpperCase = trimmed === trimmed.toUpperCase();
      const isParenthetical = trimmed.startsWith('(') && trimmed.endsWith(')');
      return trimmed.length > 0 && !isUpperCase && !isParenthetical;
    });
    const summary = actionLines.slice(0, 3).join('\n').trim();
    return summary || 'No action description in this scene.';
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Scene Outline</h2>
        <p className="text-sm text-muted-foreground mb-8">
          A high-level overview of your screenplay, scene by scene. Click a card to jump to that scene in the editor.
        </p>
        <div className="space-y-4">
          {scenes.map((scene, index) => (
            <Card key={index} className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => onSceneClick(scene.heading)}>
              <CardHeader>
                <CardTitle className="text-base font-mono">{index + 1}. {scene.heading}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {summarizeContent(scene.content)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};