export type LineType = 'scene' | 'action' | 'character' | 'dialogue' | 'parenthetical' | 'transition' | 'empty';

export interface ParsedLine {
  text: string;
  type: LineType;
}

export const parseScript = (script: string): ParsedLine[] => {
  const lines = script.split('\n');
  const parsedLines: ParsedLine[] = [];

  for (let i = 0; i < lines.length; i++) {
    const text = lines[i];
    const trimmed = text.trim();
    let type: LineType = 'action';

    if (trimmed.length === 0) {
      type = 'empty';
    } else if (trimmed.startsWith('INT.') || trimmed.startsWith('EXT.')) {
      type = 'scene';
    } else if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
      type = 'parenthetical';
    } else if (trimmed.endsWith(':') && trimmed === trimmed.toUpperCase()) {
      type = 'transition';
    } else {
      const nextLine = lines[i + 1]?.trim();
      if (
        trimmed === trimmed.toUpperCase() &&
        !trimmed.includes('  ') &&
        nextLine &&
        !nextLine.startsWith('INT.') && !nextLine.startsWith('EXT.') &&
        (nextLine.startsWith('(') || nextLine !== nextLine.toUpperCase())
      ) {
        type = 'character';
      } else {
        const prevLine = parsedLines[parsedLines.length - 1];
        if (prevLine && (prevLine.type === 'character' || prevLine.type === 'parenthetical')) {
          type = 'dialogue';
        } else {
          type = 'action';
        }
      }
    }
    
    parsedLines.push({ text, type });
  }

  return parsedLines;
};