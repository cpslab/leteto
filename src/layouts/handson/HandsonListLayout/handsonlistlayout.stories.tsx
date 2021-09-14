import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { HandsonListLayout, HandsonListLayoutProps } from '.';

export default {
  title: 'layout/HandsonListLayout',
  component: HandsonListLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HandsonListLayoutProps> = (args) => (
  <HandsonListLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handsons: [
    {
      id: 3,
      owner: {
        id: 1,
        username: '太郎',
      },
      title: 'Vue.js開発ハンズオン',
      start_at: '2021-09-10T10:00',
      end_at: '2021-09-10T11:00',
      is_public: true,
    },
    {
      id: 1,
      owner: {
        id: 1,
        username: '太郎',
      },
      title: 'React.js開発ハンズオン',
      start_at: '2021-09-10T10:00',
      end_at: '2021-09-10T11:00',
      is_public: true,
    },
    {
      id: 4,
      owner: {
        id: 1,
        username: '太郎',
      },
      title: 'Djangoハンズオン',
      start_at: '2021-09-10T10:00',
      end_at: '2021-09-10T11:00',
      is_public: true,
    },
    {
      id: 2,
      owner: {
        id: 1,
        username: '太郎',
      },
      title: 'Ruby on Railsハンズオン',
      start_at: '2021-09-10T10:00',
      end_at: '2021-09-10T11:00',
      is_public: true,
    },
    {
      id: 5,
      owner: {
        id: 1,
        username: '太郎',
      },
      title: 'M5Stackハンズオン',
      start_at: '2021-09-10T10:00',
      end_at: '2021-09-10T11:00',
      is_public: true,
    },
    {
      id: 6,
      owner: {
        id: 1,
        username: '太郎',
      },
      title: 'Linuxハンズオン',
      start_at: '2021-10-10T10:00',
      end_at: '2021-10-10T11:00',
      is_public: true,
    },
  ],
};
