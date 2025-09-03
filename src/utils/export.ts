import { parseScript } from '@/utils/parser';

const triggerDownload = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToMarkdown = (script: string, title: string) => {
  const parsedLines = parseScript(script);
  let markdown = `# ${title || 'Untitled Screenplay'}\n\n`;

  parsedLines.forEach(line => {
    if (line.type === 'empty') {
      markdown += '\n';
      return;
    }

    const text = line.text.trim();
    switch (line.type) {
      case 'scene':
        markdown += `## ${text}\n\n`;
        break;
      case 'action':
        markdown += `${text}\n\n`;
        break;
      case 'character':
        markdown += `**${text}**\n`;
        break;
      case 'dialogue':
        markdown += `> ${text}\n\n`;
        break;
      case 'parenthetical':
        markdown += `_${text}_\n`;
        break;
      case 'transition':
        markdown += `**${text}**\n\n`;
        break;
      default:
        markdown += `${text}\n\n`;
    }
  });

  const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  triggerDownload(markdown, `${safeTitle || 'script'}.md`, 'text/markdown');
};

export const exportToFountain = (script: string, title: string) => {
  const parsedLines = parseScript(script);
  let fountain = `Title: ${title || 'Untitled Screenplay'}\n\n`;

  parsedLines.forEach((line, index) => {
    const prevLine = parsedLines[index - 1];

    // Fountain relies on blank lines for separation
    if (line.type === 'scene' && prevLine?.type !== 'empty') {
      fountain += '\n';
    }
    if (line.type === 'character' && prevLine?.type !== 'empty') {
      fountain += '\n';
    }

    switch (line.type) {
      case 'scene':
        fountain += `${line.text.toUpperCase()}\n`;
        break;
      case 'action':
        fountain += `${line.text}\n`;
        break;
      case 'character':
        fountain += `${line.text.toUpperCase()}\n`;
        break;
      case 'dialogue':
        fountain += `${line.text}\n`;
        break;
      case 'parenthetical':
        fountain += `${line.text}\n`;
        break;
      case 'transition':
        fountain += `> ${line.text.toUpperCase()}\n`;
        break;
      case 'empty':
        // Avoid multiple consecutive blank lines
        if (prevLine?.type !== 'empty') {
          fountain += '\n';
        }
        break;
      default:
        fountain += `${line.text}\n`;
    }
  });

  const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  triggerDownload(fountain, `${safeTitle || 'script'}.fountain`, 'text/plain');
};