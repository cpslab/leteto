import React from 'react';
import { CssBaseline } from '@material-ui/core';
import styled from 'styled-components/macro';

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AppBase: React.FC = (props) => {
  return (
    <Root>
      <CssBaseline />
      <AppContent>{props.children}</AppContent>
    </Root>
  );
};
