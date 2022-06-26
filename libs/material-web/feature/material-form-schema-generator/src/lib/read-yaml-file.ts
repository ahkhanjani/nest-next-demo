import * as fs from 'fs';

export function readYamlFile(dirname: string, filename: string): string {
  const strYamlSchema = fs.readFileSync(`${dirname}/${filename}`, 'utf-8');

  return strYamlSchema;
}
