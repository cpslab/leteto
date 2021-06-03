import React from 'react';
import { Button } from '@material-ui/core';
import { AppBase } from '../../components/common/AppBase';
import { AppBar } from '../../components/common/AppBar';
import { AppMain } from '../../components/common/AppMain';

export const LandingPage: React.FC = () => {
  return (
    <AppBase>
      <AppBar
        left={
          <img
            src="/static/Leteto.svg"
            alt="Leteto"
            title="Leteto レテト"
            width="94px"
            height="100%"
          ></img>
        }
        right={
          <>
            <Button color="inherit">サインイン</Button>
            <Button color="inherit">サインアップ</Button>
          </>
        }
      ></AppBar>

      <AppMain></AppMain>
    </AppBase>
  );
};
