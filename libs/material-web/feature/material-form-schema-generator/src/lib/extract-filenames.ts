import * as fs from 'fs';

export function extractFilenames(dirname: string): string[] {
  const filenames = fs.readdirSync(dirname, 'utf-8');

  return filenames;
}
