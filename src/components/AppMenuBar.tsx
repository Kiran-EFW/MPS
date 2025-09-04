import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useTheme } from "next-themes";
import { showSuccess, showError } from '@/utils/toast';
import { exportToMarkdown, exportToFountain } from '@/utils/export';
import { exportToPdf } from '@/utils/pdfExport';
import { TitlePageContent } from './TitlePageEditor';

interface AppMenuBarProps {
  onFindClick: () => void;
  onPrint: () => void;
  scriptContent: string;
  titlePageContent: TitlePageContent;
  onEnterDistractionFree: () => void;
  onViewChange: (view: string) => void;
}

const languages = [
  { code: 'en-US', name: 'English' },
  { code: 'ml-IN', name: 'Malayalam' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'kn-IN', name: 'Kannada' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'ar-SA', name: 'Arabic (RTL)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'fr-FR', name: 'French' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'de-DE', name: 'German' },
];

export const AppMenuBar = ({ onFindClick, onPrint, scriptContent, titlePageContent, onEnterDistractionFree, onViewChange }: AppMenuBarProps) => {
  const { setTheme } = useTheme();

  const handleExport = (format: string) => {
    if (format === 'Print') {
      onPrint();
      return;
    }
    if (format === 'PDF') {
      exportToPdf(scriptContent, titlePageContent);
      return;
    }
    if (format === 'Markdown') {
      exportToMarkdown(scriptContent, titlePageContent.title);
      showSuccess('Exporting to Markdown...');
      return;
    }
    if (format === 'Fountain') {
      exportToFountain(scriptContent, titlePageContent.title);
      showSuccess('Exporting to Fountain...');
      return;
    }
  };

  const showPlaceholder = (feature: string) => {
    showError(`${feature} is not yet available.`);
  };

  return (
    <Menubar className="border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showPlaceholder('New Screenplay')}>New Screenplay</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Open...')}>Open...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => showSuccess('Your work is saved automatically!')}>Save</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Save As...')}>Save As...</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Export</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => handleExport('PDF')}>PDF</MenubarItem>
              <MenubarItem onClick={() => handleExport('Print')}>Print</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => handleExport('Fountain')}>Fountain (.fountain)</MenubarItem>
              <MenubarItem onClick={() => handleExport('Markdown')}>Markdown</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showPlaceholder('Undo')}>Undo</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Redo')}>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => showPlaceholder('Cut')}>Cut</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Copy')}>Copy</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Paste')}>Paste</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onFindClick}>Find & Replace... <MenubarShortcut>⌘F</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => onViewChange('screenplay')}>Screenplay</MenubarItem>
          <MenubarItem onClick={() => onViewChange('outline')}>Outline</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onEnterDistractionFree}>Distraction-Free Mode</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Theme</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => setTheme('light')}>Light</MenubarItem>
              <MenubarItem onClick={() => setTheme('dark')}>Dark</MenubarItem>
              <MenubarItem onClick={() => setTheme('system')}>System</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Scene Heading</MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Action</MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Character</MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Dialogue</MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Parenthetical</MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Transition</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Document</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => onViewChange('titlepage')}>Title Page</MenubarItem>
          <MenubarItem onClick={() => onViewChange('logline')}>Logline</MenubarItem>
          <MenubarItem onClick={() => onViewChange('synopsis')}>Synopsis</MenubarItem>
          <MenubarItem onClick={() => onViewChange('notes')}>Notes</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Collaborate</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showPlaceholder('Share')}>Share...</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Invite Collaborators')}>Invite Collaborators...</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Version History')}>Version History</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Production</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showPlaceholder('Scene Breakdown')}>Scene Breakdown</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Character Reports')}>Character Reports</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Location Reports')}>Location Reports</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showPlaceholder('Documentation')}>Documentation</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Keyboard Shortcuts')}>Keyboard Shortcuts</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('About MindPaperScreen')}>About MindPaperScreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};