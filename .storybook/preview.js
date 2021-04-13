import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MaterialThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '../src/theme';

const theme = createTheme();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const withThemeProvider = (Story, context) => {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Story {...context} />
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};
export const decorators = [withThemeProvider];
