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