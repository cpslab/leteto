import React from 'react';
import { Paper as MuiPaper, PropTypes } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import styled from 'styled-components/macro';

type AppMainProps = {
  bgcolor?: PropTypes.Color;
  children: React.ReactNode;
};

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)<Pick<AppMainProps, 'bgcolor'>>`
  flex: 1;
  background-color: ${(props) => {
    switch (props.bgcolor) {
      case 'primary':
        return props.theme.palette.primary.main;

      case 'secondary':
        return props.theme.palette.secondary.main;

      case 'default':
        return props.theme.palette.background.default;

      default:
        return props.theme.palette.secondary.main;
    }
  }};
`;

export const AppMain = (props: AppMainProps): JSX.Element => {
  return <MainContent bgcolor={props.bgcolor}>{props.children}</MainContent>;
};
