export interface Scene {
  heading: string;
  content: string;
  characters: string[];
}

export const parseScriptToScenes = (script: string): Scene[] => {
  if (!script) return [];
  const lines = script.split('\n');
  const scenes: Scene[] = [];
  let currentSceneContent: { heading: string; content: string } | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('INT.') || trimmedLine.startsWith('EXT.')) {
      if (currentSceneContent) {
        scenes.push({
          ...currentSceneContent,
          characters: parseCharacters(currentSceneContent.content),
        });
      }
      currentSceneContent = { heading: trimmedLine, content: '' };
    } else if (currentSceneContent) {
      currentSceneContent.content += line + '\n';
    }
  }

  if (currentSceneContent) {
    scenes.push({
      ...currentSceneContent,
      characters: parseCharacters(currentSceneContent.content),
    });
  }
  
  scenes.forEach(scene => {
    scene.content = scene.content.trim();
  });

  return scenes;
};

export const parseScenes = (script: string): string[] => {
  if (!script) return [];
  const lines = script.split('\n');
  const scenes = lines.filter(line => {
    const trimmedLine = line.trim();
    return trimmedLine.startsWith('INT.') || trimmedLine.startsWith('EXT.');
  });
  return [...new Set(scenes.map(scene => scene.trim()))];
};

export const parseCharacters = (script: string): string[] => {
  if (!script) return [];
  const lines = script.split('\n');
  const characters = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].trim();
    if (currentLine.length === 0) continue;

    let nextLineIndex = i + 1;
    while (nextLineIndex < lines.length && lines[nextLineIndex].trim().length === 0) {
      nextLineIndex++;
    }

    if (nextLineIndex < lines.length) {
      const nextLine = lines[nextLineIndex].trim();
      // Heuristic: A character is a line that is mostly uppercase and is followed by dialogue or a parenthetical.
      if (nextLine.startsWith('(') || (nextLine.length > 0 && nextLine !== nextLine.toUpperCase())) {
        const characterCandidate = currentLine.replace(/\(.*\)/g, '').trim();
        if (
          characterCandidate.length > 0 &&
          characterCandidate === characterCandidate.toUpperCase() &&
          !currentLine.startsWith('INT.') &&
          !currentLine.startsWith('EXT.') &&
          !currentLine.endsWith(':')
        ) {
          characters.add(currentLine);
        }
      }
    }
  }
  return Array.from(characters);
};

export const parseLocations = (script: string): string[] => {
  if (!script) return [];
  const sceneHeadings = parseScenes(script);
  const locations = sceneHeadings.map(heading => {
    return heading
      .replace(/^(INT\.|EXT\.)\s*/, '')
      .split(' - ')[0]
      .trim();
  });
  return [...new Set(locations)];
};

const LINES_PER_PAGE = 55; // Industry standard approximation

export const estimatePageCount = (script: string): number => {
  if (!script) return 1;
  const lines = script.split('\n').length;
  const count = Math.ceil(lines / LINES_PER_PAGE);
  return Math.max(1, count); // Ensure it's at least 1
};