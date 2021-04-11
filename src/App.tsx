import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import createTheam from './thema';
import { AuthProvider } from './auth/AuthProvider';
import { AuthenticatedRoute } from './auth/AuthenticatedRoute';
import { PrivateRoute } from './auth/PrivateRoute';
import { HandsonListPage } from './pages/handson/HandsonListPage';
import { SignInPage } from './pages/SignInPage';

const theme = createTheam();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
