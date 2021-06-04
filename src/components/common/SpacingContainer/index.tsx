import { Grid as MuiGrid } from '@material-ui/core';
import React, { ComponentProps } from 'react';
import styled from 'styled-components/macro';

const SpacingGrid = styled(MuiGrid)<{ flex?: boolean }>`
  flex-grow: ${(props) => (props.flex ? 1 : 0)};
`;

export const SpacingContainer: React.FC<
  ComponentProps<typeof MuiGrid> & { flex?: boolean }
> = (props) => {
  return <SpacingGrid {...props}>{props.children}</SpacingGrid>;
};
