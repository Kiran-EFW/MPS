import { FileDown, Languages, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { showSuccess, showError } from '@/utils/toast';

export const Header = () => {
  const handleExport = (format: string) => {
    if (['PDF', 'Print'].includes(format)) {
      showSuccess(`Exporting to ${format}...`);
    } else {
      showError(`${format} export is a Pro feature. Please upgrade.`);
    }
  };

  const handleLanguage = (lang: string) => {
    showSuccess(`Language changed to ${lang}.`);
  };

  const handleTranslate = (lang: string) => {
    showError(`Translation to ${lang} is a Pro feature. Please upgrade.`);
  };

  return (
    <header className="flex items-center justify-between p-2 border-b bg-card text-card-foreground z-10">
      <h1 className="text-xl font-bold">MindPaperScreen</h1>
      <div className="flex items-center gap-2">
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
            <DropdownMenuItem onClick={() => handleLanguage('English (LTR)')}>English (LTR)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguage('Arabic (RTL)')}>Arabic (RTL)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguage('Hebrew (RTL)')}>Hebrew (RTL)</DropdownMenuItem>
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
      </div>
    </header>
  );
};