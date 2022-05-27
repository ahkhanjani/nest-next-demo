import { JSONSchema7 } from 'json-schema';

export const simpleText_Schema: JSONSchema7 = {
  title: 'Simple Text',
  type: 'object',
  properties: {
    q: {
      type: 'object',
      title: 'Text',
      required: ['value'],
      properties: {
        value: { type: 'string', title: 'Value' },
      },
    },
  },
};
