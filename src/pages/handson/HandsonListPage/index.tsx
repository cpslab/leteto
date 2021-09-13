import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../../auth/AuthProvider';
import { useHistory } from 'react-router-dom';
import { HandsonListLayout } from '../../../layouts/handson/HandsonListLayout';
import { HandsonListItem } from '../../../services/service-types';
import { getHandsons } from '../../../services';

export const HandsonListPage = (): JSX.Element => {
  const [handsons, setHandsons] = React.useState<HandsonListItem[]>([]);
  const auth = useAuth();

  React.useEffect(() => {
    (async function () {
      if (auth.currentUser?.username) {
        const data = await getHandsons();
        console.log(data);
        setHandsons(data);
      }
    })();
  }, []);
  return <HandsonListLayout handsons={handsons}></HandsonListLayout>;
};
