import React from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import { HandsonListLayout } from '../../../layouts/handson/HandsonListLayout';
import { Handson } from '../../../entity';
import { getHandsons } from '../../../services';

export const HandsonListPage = (): JSX.Element => {
  const [handsons, setHandsons] = React.useState<Handson[]>([]);
  const auth = useAuth();

  React.useEffect(() => {
    (async function () {
      if (auth.currentUser?.username) {
        const data = await getHandsons();
        setHandsons(data);
      }
    })();
  }, []);

  return <HandsonListLayout handsons={handsons}></HandsonListLayout>;
};
