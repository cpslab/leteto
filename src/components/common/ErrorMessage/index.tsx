import React from 'react';
import { Typography } from '@material-ui/core';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <Typography variant="caption" display="block" color="error">
      {props.message}
    </Typography>
  );
};
