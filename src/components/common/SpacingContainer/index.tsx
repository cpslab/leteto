import { Grid as MuiGrid } from '@material-ui/core';
import React, { ComponentProps } from 'react';
import styled from 'styled-components/macro';

type SpacingContainerProps = ComponentProps<typeof MuiGrid> & {
  flex?: boolean;
  children: React.ReactNode;
};

const SpacingGrid = styled(MuiGrid)<{ flex?: boolean }>`
  flex-grow: ${(props) => (props.flex ? 1 : 0)};
`;

export const SpacingContainer = (props: SpacingContainerProps): JSX.Element => {
  return <SpacingGrid {...props}>{props.children}</SpacingGrid>;
};
