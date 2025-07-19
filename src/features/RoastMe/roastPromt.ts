export type RoastLevel = 'mild' | 'savage' | 'nuclear';

export const generateRoastPrompt = (name: string, level: RoastLevel) => `
You are a Gen Z comedian. Roast a person named "${name}" at a ${level} level.
Make it clever, short (1-2 lines), and use Gen Z slang and emojis.
Keep it edgy but not offensive.
`;
