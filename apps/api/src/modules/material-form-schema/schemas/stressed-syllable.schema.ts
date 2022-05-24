import { JSONSchema7 } from 'json-schema';

export const stressedSyllable_Schema: JSONSchema7 = {
  title: 'Stressed Syllable',
  type: 'object',
  properties: {
    info: {
      type: 'array',
      title: 'Syllables',
      items: {
        type: 'object',
        required: ['syllable', 'isStressed'],
        properties: {
          syllable: { type: 'string', title: 'Syllable' },
          isStressed: { type: 'boolean', title: 'Sressed?' },
        },
      },
    },
  },
};
