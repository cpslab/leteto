import { Grid, Grid as MuiGrid, GridSpacing } from '@material-ui/core';
import React, { ComponentProps } from 'react';
import styled from 'styled-components/macro';

type SpacingContainerProps = ComponentProps<typeof MuiGrid> & {
  spacing: GridSpacing;
  children: React.ReactNode;
};

const SpacingParent = styled.div<{ cancelSpacing?: GridSpacing }>`
  padding: ${(props) =>
    props.theme.spacing(props.cancelSpacing ? props.cancelSpacing : 0) / 2}px;
`;

export const SpacingContainer = (props: SpacingContainerProps): JSX.Element => {
  return (
    <SpacingParent cancelSpacing={props.spacing}>
      <Grid {...props}>{props.children}</Grid>
    </SpacingParent>
  );
};
