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