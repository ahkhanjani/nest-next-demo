import { JSONSchema7 } from 'json-schema';

export const wordInCorrectSentence_schema: JSONSchema7 = {
  title: 'Put the Word in Correct Sentence',
  type: 'object',
  properties: {
    sentences: {
      type: 'array',
      title: 'Sentences',
      items: {
        type: 'object',
        required: ['sentence', 'word'],
        properties: {
          sentence: { type: 'string', title: 'Sentence' },
          word: { type: 'string', title: 'Word' },
        },
      },
    },
  },
};
