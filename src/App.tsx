import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  ThemeProvider as MaterialThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import createTheme from './theme';
import { AuthProvider } from './auth/AuthProvider';
import { AuthenticatedRoute } from './auth/AuthenticatedRoute';
import { PrivateRoute } from './auth/PrivateRoute';
import { HandsonListPage } from './pages/handson/HandsonListPage';
import { SignInPage } from './pages/SignInPage';

const theme = createTheme();

function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <AuthProvider>
            <Router>
              <AuthenticatedRoute exact path="/"></AuthenticatedRoute>
              <Route exact path="/signin" component={SignInPage}></Route>
              <PrivateRoute
                exact
                path="/handsons"
                component={HandsonListPage}
              ></PrivateRoute>
            </Router>
          </AuthProvider>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
}

export default App;
