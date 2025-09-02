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

const Index = () => {
  const [scriptContent, setScriptContent] = useState(initialScript);
  const [rightPaneContent, setRightPaneContent] = useState('');
  const [isIndianFormat, setIsIndianFormat] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());

  const handleSave = () => {
    // In a real app, this is where you would save the script content.
    console.log('Saving script...');
    setLastSaved(new Date());
    showSuccess('Script saved!');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // This simulates the auto-save functionality.
      setLastSaved(new Date());
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