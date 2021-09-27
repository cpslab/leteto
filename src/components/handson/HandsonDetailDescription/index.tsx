import {
  Grid,
  Paper as MuiPaper,
  Typography as MuiTypography,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';

export type HandsonDetailDescriptionProps = {
  detail: string;
};

const UnderlineTypography = styled(MuiTypography)`
  border-bottom: solid 4px white;
  position: relative;

  ::after {
    position: absolute;
    content: ' ';
    display: block;
    border-bottom: solid 4px #fdd000;
    bottom: -4px;
    width: 40%;
  }
`;

const DescriptionPaper = styled(MuiPaper)`
  padding: ${(props) => props.theme.spacing(3)}px;
`;

export const HandsonDetailDescription = (
  props: HandsonDetailDescriptionProps
): JSX.Element => {
  const { detail } = props;
  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <UnderlineTypography variant="h5" display="inline">
          講義詳細
        </UnderlineTypography>
      </Grid>
      <Grid item>
        <DescriptionPaper>{detail}</DescriptionPaper>
      </Grid>
    </Grid>
  );
};
