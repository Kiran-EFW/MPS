import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock } from 'lucide-react';
import { parseScriptToScenes, estimateSceneLength } from '@/utils/screenplay';

interface OutlineEditorProps {
  scriptContent: string;
  onSceneClick: (sceneHeading: string) => void;
}

export const OutlineEditor = ({ scriptContent, onSceneClick }: OutlineEditorProps) => {
  const scenes = parseScriptToScenes(scriptContent);

  const summarizeContent = (content: string) => {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const summary = lines.slice(0, 3).join('\n');
    return summary || 'Scene is empty.';
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Scene Outline</h2>
        <p className="text-sm text-muted-foreground mb-8">
          A high-level overview of your screenplay, scene by scene. Click a card to jump to that scene in the editor.
        </p>
        <div className="space-y-4">
          {scenes.map((scene, index) => {
            const sceneLength = estimateSceneLength(scene.content);
            return (
              <Card key={index} className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => onSceneClick(scene.heading)}>
                <CardHeader>
                  <CardTitle className="text-base font-mono">{index + 1}. {scene.heading}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed mb-4">
                    {summarizeContent(scene.content)}
                  </p>
                  {(scene.characters.length > 0 || sceneLength) && (
                    <div className="flex items-center gap-4 flex-wrap border-t pt-4 mt-4">
                      {scene.characters.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {scene.characters.map(char => (
                            <Badge key={char} variant="secondary">{char}</Badge>
                          ))}
                        </div>
                      )}
                      {sceneLength && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{sceneLength}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};