import { MaterialFormSchema } from '@fm/nest/material-form-schema/interface';
// schemas
import { multipleChoices_Schema } from './multiple-choices.schema.schema';
import { sentToImg_Schema } from './sent-to-img.schema';
import { sentToSent_Schema } from './sent-to-sent.schema';
import { simpleText_Schema } from './simple-text.schema';
import { correctTheMistakeInSentence_Schema } from './correct-the-mistake-in-sentence.schema';
import { infoBox_Schema } from './info-box.schema';
import { infoCard_Schema } from './info-card.schema';
import { intonation_Schema } from './intonation.schema';
import { orderWords_Schema } from './order-words.schema';
import { wordInCorrectSentence_schema } from './word-in-correct-sentence.schema';
import { orderSents_Schema } from './order-sents.schema';

export const materialFormSchemaArray: MaterialFormSchema[] = [
  {
    type: 'Simple Text',
    schema: simpleText_Schema,
  },
  {
    type: 'Multiple Choices',
    schema: multipleChoices_Schema,
  },
  {
    type: 'Information Box',
    schema: infoBox_Schema,
  },
  {
    type: 'Information Card',
    schema: infoCard_Schema,
  },
  {
    type: 'Match Sentence w/ Sentence',
    schema: sentToSent_Schema,
  },
  {
    type: 'Match Sentence w/ Image',
    schema: sentToImg_Schema,
  },
  {
    type: 'Stressed Syllable',
    schema: sentToImg_Schema,
  },
  {
    type: 'Intonation',
    schema: intonation_Schema,
  },
  {
    type: 'Correct the Mistake in Sentence',
    schema: correctTheMistakeInSentence_Schema,
  },
  {
    type: 'Order Words',
    schema: orderWords_Schema,
  },

  {
    type: 'Word in Correct Sentence',
    schema: wordInCorrectSentence_schema,
  },
  {
    type: 'Order Sentences',
    schema: orderSents_Schema,
  },
];
