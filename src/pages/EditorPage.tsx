import { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Editor } from '@/components/Editor';
import { Footer } from '@/components/Footer';
import { UpgradeModal } from '@/components/UpgradeModal';
import { showSuccess, showError } from '@/utils/toast';
import { LoglineEditor } from '@/components/LoglineEditor';
import { SynopsisEditor } from '@/components/SynopsisEditor';
import { TitlePageEditor, TitlePageContent } from '@/components/TitlePageEditor';
import { NotesEditor } from '@/components/NotesEditor';
import { OutlineEditor } from '@/components/OutlineEditor';
import { parseScenes, parseCharacters, parseLocations, estimatePageCount } from '@/utils/screenplay';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { FindAndReplaceDialog } from '@/components/FindAndReplaceDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { PrintPreview } from '@/components/PrintPreview';
import { Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialScript = `INT. COFFEE SHOP - DAY

Sunlight streams through the window.

A young writer, JOHN (30s), nurses a cold coffee, staring at his laptop. JANE (30s) approaches, holding two fresh cups.

JANE
Thought you could use a refill.

JOHN
(Without looking up)
Thanks. I'm stuck on this scene.

JANE
(Smiling)
Writer's block? Or just procrastinating on Reddit?

EXT. PARK - NIGHT

A lone figure sits on a bench.

JOHN
This is the place.
`;

const SCRIPT_STORAGE_KEY = 'mindpaperscreen-script';
const RIGHT_PANE_STORAGE_KEY = 'mindpaperscreen-right-pane';
const LOGLINE_STORAGE_KEY = 'mindpaperscreen-logline';
const SYNOPSIS_STORAGE_KEY = 'mindpaperscreen-synopsis';
const TITLE_PAGE_STORAGE_KEY = 'mindpaperscreen-titlepage';
const NOTES_STORAGE_KEY = 'mindpaperscreen-notes';

interface PrintData {
  script: string;
  titlePage: TitlePageContent;
}

const EditorPage = () => {
  const [activeView, setActiveView] = useState('titlepage');
  const [isFindOpen, setIsFindOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dataToPrint, setDataToPrint] = useState<PrintData | null>(null);
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  const [scriptContent, setScriptContent] = useState(() => localStorage.getItem(SCRIPT_STORAGE_KEY) || initialScript);
  const [rightPaneContent, setRightPaneContent] = useState(() => localStorage.getItem(RIGHT_PANE_STORAGE_KEY) || '');
  const [loglineContent, setLoglineContent] = useState(() => localStorage.getItem(LOGLINE_STORAGE_KEY) || '');
  const [synopsisContent, setSynopsisContent] = useState(() => localStorage.getItem(SYNOPSIS_STORAGE_KEY) || '');
  const [notesContent, setNotesContent] = useState(() => localStorage.getItem(NOTES_STORAGE_KEY) || '');
  const [titlePageContent, setTitlePageContent] = useState<TitlePageContent>(() => {
    const saved = localStorage.getItem(TITLE_PAGE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { title: '', author: '', contact: '' };
  });

  const [isIndianFormat, setIsIndianFormat] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved'>('saved');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // State for Find and Replace
  const [findValue, setFindValue] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [matchCount, setMatchCount] = useState(0);

  const scenes = useMemo(() => parseScenes(scriptContent), [scriptContent]);
  const characters = useMemo(() => parseCharacters(scriptContent), [scriptContent]);
  const locations = useMemo(() => parseLocations(scriptContent), [scriptContent]);
  const pageCount = useMemo(() => estimatePageCount(scriptContent), [scriptContent]);

  useEffect(() => {
    if (dataToPrint !== null) {
      window.print();
      setDataToPrint(null);
    }
  }, [dataToPrint]);

  // Debounced auto-save effect
  useEffect(() => {
    setSaveStatus('saving');
    const handler = setTimeout(() => {
      localStorage.setItem(SCRIPT_STORAGE_KEY, scriptContent);
      localStorage.setItem(RIGHT_PANE_STORAGE_KEY, rightPaneContent);
      localStorage.setItem(LOGLINE_STORAGE_KEY, loglineContent);
      localStorage.setItem(SYNOPSIS_STORAGE_KEY, synopsisContent);
      localStorage.setItem(TITLE_PAGE_STORAGE_KEY, JSON.stringify(titlePageContent));
      localStorage.setItem(NOTES_STORAGE_KEY, notesContent);
      setSaveStatus('saved');
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [scriptContent, rightPaneContent, loglineContent, synopsisContent, titlePageContent, notesContent]);

  // Calculate match count for Find and Replace
  useEffect(() => {
    if (!findValue) {
      setMatchCount(0);
      return;
    }
    const flags = caseSensitive ? 'g' : 'gi';
    const escapedFindValue = findValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedFindValue, flags);
    const matches = scriptContent.match(regex);
    setMatchCount(matches ? matches.length : 0);
  }, [findValue, caseSensitive, scriptContent]);

  // Effect to handle global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDistractionFree(false);
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        setIsFindOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchAndNavigate = (searchTerm: string) => {
    setActiveView('screenplay');
    setTimeout(() => {
      const textarea = editorRef.current;
      if (textarea) {
        const currentPosition = textarea.selectionStart;
        let index = textarea.value.indexOf(searchTerm, currentPosition + 1);
        if (index === -1) { index = textarea.value.indexOf(searchTerm); }
        if (index !== -1) {
          textarea.focus();
          textarea.setSelectionRange(index, index + searchTerm.length);
          showSuccess(`Found "${searchTerm}"`);
        } else {
          showSuccess(`"${searchTerm}" not found`);
        }
      }
    }, 0);
  };

  const handleSceneClick = (scene: string) => {
    setActiveView('screenplay');
    setTimeout(() => {
      const textarea = editorRef.current;
      if (textarea) {
        const index = textarea.value.indexOf(scene);
        if (index !== -1) {
          textarea.focus();
          textarea.setSelectionRange(index, index);
          showSuccess(`Navigated to scene`);
        }
      }
    }, 0);
  };

  const findNext = () => {
    const textarea = editorRef.current;
    if (!textarea || !findValue) return;
    const textToSearch = caseSensitive ? scriptContent : scriptContent.toLowerCase();
    const termToFind = caseSensitive ? findValue : findValue.toLowerCase();
    let index = textToSearch.indexOf(termToFind, textarea.selectionEnd);
    if (index === -1) { // Wrap around
      index = textToSearch.indexOf(termToFind);
    }
    if (index !== -1) {
      textarea.focus();
      textarea.setSelectionRange(index, index + findValue.length);
    } else {
      showError(`"${findValue}" not found.`);
    }
  };

  const findPrevious = () => {
    const textarea = editorRef.current;
    if (!textarea || !findValue) return;
    const textToSearch = caseSensitive ? scriptContent : scriptContent.toLowerCase();
    const termToFind = caseSensitive ? findValue : findValue.toLowerCase();
    let index = textToSearch.lastIndexOf(termToFind, textarea.selectionStart - 1);
    if (index === -1) { // Wrap around
      index = textToSearch.lastIndexOf(termToFind);
    }
    if (index !== -1) {
      textarea.focus();
      textarea.setSelectionRange(index, index + findValue.length);
    } else {
      showError(`"${findValue}" not found.`);
    }
  };
  
  const replace = () => {
    const textarea = editorRef.current;
    if (!textarea || !findValue) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = scriptContent.substring(start, end);
    const selectionToCompare = caseSensitive ? selection : selection.toLowerCase();
    const findToCompare = caseSensitive ? findValue : findValue.toLowerCase();
    if (selectionToCompare === findToCompare) {
      const newContent = scriptContent.substring(0, start) + replaceValue + scriptContent.substring(end);
      setScriptContent(newContent);
      setTimeout(() => {
        const nextTextarea = editorRef.current;
        if (nextTextarea) {
          const newCursorPos = start + replaceValue.length;
          nextTextarea.focus();
          nextTextarea.setSelectionRange(newCursorPos, newCursorPos);
          findNext();
        }
      }, 0);
    } else {
      findNext();
    }
  };
  
  const replaceAll = () => {
    if (!findValue) return;
    const flags = caseSensitive ? 'g' : 'gi';
    const escapedFindValue = findValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedFindValue, flags);
    setScriptContent(scriptContent.replace(regex, replaceValue));
    showSuccess(`Replaced all instances of "${findValue}"`);
    setIsFindOpen(false);
  };

  const wordCount = [scriptContent, rightPaneContent, loglineContent, synopsisContent, notesContent]
    .map((content) => content.trim().split(/\s+/).filter(Boolean).length)
    .reduce((sum, count) => sum + count, 0);

  const renderActiveView = () => {
    switch (activeView) {
      case 'titlepage':
        return <TitlePageEditor content={titlePageContent} setContent={setTitlePageContent} />;
      case 'logline':
        return <LoglineEditor content={loglineContent} setContent={setLoglineContent} />;
      case 'synopsis':
        return <SynopsisEditor content={synopsisContent} setContent={setSynopsisContent} />;
      case 'notes':
        return <NotesEditor content={notesContent} setContent={setNotesContent} />;
      case 'outline':
        return <OutlineEditor scriptContent={scriptContent} onSceneClick={handleSceneClick} />;
      case 'screenplay':
      default:
        return (
          <Editor
            ref={editorRef}
            scriptContent={scriptContent}
            setScriptContent={setScriptContent}
            rightPaneContent={rightPaneContent}
            setRightPaneContent={setRightPaneContent}
            isIndianFormat={isIndianFormat}
            setIsIndianFormat={setIsIndianFormat}
          />
        );
    }
  };

  const sidebarComponent = (
    <Sidebar
      onViewChange={setActiveView}
      scenes={scenes}
      characters={characters}
      locations={locations}
      onSceneClick={handleSceneClick}
      onCharacterClick={handleSearchAndNavigate}
      onLocationClick={handleSearchAndNavigate}
      onItemClick={() => isMobile && setIsMobileSidebarOpen(false)}
    />
  );

  return (
    <>
      <div id="app-container" className="flex flex-col h-screen w-full bg-background text-foreground">
        {!isDistractionFree && (
          <Header
            onFindClick={() => setIsFindOpen(true)}
            onMenuClick={isMobile ? () => setIsMobileSidebarOpen(true) : undefined}
            onPrint={() => setDataToPrint({ script: scriptContent, titlePage: titlePageContent })}
            scriptContent={scriptContent}
            scriptTitle={titlePageContent.title}
            onEnterDistractionFree={() => setIsDistractionFree(true)}
          />
        )}
        <div className="flex-1 flex overflow-hidden">
          {isMobile ? (
            <main className="flex-1 flex flex-col overflow-hidden h-full p-4">
              {renderActiveView()}
              {!isDistractionFree && (
                <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                  <SheetContent side="left" className="p-0 w-[80%] max-w-sm">
                    {sidebarComponent}
                  </SheetContent>
                </Sheet>
              )}
            </main>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="flex flex-1 overflow-hidden">
              {!isDistractionFree && (
                <>
                  <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                    {sidebarComponent}
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                </>
              )}
              <ResizablePanel defaultSize={isDistractionFree ? 100 : 75}>
                <main className="flex-1 flex flex-col overflow-hidden h-full p-4">
                  {renderActiveView()}
                </main>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
        {!isDistractionFree && (
          <Footer wordCount={wordCount} pageCount={pageCount} saveStatus={saveStatus} />
        )}
        
        {isDistractionFree && (
          <div className="absolute top-4 right-4 z-50">
            <Button variant="outline" size="icon" onClick={() => setIsDistractionFree(false)}>
              <Minimize className="h-4 w-4" />
              <span className="sr-only">Exit Distraction-Free Mode</span>
            </Button>
          </div>
        )}

        <FindAndReplaceDialog
          isOpen={isFindOpen}
          onClose={() => setIsFindOpen(false)}
          findValue={findValue}
          setFindValue={setFindValue}
          replaceValue={replaceValue}
          setReplaceValue={setReplaceValue}
          caseSensitive={caseSensitive}
          setCaseSensitive={setCaseSensitive}
          matchCount={matchCount}
          onFindNext={findNext}
          onFindPrevious={findPrevious}
          onReplace={replace}
          onReplaceAll={replaceAll}
        />
        <UpgradeModal />
      </div>
      <div id="print-container">
        {dataToPrint && <PrintPreview script={dataToPrint.script} titlePage={dataToPrint.titlePage} />}
      </div>
    </>
  );
};

export default EditorPage;