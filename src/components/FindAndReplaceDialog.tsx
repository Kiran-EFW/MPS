import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FindAndReplaceActions {
  onFindNext: (find: string) => void;
  onReplace: (find: string, replace: string) => void;
  onReplaceAll: (find: string, replace: string) => void;
}

interface FindAndReplaceDialogProps extends FindAndReplaceActions {
  isOpen: boolean;
  onClose: () => void;
}

export const FindAndReplaceDialog = ({
  isOpen,
  onClose,
  onFindNext,
  onReplace,
  onReplaceAll,
}: FindAndReplaceDialogProps) => {
  const [findValue, setFindValue] = useState('');
  const [replaceValue, setReplaceValue] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFindValue('');
      setReplaceValue('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find and Replace</DialogTitle>
          <DialogDescription>
            Search for text in your active document and replace it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="find" className="text-right">
              Find
            </Label>
            <Input
              id="find"
              value={findValue}
              onChange={(e) => setFindValue(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="replace" className="text-right">
              Replace
            </Label>
            <Input
              id="replace"
              value={replaceValue}
              onChange={(e) => setReplaceValue(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onFindNext(findValue)}>
            Find Next
          </Button>
          <Button variant="outline" onClick={() => onReplace(findValue, replaceValue)}>
            Replace
          </Button>
          <Button onClick={() => onReplaceAll(findValue, replaceValue)}>
            Replace All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};