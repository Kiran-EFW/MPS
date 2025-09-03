import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, GripVertical } from 'lucide-react';
import { Scene } from '@/utils/screenplay';

interface SortableSceneCardProps {
  scene: Scene;
  sceneIndex: number;
  sceneLength: string;
  summarizedContent: string;
  onSceneClick: (sceneHeading: string) => void;
}

export const SortableSceneCard = ({ scene, sceneIndex, sceneLength, summarizedContent, onSceneClick }: SortableSceneCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: scene.heading });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="relative transition-colors hover:bg-muted/50 group">
        <button {...attributes} {...listeners} className="absolute top-1/2 -translate-y-1/2 left-2 p-2 text-muted-foreground cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <GripVertical className="h-5 w-5" />
          <span className="sr-only">Drag to reorder scene</span>
        </button>
        <div className="pl-12 cursor-pointer" onClick={() => onSceneClick(scene.heading)}>
          <CardHeader>
            <CardTitle className="text-base font-mono">{sceneIndex + 1}. {scene.heading}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed mb-4">
              {summarizedContent}
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
        </div>
      </Card>
    </div>
  );
};