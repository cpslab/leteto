import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { AppBase } from '../../components/common/AppBase';
import { CustomAppBar } from '../../components/common/CustomAppBar';

export const LandingPage: React.FC = () => {
  return (
    <Grid>
      <CustomAppBar
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
      ></CustomAppBar>

      <AppBase></AppBase>
    </Grid>
  );
};
