import React from 'react';
import {
  AppBar,
  Button,
  Grid,
  Grid as MuiGrid,
  Toolbar,
} from '@material-ui/core';
import styled from 'styled-components/macro';

const LeftGrid = styled(MuiGrid)`
  flex-grow: 1;
`;

const BackgroundGrid = styled(MuiGrid)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  width: 100%;
  height: 100vh;
`;

export const LandingPage: React.FC = () => {
  return (
    <Grid>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <LeftGrid>
            <img
              src="/static/Leteto.svg"
              alt="Leteto"
              title="Leteto レテト"
              width="94px"
              height="100%"
            ></img>
          </LeftGrid>
          <Grid container justify="flex-end">
            <Button color="inherit">サインイン</Button>
            <Button color="inherit">サインアップ</Button>
          </Grid>
        </Toolbar>
      </AppBar>

      <BackgroundGrid></BackgroundGrid>
    </Grid>
  );
};
