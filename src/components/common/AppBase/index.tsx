import React from 'react';
import { Grid as MuiGrid } from '@material-ui/core';
import styled from 'styled-components/macro';

const BackgroundGrid = styled(MuiGrid)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  width: 100%;
  height: calc(100vh - 56px);
`;

export const AppBase: React.FC = (props) => {
  return <BackgroundGrid>{props.children}</BackgroundGrid>;
};
