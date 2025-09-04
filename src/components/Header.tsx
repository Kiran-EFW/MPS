import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TitlePageContent } from './TitlePageEditor';
import { AppMenuBar } from './AppMenuBar';

interface HeaderProps {
  onFindClick: () => void;
  onMenuClick?: () => void;
  onPrint: () => void;
  scriptContent: string;
  titlePageContent: TitlePageContent;
  onEnterDistractionFree: () => void;
  onLanguageChange: (code: string, name: string) => void;
  onViewChange: (view: string) => void;
  onShortcutsClick: () => void;
  onApplyStyle: (style: 'bold' | 'italic' | 'underline') => void;
}

export const Header = ({ 
  onFindClick, 
  onMenuClick, 
  onPrint, 
  scriptContent, 
  titlePageContent, 
  onEnterDistractionFree, 
  onLanguageChange,
  onViewChange,
  onShortcutsClick,
  onApplyStyle
}: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-2 border-b bg-card text-card-foreground z-10">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-bold hidden md:block">MindPaperScreen</h1>
      </div>
      <div className="flex-1 flex justify-center">
        <AppMenuBar 
          onFindClick={onFindClick}
          onPrint={onPrint}
          scriptContent={scriptContent}
          titlePageContent={titlePageContent}
          onEnterDistractionFree={onEnterDistractionFree}
          onLanguageChange={onLanguageChange}
          onViewChange={onViewChange}
          onShortcutsClick={onShortcutsClick}
          onApplyStyle={onApplyStyle}
        />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
};