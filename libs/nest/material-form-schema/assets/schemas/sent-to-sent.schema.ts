import { JSONSchema7 } from 'json-schema';

export const sentToSent_Schema: JSONSchema7 = {
  title: 'Match Sentence w/ Sentence',
  type: 'object',
  properties: {
    q: {
      type: 'object',
      title: 'Text',
      required: ['title'],
      properties: {
        title: { type: 'string', title: 'Title' },
      },
    },
    matches: {
      type: 'array',
      title: 'Matches',
      items: {
        type: 'object',
        required: ['colA', 'colB'],
        properties: {
          colA: { type: 'string', title: 'Column A' },
          colB: { type: 'string', title: 'Column B' },
        },
      },
    },
  },
};
