import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { parseScriptToScenes, estimateSceneLength } from '@/utils/screenplay';
import { SortableSceneCard } from './SortableSceneCard';

interface OutlineEditorProps {
  scriptContent: string;
  onSceneClick: (sceneHeading: string) => void;
  onReorderScenes: (oldIndex: number, newIndex: number) => void;
}

export const OutlineEditor = ({ scriptContent, onSceneClick, onReorderScenes }: OutlineEditorProps) => {
  const scenes = parseScriptToScenes(scriptContent);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const summarizeContent = (content: string) => {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const summary = lines.slice(0, 3).join('\n');
    return summary || 'Scene is empty.';
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = scenes.findIndex(s => s.heading === active.id);
      const newIndex = scenes.findIndex(s => s.heading === over.id);
      onReorderScenes(oldIndex, newIndex);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Scene Outline</h2>
        <p className="text-sm text-muted-foreground mb-8">
          A high-level overview of your screenplay. Drag and drop cards to reorder scenes.
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={scenes.map(s => s.heading)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {scenes.map((scene, index) => {
                const sceneLength = estimateSceneLength(scene.content);
                const summarizedContent = summarizeContent(scene.content);
                return (
                  <SortableSceneCard
                    key={scene.heading}
                    scene={scene}
                    sceneIndex={index}
                    sceneLength={sceneLength}
                    summarizedContent={summarizedContent}
                    onSceneClick={onSceneClick}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};