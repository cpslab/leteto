import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { HandsonDetailRequirement, HandsonDetailRequirementProps } from '.';

export default {
  title: 'component/handson/HandsonDetailRequirement',
  component: HandsonDetailRequirement,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HandsonDetailRequirementProps> = (args) => (
  <HandsonDetailRequirement {...args} />
);

export const Default = Template.bind({});
Default.args = {
  require:
    'AWSのサービスを使用しますので、AWSアカウントの作成をお願いします。加えて、講義内では作ったアカウントをそのまま使うことをしません。IAMでの簡単な管理を実践します。理解が進んでいる方はAdministratorとIoTDeveloperというIAMの作成までお願いします。',
};
