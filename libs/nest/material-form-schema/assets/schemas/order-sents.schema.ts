import { JSONSchema7 } from 'json-schema';

export const orderSents_Schema: JSONSchema7 = {
  title: 'Order the Sentences',
  type: 'object',
  properties: {
    words: {
      type: 'array',
      title: 'Sentences (in correct order)',
      items: {
        type: 'object',
        required: ['sentence'],
        properties: {
          sentence: { type: 'string', title: 'Sentence' },
        },
      },
    },
  },
};
