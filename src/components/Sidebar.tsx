import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Video, Users, MapPin, Notebook, History } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const sidebarItems = [
  {
    icon: FileText,
    label: 'Project Navigator',
    content: [
      { name: 'Untitled Screenplay', view: 'screenplay' },
      { name: 'Logline', view: 'logline' },
      { name: 'Synopsis', view: 'synopsis' },
    ],
  },
  {
    icon: Video,
    label: 'Scenes',
    content: [{ name: 'Scene 1: INT. COFFEE SHOP - DAY' }, { name: 'Scene 2: EXT. PARK - NIGHT' }],
  },
  {
    icon: Users,
    label: 'Characters',
    content: [{ name: 'JOHN (30s)' }, { name: 'JANE (30s)' }],
  },
  {
    icon: MapPin,
    label: 'Locations',
    content: [{ name: 'COFFEE SHOP' }, { name: 'PARK' }],
  },
  {
    icon: Notebook,
    label: 'Notes',
    content: [{ name: 'Research on 1920s fashion' }, { name: 'Dialogue ideas' }],
  },
  {
    icon: History,
    label: 'Workflow History',
    content: [{ name: 'Saved 2 mins ago' }, { name: 'Edited Scene 1' }],
  },
];

interface SidebarProps {
  onViewChange: (view: string) => void;
}

export const Sidebar = ({ onViewChange }: SidebarProps) => {
  const handleItemClick = (item: { name: string; view?: string }) => {
    if (item.view) {
      onViewChange(item.view);
      showSuccess(`Switched to ${item.name}`);
    } else {
      showSuccess(`Loading ${item.name}...`);
    }
  };

  return (
    <aside className="w-72 p-4 border-r bg-card text-card-foreground overflow-y-auto">
      <Accordion type="multiple" defaultValue={['Project Navigator']} className="w-full">
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
                          onClick={() => handleItemClick(contentItem)}
                        >
                          {contentItem.name}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Click to load {contentItem.name}</p>
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