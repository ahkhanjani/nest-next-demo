import { JSONSchema7 } from 'json-schema';

export const correctTheMistakeInSentence_Schema: JSONSchema7 = {
  title: 'Correct the Mistake In Sentence',
  type: 'object',
  properties: {
    q: {
      type: 'object',
      title: 'Text',
      required: ['wrong', 'correct'],
      properties: {
        wrong: { type: 'string', title: 'Wrong Sentence' },
        correct: { type: 'string', title: 'Correct Sentence' },
      },
    },
  },
};
