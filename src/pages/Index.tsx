import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Editor } from '@/components/Editor';
import { Footer } from '@/components/Footer';
import { UpgradeModal } from '@/components/UpgradeModal';
import { showSuccess } from '@/utils/toast';

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
`;

const AUTO_SAVE_INTERVAL = 60 * 1000; // 1 minute
const SCRIPT_STORAGE_KEY = 'mindpaperscreen-script';
const RIGHT_PANE_STORAGE_KEY = 'mindpaperscreen-right-pane';

const Index = () => {
  const [scriptContent, setScriptContent] = useState(() => {
    return localStorage.getItem(SCRIPT_STORAGE_KEY) || initialScript;
  });
  const [rightPaneContent, setRightPaneContent] = useState(() => {
    return localStorage.getItem(RIGHT_PANE_STORAGE_KEY) || '';
  });
  const [isIndianFormat, setIsIndianFormat] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());

  // Save script content to local storage on change
  useEffect(() => {
    localStorage.setItem(SCRIPT_STORAGE_KEY, scriptContent);
    setLastSaved(new Date());
  }, [scriptContent]);

  // Save right pane content to local storage on change
  useEffect(() => {
    localStorage.setItem(RIGHT_PANE_STORAGE_KEY, rightPaneContent);
    setLastSaved(new Date());
  }, [rightPaneContent]);

  const handleSave = () => {
    // Manual save is now just for user feedback, as it saves on every keystroke.
    setLastSaved(new Date());
    showSuccess('Script saved!');
  };

  // This interval is now just for periodic "auto-saved" notifications.
  useEffect(() => {
    const interval = setInterval(() => {
      showSuccess('Script auto-saved!');
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const wordCount =
    (scriptContent.trim().split(/\s+/).filter(Boolean).length || 0) +
    (rightPaneContent.trim().split(/\s+/).filter(Boolean).length || 0);

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Editor
            scriptContent={scriptContent}
            setScriptContent={setScriptContent}
            rightPaneContent={rightPaneContent}
            setRightPaneContent={setRightPaneContent}
            isIndianFormat={isIndianFormat}
            setIsIndianFormat={setIsIndianFormat}
          />
        </main>
      </div>
      <Footer wordCount={wordCount} onSave={handleSave} lastSaved={lastSaved} />
      <UpgradeModal />
    </div>
  );
};

export default Index;