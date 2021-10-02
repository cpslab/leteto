import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { HandsonDetailDescription, HandsonDetailDescriptionProps } from '.';

export default {
  title: 'component/handson/HandsonDetailDescription',
  component: HandsonDetailDescription,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HandsonDetailDescriptionProps> = (args) => (
  <HandsonDetailDescription {...args} />
);

export const Default = Template.bind({});
Default.args = {
  detail:
    'AWS IoTCoreとM5Stackを用いてデータのロギングのシステム構築を行います。AWSは世界的にも利活用が進んでいるクラウドサービスです。今回はその中でもIoT開発プラットフォームであるAWS IoT Coreを用いた開発の基礎体験を行います。',
};
