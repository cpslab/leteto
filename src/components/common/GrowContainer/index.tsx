import { Grid as MuiGrid } from '@material-ui/core';
import React, { ComponentProps } from 'react';
import styled from 'styled-components/macro';

type GrowContainerProps = ComponentProps<typeof MuiGrid> & {
  isflex: 'true' | 'false';
  children: React.ReactNode;
};

const GrowGrid = styled(MuiGrid)<{ isflex?: 'true' | 'false' }>`
  flex-grow: ${(props) => (props.isflex === 'true' ? 1 : 0)};
`;

export const GrowContainer = (props: GrowContainerProps): JSX.Element => {
  return <GrowGrid {...props}>{props.children}</GrowGrid>;
};
