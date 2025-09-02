import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Video, Users, MapPin, Notebook, History } from 'lucide-react';

const sidebarItems = [
  { icon: FileText, label: 'Project Navigator', content: ['Untitled Screenplay', 'Logline', 'Synopsis'] },
  { icon: Video, label: 'Scenes', content: ['Scene 1: INT. COFFEE SHOP - DAY', 'Scene 2: EXT. PARK - NIGHT'] },
  { icon: Users, label: 'Characters', content: ['JOHN (30s)', 'JANE (30s)'] },
  { icon: MapPin, label: 'Locations', content: ['COFFEE SHOP', 'PARK'] },
  { icon: Notebook, label: 'Notes', content: ['Research on 1920s fashion', 'Dialogue ideas'] },
  { icon: History, label: 'Workflow History', content: ['Saved 2 mins ago', 'Edited Scene 1'] },
];

export const Sidebar = () => {
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
                  <li key={contentItem}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-1 px-2 truncate">
                          {contentItem}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Click to expand details for {contentItem}</p>
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