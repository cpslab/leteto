import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { LandingPage } from '../pages/LandingPage';
import { HandsonListPage } from '../pages/handson/HandsonListPage';

export const AuthenticatedRoute = (props: RouteProps): JSX.Element => {
  const auth = useAuth();
  const Component = auth.currentUser ? HandsonListPage : LandingPage;

  return <Route {...props} component={Component}></Route>;
};
