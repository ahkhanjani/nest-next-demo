import { JSONSchema7 } from 'json-schema';

export const orderWords_Schema: JSONSchema7 = {
  title: 'Order the Words',
  type: 'object',
  properties: {
    words: {
      type: 'array',
      title: 'Words (in correct order)',
      items: {
        type: 'object',
        required: ['word'],
        properties: {
          word: { type: 'string', title: 'Word' },
        },
      },
    },
  },
};
