import React from 'react';
import {
  AppBar as MuiAppBar,
  Grid,
  Grid as MuiGrid,
  Toolbar,
  PropTypes,
} from '@material-ui/core';
import styled from 'styled-components/macro';

export type AppBarProps = {
  left: JSX.Element;
  right: JSX.Element;
  bgcolor?: PropTypes.Color | 'transparent';
};

const AppBarComponent = styled(MuiAppBar)``;

const LeftGrid = styled(MuiGrid)`
  flex-grow: 1;
`;

export const AppBar = ({ left, right, bgcolor }: AppBarProps): JSX.Element => {
  return (
    <React.Fragment>
      <AppBarComponent position="static" color={bgcolor}>
        <Toolbar>
          <LeftGrid>{left}</LeftGrid>
          <Grid container justify="flex-end">
            {right}
          </Grid>
        </Toolbar>
      </AppBarComponent>
    </React.Fragment>
  );
};
