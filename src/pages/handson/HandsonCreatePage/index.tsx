import React from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import { createHandson } from '../../../services';
import { CreateHandsonRequest } from '../../../services/service-types';
import { HandsonFormLayout } from '../../../layouts/handson/HandsonFormLayout';

export const HandsonCreatePage = (): JSX.Element => {
  const auth = useAuth();
  const onAddHandson = async (
    data: Omit<CreateHandsonRequest, 'owner' | 'is_public'>
  ) => {
    try {
      if (auth.currentUser?.username) {
        await createHandson({
          ...data,
          owner: {
            username: auth.currentUser.username,
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
      pageTitleText="新規作成"
      submitButtonText="保存"
      handleHandsonFormSubmit={(v) => onAddHandson(v)}
    ></HandsonFormLayout>
  );
};
