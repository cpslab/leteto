import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MemoryRouter as Router } from 'react-router-dom';
import {
  ThemeProvider as MaterialThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AuthProvider } from '../src/auth/AuthProvider';
import { createTheme } from '../src/theme';

const theme = createTheme();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
};

const withThemeProvider = (Story, context) => {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Router>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Story {...context} />
          </Router>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};
export const decorators = [withThemeProvider];
