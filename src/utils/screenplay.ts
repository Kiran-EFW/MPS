export const parseScenes = (script: string): string[] => {
  if (!script) return [];
  const lines = script.split('\n');
  const scenes = lines.filter(line => {
    const trimmedLine = line.trim();
    // A simple heuristic for scene headings
    return trimmedLine.startsWith('INT.') || trimmedLine.startsWith('EXT.');
  });
  // Return unique scenes, preserving order of first appearance
  return [...new Set(scenes.map(scene => scene.trim()))];
};