import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ErrorMessage } from '.';

export default {
  title: 'component/common/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});
Default.args = {};
