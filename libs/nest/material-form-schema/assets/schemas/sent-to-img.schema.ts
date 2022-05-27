import { JSONSchema7 } from 'json-schema';

export const sentToImg_Schema: JSONSchema7 = {
  title: 'Match Sentence w/ Image',
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
        required: ['sent', 'img'],
        properties: {
          sent: { type: 'string', title: 'Sentence' },
          img: { type: 'string', title: 'Image Path' },
        },
      },
    },
  },
};
