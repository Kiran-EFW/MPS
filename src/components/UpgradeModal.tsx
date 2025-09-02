import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const PROMPT_INTERVAL = 5 * 60 * 1000; // 5 minutes
const LOCKOUT_DURATION = 30 * 1000; // 30 seconds

export const UpgradeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
      setLockoutTime(LOCKOUT_DURATION / 1000);
    }, PROMPT_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutTime]);

  const handleClose = () => {
    if (lockoutTime === 0) {
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Zap className="text-yellow-500" /> Unlock Your Full Potential!
          </AlertDialogTitle>
          <AlertDialogDescription>
            You're doing great! To continue writing without interruptions and unlock unlimited pages, please upgrade to MindPaperScreen Pro.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={lockoutTime > 0}>
            {lockoutTime > 0 ? `Continue in ${lockoutTime}s` : 'Continue as Free User'}
          </Button>
          <AlertDialogAction asChild>
            <Button>Upgrade to Pro</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};