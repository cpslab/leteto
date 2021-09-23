import { Grid as MuiGrid } from '@material-ui/core';
import React, { ComponentProps } from 'react';
import styled from 'styled-components/macro';

type GrowContainerProps = ComponentProps<typeof MuiGrid> & {
  flex: boolean;
  children: React.ReactNode;
};

const GrowGrid = styled(MuiGrid)<{ flex?: boolean }>`
  flex-grow: ${(props) => (props.flex ? 1 : 0)};
`;

export const GrowContainer = (props: GrowContainerProps): JSX.Element => {
  return <GrowGrid {...props}>{props.children}</GrowGrid>;
};
