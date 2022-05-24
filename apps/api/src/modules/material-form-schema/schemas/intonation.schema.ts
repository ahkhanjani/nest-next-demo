import { JSONSchema7 } from 'json-schema';

export const intonation_Schema: JSONSchema7 = {
  title: 'Intonation',
  type: 'object',
  properties: {
    q: {
      type: 'object',
      title: 'Text',
      required: ['sentence', 'intonation'],
      properties: {
        sentence: { type: 'string', title: 'Sentence' },
        intonation: { enum: ['Rising', 'Falling'], title: 'Intonation' },
      },
    },
  },
};
