import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { PAGETEMPLATE } from '.';

export default {
  title: 'page/PAGETEMPLATE',
  component: PAGETEMPLATE,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <PAGETEMPLATE {...args} />;

export const Default = Template.bind({});
Default.args = {};
