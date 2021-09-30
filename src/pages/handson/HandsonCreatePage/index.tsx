import React from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import { createHandson, createHandsonContent } from '../../../services';
import {
  HandsonFormLayout,
  HandsonFormProps,
} from '../../../layouts/handson/HandsonFormLayout';
import { useHistory } from 'react-router';

export const HandsonCreatePage = (): JSX.Element => {
  const history = useHistory();
  const auth = useAuth();
  const onAddHandson = async (data: HandsonFormProps) => {
    try {
      if (auth.currentUser) {
        const res = await createHandson({
          ...data,
          is_public: true,
        });
        data.contents.forEach(async (item) => {
          await createHandsonContent({
            handson: res.id,
            content: item.content,
          });
        });
        history.push('/handsons/' + res.id);
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
