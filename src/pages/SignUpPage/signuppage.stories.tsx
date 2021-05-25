import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SignUpPageComponent, SignUpPageComponentProps } from '.';

export default {
  title: 'page/SignUpPage',
  component: SignUpPageComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SignUpPageComponentProps> = (args) => (
  <SignUpPageComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {};
