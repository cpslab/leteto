import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { HandsonFormLayout, HandsonFormLayoutProps } from '.';

export default {
  title: 'layout/handson/HandsonFormLayout',
  component: HandsonFormLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HandsonFormLayoutProps> = (args) => (
  <HandsonFormLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  pageTitleText: 'Default',
  submitButtonText: 'Submit',
  handleHandsonFormSubmit: (data) => console.log(data),
};

export const Create = Template.bind({});
Create.args = {
  pageTitleText: '新規作成',
  submitButtonText: '保存',
  handleHandsonFormSubmit: (data) => console.log(data),
};

export const Update = Template.bind({});
Update.args = {
  pageTitleText: '編集',
  submitButtonText: '更新',
  handson: {
    id: 1,
    owner: {
      id: 1,
      username: '太郎',
    },
    title: 'Vue.js開発ハンズオン',
    headline: 'Vue.jsを用いて簡単なチャットサービスを作ります！',
    detail:
      'このハンズオンはVue.jsを用いて簡単なチャットサービスを作るハンズオンです',
    require: 'フロントエンドへの興味関心',
    document_url: 'http://example.com',
    meeting_url: 'http://example.com',
    movie_url: 'http://example.com',
    start_at: '2021-09-10T10:00',
    end_at: '2021-09-10T11:00',
    is_public: true,
  },
  handsonContents: [
    {
      id: 1,
      handsonId: 1,
      content: 'vue-cliを使ってみる',
    },
    {
      id: 2,
      handsonId: 1,
      content: 'npm startしてみる',
    },
  ],
  handleHandsonFormSubmit: (data) => console.log(data),
};
