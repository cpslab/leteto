import React from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../auth/AuthProvider';
import { updateHandson, getHandson } from '../../../services';
import { HandsonEditPageParams } from '../../../routes/params-types';
import {
  UpdateHandsonRequest,
  HandsonDetailItem,
} from '../../../services/service-types';
import { HandsonFormLayout } from '../../../layouts/handson/HandsonFormLayout';

export const HandsonEditPage: React.FC = () => {
  const { id } = useParams<HandsonEditPageParams>();
  const auth = useAuth();
  const [handson, setHandson] = React.useState<HandsonDetailItem>();

  React.useEffect(() => {
    (async function () {
      if (auth.currentUser?.username) {
        const data = await getHandson({
          id: Number(id),
        });
        setHandson(data);
      }
    });
  }, []);

  const onUpdateHandson = async (
    data: Omit<UpdateHandsonRequest, 'id' | 'owner' | 'is_public'>
  ) => {
    try {
      if (handson?.id && auth.currentUser?.username) {
        await updateHandson({
          ...data,
          id: handson.id,
          owner: {
            id: auth.currentUser.pk,
            username: auth.currentUser?.username,
          },
          is_public: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HandsonFormLayout
      pageTitleText="編集"
      submitButtonText="更新"
      handson={handson}
      handleHandsonFormSubmit={(v) => onUpdateHandson(v)}
    ></HandsonFormLayout>
  );
};
