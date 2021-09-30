import React from 'react';
import { Typography } from '@material-ui/core';

export type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  return (
    <Typography variant="caption" display="block" color="error">
      {props.message}
    </Typography>
  );
};
