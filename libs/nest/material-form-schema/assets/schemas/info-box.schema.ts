import { JSONSchema7 } from 'json-schema';

export const infoBox_Schema: JSONSchema7 = {
  title: 'Information Box',
  type: 'object',
  properties: {
    q: {
      type: 'object',
      title: 'Text',
      required: ['title', 'description'],
      properties: {
        title: { type: 'string', title: 'Title' },
        description: { type: 'string', title: 'Description' },
      },
    },
  },
};
