import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Kbd } from '@/components/ui/kbd';

interface KeyboardShortcutsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { command: 'Format Scene Heading', keys: ['Ctrl', '1'] },
  { command: 'Format Action', keys: ['Ctrl', '2'] },
  { command: 'Format Character', keys: ['Ctrl', '3'] },
  { command: 'Format Dialogue', keys: ['Ctrl', '4'] },
  { command: 'Format Parenthetical', keys: ['Ctrl', '5'] },
  { command: 'Format Transition', keys: ['Ctrl', '6'] },
  { command: 'Cycle to Next Format', keys: ['Tab'] },
  { command: 'Cycle to Previous Format', keys: ['Shift', 'Tab'] },
  { command: 'Bold Text', keys: ['Ctrl', 'B'] },
  { command: 'Italicize Text', keys: ['Ctrl', 'I'] },
  { command: 'Underline Text', keys: ['Ctrl', 'U'] },
  { command: 'Find & Replace', keys: ['Ctrl', 'F'] },
  { command: 'Exit Distraction-Free Mode', keys: ['Esc'] },
];

export const KeyboardShortcutsDialog = ({ isOpen, onClose }: KeyboardShortcutsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Boost your productivity with these shortcuts.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Command</TableHead>
                <TableHead className="text-right">Shortcut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortcuts.map((shortcut) => (
                <TableRow key={shortcut.command}>
                  <TableCell>{shortcut.command}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {shortcut.keys.map((key, index) => (
                        <Kbd key={index}>{key}</Kbd>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};