import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { HandsonDetailContent, HandsonDetailContentProps } from '.';

export default {
  title: 'component/handson/HandsonDetailContent',
  component: HandsonDetailContent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HandsonDetailContentProps> = (args) => (
  <HandsonDetailContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  contents: [
    {
      id: 1,
      handson: 1,
      content: 'AWSのアカウントを作成する',
      passed_members: [
        {
          id: 1,
          content: 1,
          member: {
            id: 1,
            username: 'レテト太郎',
          },
        },
      ],
    },
    {
      id: 2,
      handson: 1,
      content: 'EC2インスタンスを作成する',
      passed_members: [],
    },
  ],
  isMember: true,
  currentUserId: 1,
};
