import React from 'react';
import { parseScript } from '@/utils/parser';
import { TitlePageContent } from './TitlePageEditor';

interface PrintPreviewProps {
  script: string;
  rightPaneContent: string;
  isIndianFormat: boolean;
  titlePage: TitlePageContent;
}

export const PrintPreview = ({ script, rightPaneContent, isIndianFormat, titlePage }: PrintPreviewProps) => {
  const renderStandardFormat = () => {
    const parsedScript = parseScript(script);
    return (
      <div className="print-script-body">
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

  const renderIndianFormat = () => {
    const leftLines = script.split('\n');
    const parsedRightLines = parseScript(rightPaneContent);
    const numRows = Math.max(leftLines.length, parsedRightLines.length);
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const rightLine = parsedRightLines[i];
      const rightClassName = rightLine ? `print-indian-right print-indian-${rightLine.type}` : 'print-indian-right';
      
      rows.push(
        <div key={i} className="print-indian-row">
          <div className="print-indian-left">{leftLines[i] || '\u00A0'}</div>
          <div className={rightClassName}>{rightLine?.text || '\u00A0'}</div>
        </div>
      );
    }
    return <div className="print-indian-body">{rows}</div>;
  };

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
      {isIndianFormat ? renderIndianFormat() : renderStandardFormat()}
    </div>
  );
};