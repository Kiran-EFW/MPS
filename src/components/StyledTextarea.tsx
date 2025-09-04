import React, { useRef, useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { parseScript, ParsedLine } from '@/utils/parser';
import { cn } from '@/lib/utils';

interface StyledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

const getLineClass = (line: ParsedLine) => {
  switch (line.type) {
    case 'scene': return 'editor-scene';
    case 'action': return 'editor-action';
    case 'character': return 'editor-character';
    case 'dialogue': return 'editor-dialogue';
    case 'parenthetical': return 'editor-parenthetical';
    case 'transition': return 'editor-transition';
    default: return 'editor-action';
  }
};

export const StyledTextarea = React.forwardRef<HTMLTextAreaElement, StyledTextareaProps>(
  ({ value, ...props }, ref) => {
    const backdropRef = useRef<HTMLDivElement>(null);
    const [parsedLines, setParsedLines] = useState<ParsedLine[]>([]);

    useEffect(() => {
      setParsedLines(parseScript(value));
    }, [value]);

    const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
      if (backdropRef.current) {
        backdropRef.current.scrollTop = event.currentTarget.scrollTop;
        backdropRef.current.scrollLeft = event.currentTarget.scrollLeft;
      }
    };

    return (
      <div className="relative w-full h-full font-mono text-base leading-relaxed">
        <div
          ref={backdropRef}
          className="absolute inset-0 overflow-auto p-4 rounded-md border-0 bg-background text-foreground pointer-events-none"
        >
          {parsedLines.map((line, index) => (
            <div key={index} className={cn('editor-line', getLineClass(line))}>
              {line.text || '\u00A0'} {/* Use non-breaking space for empty lines to maintain height */}
            </div>
          ))}
        </div>
        <Textarea
          ref={ref}
          value={value}
          onScroll={handleScroll}
          className="absolute inset-0 w-full h-full resize-none p-4 rounded-md border bg-transparent text-transparent caret-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          {...props}
        />
      </div>
    );
  }
);