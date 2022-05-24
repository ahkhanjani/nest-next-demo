import { JSONSchema7 } from 'json-schema';

export const infoCard_Schema: JSONSchema7 = {
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
    info: {
      type: 'array',
      title: 'Information',
      items: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          title: { type: 'string', title: 'Title' },
          description: { type: 'string', title: 'Description' },
        },
      },
    },
  },
};
