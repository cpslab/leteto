import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { CustomAppBar } from '.';
import { Button } from '@material-ui/core';

export default {
  title: 'component/CustomAppBar',
  component: CustomAppBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<{ left: JSX.Element; right: JSX.Element }> = (args) => (
  <CustomAppBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  left: (
    <img
      src="/static/Leteto.svg"
      alt="Leteto"
      title="Leteto レテト"
      width="94px"
      height="100%"
    ></img>
  ),
  right: (
    <>
      <Button color="inherit">サインイン</Button>
      <Button color="inherit">サインアップ</Button>
    </>
  ),
};
