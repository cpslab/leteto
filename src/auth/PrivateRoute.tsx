import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { SignInPage } from '../pages/SignInPage';

export const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const auth = useAuth();
  const Component = auth.currentUser ? props.component : SignInPage;

  return <Route {...props} component={Component}></Route>;
};
