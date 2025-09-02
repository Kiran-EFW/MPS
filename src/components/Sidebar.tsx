import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Video, Users, MapPin, Notebook } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface SidebarProps {
  onViewChange: (view: string) => void;
  scenes: string[];
  characters: string[];
  locations: string[];
  onSceneClick: (scene: string) => void;
  onCharacterClick: (character: string) => void;
  onLocationClick: (location: string) => void;
  onItemClick?: () => void;
}

export const Sidebar = ({
  onViewChange,
  scenes,
  characters,
  locations,
  onSceneClick,
  onCharacterClick,
  onLocationClick,
  onItemClick,
}: SidebarProps) => {
  const sidebarItems = [
    {
      icon: FileText,
      label: 'Project Navigator',
      content: [
        { name: 'Title Page', view: 'titlepage' },
        { name: 'Untitled Screenplay', view: 'screenplay' },
        { name: 'Logline', view: 'logline' },
        { name: 'Synopsis', view: 'synopsis' },
      ],
    },
    {
      icon: Video,
      label: 'Scenes',
      content: scenes.map(scene => ({ name: scene })),
    },
    {
      icon: Users,
      label: 'Characters',
      content: characters.map(character => ({ name: character })),
    },
    {
      icon: MapPin,
      label: 'Locations',
      content: locations.map(location => ({ name: location })),
    },
    {
      icon: Notebook,
      label: 'Notes',
      content: [{ name: 'Scratchpad', view: 'notes' }],
    },
  ];

  const handleItemClick = (item: { name: string; view?: string }, category: string) => {
    if (category === 'Scenes') {
      onSceneClick(item.name);
    } else if (category === 'Characters') {
      onCharacterClick(item.name);
    } else if (category === 'Locations') {
      onLocationClick(item.name);
    } else if (item.view) {
      onViewChange(item.view);
      showSuccess(`Switched to ${item.name}`);
    } else {
      showSuccess(`Loading ${item.name}...`);
    }
    onItemClick?.();
  };

  const getTooltipText = (label: string, name: string) => {
    switch (label) {
      case 'Scenes':
        return 'Jump to scene';
      case 'Characters':
        return `Find next mention of ${name}`;
      case 'Locations':
        return `Find next mention of ${name}`;
      default:
        return `Click to load ${name}`;
    }
  };

  return (
    <aside className="w-full h-full p-4 border-r bg-card text-card-foreground overflow-y-auto">
      <Accordion type="multiple" defaultValue={['Project Navigator', 'Scenes', 'Characters', 'Locations', 'Notes']} className="w-full">
        {sidebarItems.map((item) => (
          <AccordionItem value={item.label} key={item.label}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1 pl-4">
                {item.content.map((contentItem) => (
                  <li key={contentItem.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-1 px-2 truncate"
                          onClick={() => handleItemClick(contentItem, item.label)}
                        >
                          {contentItem.name}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{getTooltipText(item.label, contentItem.name)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};