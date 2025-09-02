import { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Editor } from '@/components/Editor';
import { Footer } from '@/components/Footer';
import { UpgradeModal } from '@/components/UpgradeModal';
import { showSuccess } from '@/utils/toast';
import { LoglineEditor } from '@/components/LoglineEditor';
import { SynopsisEditor } from '@/components/SynopsisEditor';
import { parseScenes } from '@/utils/screenplay';

const initialScript = `INT. COFFEE SHOP - DAY

Sunlight streams through the window.

JOHN (30s), nursing a cold coffee, stares at his laptop. JANE (30s) approaches, holding two fresh cups.

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

  const handleSceneClick = (scene: string) => {
    const textarea = editorRef.current;
    if (textarea) {
      const index = textarea.value.indexOf(scene);
      if (index !== -1) {
        textarea.focus();
        textarea.setSelectionRange(index, index);
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
        <Sidebar onViewChange={setActiveView} scenes={scenes} onSceneClick={handleSceneClick} />
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