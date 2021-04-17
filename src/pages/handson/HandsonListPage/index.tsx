import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../../auth/AuthProvider';
import { useHistory } from 'react-router-dom';

export const HandsonListPage: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleSignOut = async () => {
    await auth.signout(history);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};
