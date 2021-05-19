import React from 'react';
import { Grid as MuiGrid, Grid } from '@material-ui/core';
import styled from 'styled-components/macro';

const BackgroundGrid = styled(MuiGrid)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  min-height: calc(100vh - 56px);
  flex-grow: 1;
`;

export const AppBase: React.FC = (props) => {
  return (
    <BackgroundGrid container>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </BackgroundGrid>
  );
};
