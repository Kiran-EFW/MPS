import React from 'react';
import { parseScript } from '@/utils/parser';

interface PrintPreviewProps {
  script: string;
}

export const PrintPreview = ({ script }: PrintPreviewProps) => {
  const parsedScript = parseScript(script);

  return (
    <div id="print-area">
      {parsedScript.map((line, index) => {
        const className = `print-${line.type}`;
        if (line.type === 'empty') {
          return <br key={index} />;
        }
        return <div key={index} className={className}>{line.text}</div>;
      })}
    </div>
  );
};