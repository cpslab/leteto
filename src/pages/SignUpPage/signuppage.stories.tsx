import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SignUpPage } from '.';

export default {
  title: 'page/SignUpPage',
  component: SignUpPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <SignUpPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
