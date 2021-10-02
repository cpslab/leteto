import React from 'react';
import { Button } from '@material-ui/core';
import { AppBase } from '../../components/common/AppBase';
import { AppBar } from '../../components/common/AppBar';
import { AppMain } from '../../components/common/AppMain';
import { Link } from 'react-router-dom';

export const LandingPage = (): JSX.Element => {
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
            <Button color="inherit" component={Link} to="/signin">
              サインイン
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              サインアップ
            </Button>
          </>
        }
      ></AppBar>

      <AppMain>
        <></>
      </AppMain>
    </AppBase>
  );
};
