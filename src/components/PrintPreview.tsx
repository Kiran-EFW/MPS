import React from 'react';
import { parseScript } from '@/utils/parser';
import { TitlePageContent } from './TitlePageEditor';

interface PrintPreviewProps {
  script: string;
  titlePage: TitlePageContent;
}

export const PrintPreview = ({ script, titlePage }: PrintPreviewProps) => {
  const parsedScript = parseScript(script);

  return (
    <div id="print-area">
      <div className="print-page print-title-page">
        <div className="print-title-content">
          <h1 className="print-title">{titlePage.title || 'Untitled Screenplay'}</h1>
          <p className="print-author">by</p>
          <p className="print-author">{titlePage.author || 'Unknown Author'}</p>
        </div>
        <div className="print-contact">
          {titlePage.contact.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
      <div className="print-script-body">
        {parsedScript.map((line, index) => {
          const className = `print-${line.type}`;
          if (line.type === 'empty') {
            return <br key={index} />;
          }
          return <div key={index} className={className}>{line.text}</div>;
        })}
      </div>
    </div>
  );
};