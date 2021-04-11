import React, { useEffect, useState, createContext, useContext } from 'react';
import * as API from '../services';
import { User } from '../services/service-types';
import * as H from 'history';

type authContextType = {
  currentUser: User | null | undefined;
  signin: (
    username: string,
    email: string,
    password: string,
    history: H.History
  ) => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
    repassword: string,
    history: H.History
  ) => Promise<void>;
  signout: (history: H.History) => Promise<void>;
};

function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const useAuthContext = (): authContextType => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  const signin = async (
    username: string,
    email: string,
    password: string,
    history: H.History
  ) => {
    const user = await API.signin({ username, email, password });
    setCurrentUser(user);
    history.push('/handsons');
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
    repassword: string,
    history: H.History
  ) => {
    const user = await API.signup({ username, email, password, repassword });
    setCurrentUser(user);
    history.push('/handsons');
  };

  const signout = async (history: H.History) => {
    if (await API.signout()) {
      setCurrentUser(undefined);
      history.push('/');
    }
  };

  useEffect(() => {
    (async function () {
      const user = await API.getCurrentUser();
      setCurrentUser(user);
    })();
  }, []);

  return { currentUser, signin, signup, signout };
};

export const [useAuth, SetAuthProvider] = createCtx<authContextType>();

export const AuthProvider: React.FC = (props) => {
  const auth = useAuthContext();
  return <SetAuthProvider value={auth}>{props.children}</SetAuthProvider>;
};
