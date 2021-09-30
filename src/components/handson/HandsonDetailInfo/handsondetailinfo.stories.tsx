import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { HandsonDetailInfo, HandsonDetailInfoProps } from '.';

export default {
  title: 'component/handson/HandsonDetailInfo',
  component: HandsonDetailInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HandsonDetailInfoProps> = (args) => (
  <HandsonDetailInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  document_url: 'https://document.example.com',
  meeting_url: 'https://meeting.example.com',
  movie_url: 'https://movie.example.com',
  isMember: true,
  isOwner: false,
};
