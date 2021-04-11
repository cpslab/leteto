import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SignInPage } from '.';

export default {
  title: 'page/SignInPage',
  component: SignInPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <SignInPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
