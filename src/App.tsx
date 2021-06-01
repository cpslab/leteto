import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  ThemeProvider as MaterialThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import createTheme from './theme';
import { AuthProvider } from './auth/AuthProvider';
import { AuthenticatedRoute } from './auth/AuthenticatedRoute';
import { PrivateRoute } from './auth/PrivateRoute';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { HandsonListPage } from './pages/handson/HandsonListPage';
import { HandsonCreatePage } from './pages/handson/HandsonCreatePage';
import { HandsonEditPage } from './pages/handson/HandsonEditPage';

const theme = createTheme();

function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            <Router>
              <AuthenticatedRoute exact path="/"></AuthenticatedRoute>
              <Route exact path="/signin" component={SignInPage}></Route>
              <Route exact path="/signup" component={SignUpPage}></Route>
              <PrivateRoute
                exact
                path="/handsons"
                component={HandsonListPage}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/handsons/create"
                component={HandsonCreatePage}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/handsons/:id/edit"
                component={HandsonEditPage}
              ></PrivateRoute>
            </Router>
          </AuthProvider>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
}

export default App;
