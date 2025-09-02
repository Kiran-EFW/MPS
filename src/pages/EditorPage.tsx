import { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Editor } from '@/components/Editor';
import { Footer } from '@/components/Footer';
import { UpgradeModal } from '@/components/UpgradeModal';
import { showSuccess } from '@/utils/toast';
import { LoglineEditor } from '@/components/LoglineEditor';
import { SynopsisEditor } from '@/components/SynopsisEditor';
import { parseScenes, parseCharacters, parseLocations } from '@/utils/screenplay';

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

const EditorPage = () => {
  const [activeView, setActiveView] = useState('screenplay');

  const [scriptContent, setScriptContent] = useState(() => localStorage.getItem(SCRIPT_STORAGE_KEY) || initialScript);
  const [rightPaneContent, setRightPaneContent] = useState(() => localStorage.getItem(RIGHT_PANE_STORAGE_KEY) || '');
  const [loglineContent, setLoglineContent] = useState(() => localStorage.getItem(LOGLINE_STORAGE_KEY) || '');
  const [synopsisContent, setSynopsisContent] = useState(() => localStorage.getItem(SYNOPSIS_STORAGE_KEY) || '');

  const [isIndianFormat, setIsIndianFormat] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const scenes = useMemo(() => parseScenes(scriptContent), [scriptContent]);
  const characters = useMemo(() => parseCharacters(scriptContent), [scriptContent]);
  const locations = useMemo(() => parseLocations(scriptContent), [scriptContent]);

  useEffect(() => {
    localStorage.setItem(SCRIPT_STORAGE_KEY, scriptContent);
    setLastSaved(new Date());
  }, [scriptContent]);

  useEffect(() => {
    localStorage.setItem(RIGHT_PANE_STORAGE_KEY, rightPaneContent);
    setLastSaved(new Date());
  }, [rightPaneContent]);

  useEffect(() => {
    localStorage.setItem(LOGLINE_STORAGE_KEY, loglineContent);
    setLastSaved(new Date());
  }, [loglineContent]);

  useEffect(() => {
    localStorage.setItem(SYNOPSIS_STORAGE_KEY, synopsisContent);
    setLastSaved(new Date());
  }, [synopsisContent]);

  const handleSave = () => {
    setLastSaved(new Date());
    showSuccess('Project saved!');
  };

  const handleSearchAndNavigate = (searchTerm: string) => {
    const textarea = editorRef.current;
    if (textarea) {
      const currentPosition = textarea.selectionStart;
      let index = textarea.value.indexOf(searchTerm, currentPosition + 1);
      if (index === -1) {
        index = textarea.value.indexOf(searchTerm);
      }

      if (index !== -1) {
        textarea.focus();
        textarea.setSelectionRange(index, index + searchTerm.length);
        showSuccess(`Found "${searchTerm}"`);
      } else {
        showSuccess(`"${searchTerm}" not found`);
      }
    }
  };

  const handleSceneClick = (scene: string) => {
    const textarea = editorRef.current;
    if (textarea) {
      const index = textarea.value.indexOf(scene);
      if (index !== -1) {
        textarea.focus();
        textarea.setSelectionRange(index, index);
        showSuccess(`Navigated to scene`);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showSuccess('Project auto-saved!');
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const wordCount = [scriptContent, rightPaneContent, loglineContent, synopsisContent]
    .map((content) => content.trim().split(/\s+/).filter(Boolean).length)
    .reduce((sum, count) => sum + count, 0);

  const renderActiveView = () => {
    switch (activeView) {
      case 'logline':
        return <LoglineEditor content={loglineContent} setContent={setLoglineContent} />;
      case 'synopsis':
        return <SynopsisEditor content={synopsisContent} setContent={setSynopsisContent} />;
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

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onViewChange={setActiveView}
          scenes={scenes}
          characters={characters}
          locations={locations}
          onSceneClick={handleSceneClick}
          onCharacterClick={handleSearchAndNavigate}
          onLocationClick={handleSearchAndNavigate}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          {renderActiveView()}
        </main>
      </div>
      <Footer wordCount={wordCount} onSave={handleSave} lastSaved={lastSaved} />
      <UpgradeModal />
    </div>
  );
};

export default EditorPage;