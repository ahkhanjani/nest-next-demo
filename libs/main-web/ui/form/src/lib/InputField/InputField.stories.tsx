import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputField } from './InputField';

export default {
  component: InputField,
  title: 'InputField',
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
