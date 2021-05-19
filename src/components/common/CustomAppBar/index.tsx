import React from 'react';
import { AppBar, Grid, Grid as MuiGrid, Toolbar } from '@material-ui/core';
import styled from 'styled-components/macro';

const LeftGrid = styled(MuiGrid)`
  flex-grow: 1;
`;

export const CustomAppBar: React.FC<{
  left: JSX.Element;
  right: JSX.Element;
}> = ({ left, right }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <LeftGrid>{left}</LeftGrid>
        <Grid container justify="flex-end">
          {right}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
