import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SignInPageComponent, SignInPageComponentProps } from '.';

export default {
  title: 'page/SignInPage',
  component: SignInPageComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SignInPageComponentProps> = (args) => (
  <SignInPageComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {};
