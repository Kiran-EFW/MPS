import { FileDown, Languages, Globe, Search, Menu, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { showSuccess, showError } from '@/utils/toast';
import { exportToMarkdown, exportToFountain } from '@/utils/export';
import { exportToPdf } from '@/utils/pdfExport';
import { TitlePageContent } from './TitlePageEditor';

interface HeaderProps {
  onFindClick: () => void;
  onMenuClick?: () => void;
  onPrint: () => void;
  scriptContent: string;
  titlePageContent: TitlePageContent;
  onEnterDistractionFree: () => void;
  onLanguageChange: (code: string, name: string) => void;
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

export const Header = ({ onFindClick, onMenuClick, onPrint, scriptContent, titlePageContent, onEnterDistractionFree, onLanguageChange }: HeaderProps) => {
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
    showError(`${format} export is a Pro feature. Please upgrade.`);
  };

  const handleTranslate = (lang: string) => {
    showError(`Translation to ${lang} is a Pro feature. Please upgrade.`);
  };

  return (
    <header className="flex items-center justify-between p-2 border-b bg-card text-card-foreground z-10">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-bold">MindPaperScreen</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onFindClick}>
          <Search className="mr-2 h-4 w-4" /> Find & Replace
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" /> Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport('PDF')}>PDF</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('Print')}>Print</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleExport('.fdx (Final Draft)')}>.fdx (Final Draft)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('.celtx (Celtx)')}>.celtx (Celtx)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('Fountain')}>Fountain (.fountain)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('Markdown')}>Markdown</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Languages className="mr-2 h-4 w-4" /> Language
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.code} onClick={() => onLanguageChange(lang.code, lang.name)}>
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Globe className="mr-2 h-4 w-4" /> Translate
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleTranslate('Manglish')}>Manglish</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTranslate('Tamglish')}>Tamglish</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <Button variant="outline" size="icon" onClick={onEnterDistractionFree}>
          <Maximize className="h-4 w-4" />
          <span className="sr-only">Enter Distraction-Free Mode</span>
        </Button>
      </div>
    </header>
  );
};