import { useEffect, useRef } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';

interface FindAndReplaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  findValue: string;
  setFindValue: (value: string) => void;
  replaceValue: string;
  setReplaceValue: (value: string) => void;
  caseSensitive: boolean;
  setCaseSensitive: (value: boolean) => void;
  matchCount: number;
  currentMatchIndex: number;
  onFindNext: () => void;
  onFindPrevious: () => void;
  onReplace: () => void;
  onReplaceAll: () => void;
}

export const FindAndReplaceDialog = ({
  isOpen,
  onClose,
  findValue,
  setFindValue,
  replaceValue,
  setReplaceValue,
  caseSensitive,
  setCaseSensitive,
  matchCount,
  currentMatchIndex,
  onFindNext,
  onFindPrevious,
  onReplace,
  onReplaceAll,
}: FindAndReplaceDialogProps) => {
  const findInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        findInputRef.current?.focus();
      }, 100);
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
              ref={findInputRef}
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="case-sensitive"
              checked={caseSensitive}
              onCheckedChange={(checked) => setCaseSensitive(Boolean(checked))}
            />
            <Label htmlFor="case-sensitive" className="font-normal">
              Case sensitive
            </Label>
          </div>
          {findValue && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {matchCount} {matchCount === 1 ? 'match' : 'matches'} found.
              </p>
              {matchCount > 0 && currentMatchIndex > 0 && (
                <p className="text-sm text-muted-foreground">
                  {currentMatchIndex} / {matchCount}
                </p>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onFindPrevious}>
            Find Previous
          </Button>
          <Button variant="outline" onClick={onFindNext}>
            Find Next
          </Button>
          <Button variant="outline" onClick={onReplace}>
            Replace
          </Button>
          <Button onClick={onReplaceAll}>Replace All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};