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
  onLanguageChange: (code: string, name: string) => void;
  onShortcutsClick: () => void;
  onApplyStyle: (style: 'bold' | 'italic' | 'underline') => void;
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

export const AppMenuBar = ({ onFindClick, onPrint, scriptContent, titlePageContent, onEnterDistractionFree, onViewChange, onLanguageChange, onShortcutsClick, onApplyStyle }: AppMenuBarProps) => {
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
          <MenubarItem onClick={() => showPlaceholder('Undo')}>Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Redo')}>Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => showPlaceholder('Cut')}>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Copy')}>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Paste')}>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Delete')}>Delete</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => showPlaceholder('Select All')}>Select All <MenubarShortcut>Ctrl+A</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => onApplyStyle('bold')}>Bold <MenubarShortcut>Ctrl+B</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => onApplyStyle('italic')}>Italic <MenubarShortcut>Ctrl+I</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => onApplyStyle('underline')}>Underline <MenubarShortcut>Ctrl+U</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onFindClick}>Find & Replace... <MenubarShortcut>Ctrl+F</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Find Next')}>Find Next <MenubarShortcut>Ctrl+G</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Find Previous')}>Find Previous <MenubarShortcut>Ctrl+Shift+G</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Go To')}>Go To... <MenubarShortcut>Ctrl+T</MenubarShortcut></MenubarItem>
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
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Scene Heading <MenubarShortcut>Ctrl+1</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Action <MenubarShortcut>Ctrl+2</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Character <MenubarShortcut>Ctrl+3</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Dialogue <MenubarShortcut>Ctrl+4</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Parenthetical <MenubarShortcut>Ctrl+5</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showSuccess('Use the format toolbar in the editor view.')}>Transition <MenubarShortcut>Ctrl+6</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Shot')}>Shot <MenubarShortcut>Ctrl+7</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => showPlaceholder('Upper/Lower Case')}>Upper/Lower Case <MenubarShortcut>Ctrl+K</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Make Dual Dialogue')}>Make Dual Dialogue <MenubarShortcut>Ctrl+D</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Document</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => onViewChange('titlepage')}>Title Page</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Index Cards')}>Index Cards</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Page Layout')}>Page Layout</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Header and Footer')}>Header and Footer</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => onViewChange('synopsis')}>Synopsis</MenubarItem>
          <MenubarItem onClick={() => onViewChange('notes')}>Notes</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => showPlaceholder('Check Spelling')}>Check Spelling <MenubarShortcut>Ctrl+Alt+K</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Language</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Speech-to-Text Language</MenubarSubTrigger>
            <MenubarSubContent>
              {languages.map((lang) => (
                <MenubarItem key={lang.code} onClick={() => onLanguageChange(lang.code, lang.name)}>
                  {lang.name}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
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
          <MenubarItem onClick={() => showPlaceholder('Page Numbering')}>Page Numbering</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Scene Numbering')}>Scene Numbering</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Revisions</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => showPlaceholder('Mark Revision')}>Mark Revision</MenubarItem>
              <MenubarItem onClick={() => showPlaceholder('Next Revision')}>Next Revision</MenubarItem>
              <MenubarItem onClick={() => showPlaceholder('Previous Revision')}>Previous Revision</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onClick={() => showPlaceholder('Omit Scene')}>Omit Scene</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('Scene Versions')}>Scene Versions</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => showPlaceholder('Reports')}>Reports</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showPlaceholder('Documentation')}>Documentation</MenubarItem>
          <MenubarItem onClick={onShortcutsClick}>Keyboard Shortcuts</MenubarItem>
          <MenubarItem onClick={() => showPlaceholder('About MindPaperScreen')}>About MindPaperScreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};