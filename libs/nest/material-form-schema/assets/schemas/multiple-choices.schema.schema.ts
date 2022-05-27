import { JSONSchema7 } from 'json-schema';

export const multipleChoices_Schema: JSONSchema7 = {
  definitions: {
    mimeEnum: { type: 'string', enum: ['Text', 'Image', 'Video', 'Audio'] },
  },
  title: 'Multiple Choices',
  type: 'object',
  properties: {
    q: {
      type: 'object',
      title: 'Title',
      required: ['mime'],
      properties: {
        mime: {
          $ref: '#/definitions/mimeEnum',
          title: 'Mime',
        },
      },
      dependencies: {
        mime: {
          oneOf: [
            {
              required: ['mime', 'value'],
              properties: {
                mime: { enum: ['Text'], title: 'Mime' },
                value: { type: 'string', title: 'Value' },
              },
            },
            {
              required: ['mime', 'question', 'filepath'],
              properties: {
                mime: { enum: ['Image'], title: 'Mime' },
                question: { type: 'string', title: 'Question' },
                filepath: { type: 'string', title: 'File Path' },
              },
            },
            {
              required: ['mime', 'question', 'filepath'],
              properties: {
                mime: { enum: ['Video'], title: 'Mime' },
                question: { type: 'string', title: 'Question' },
                filepath: { type: 'string', title: 'File Path' },
              },
            },
            {
              required: ['mime', 'question', 'filepath'],
              properties: {
                mime: { enum: ['Audio'], title: 'Mime' },
                question: { type: 'string', title: 'Question' },
                filepath: { type: 'string', title: 'File Path' },
              },
            },
          ],
        },
      },
    },
    options: {
      type: 'array',
      title: 'Options',
      items: {
        type: 'object',
        required: ['mime'],
        properties: {
          mime: {
            $ref: '#/definitions/mimeEnum',
            title: 'Mime',
          },
          isCorrect: {
            type: 'boolean',
            title: 'Correct Answer?',
            default: false,
          },
        },
        dependencies: {
          mime: {
            oneOf: [
              {
                required: ['mime', 'value'],
                properties: {
                  mime: { enum: ['Text'], title: 'Mime' },
                  value: { type: 'string', title: 'Value' },
                },
              },
              {
                required: ['mime', 'filepath'],
                properties: {
                  mime: { enum: ['Image'], title: 'Mime' },
                  filepath: { type: 'string', title: 'File Path' },
                },
              },
              {
                required: ['mime', 'filepath'],
                properties: {
                  mime: { enum: ['Video'], title: 'Mime' },
                  filepath: { type: 'string', title: 'File Path' },
                },
              },
              {
                required: ['mime', 'filepath'],
                properties: {
                  mime: { enum: ['Audio'], title: 'Mime' },
                  filepath: { type: 'string', title: 'File Path' },
                },
              },
            ],
          },
        },
      },
    },
  },
};
