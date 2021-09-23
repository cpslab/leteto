import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../../../auth/AuthProvider';
import {
  updateHandson,
  getHandson,
  updateHandsonContent,
} from '../../../services';
import { HandsonEditPageParams } from '../../../routes/params-types';
import { HandsonDetail } from '../../../entity';
import {
  HandsonFormLayout,
  HandsonFormProps,
} from '../../../layouts/handson/HandsonFormLayout';

export const HandsonEditPage = (): JSX.Element => {
  const { id } = useParams<HandsonEditPageParams>();
  const history = useHistory();
  const auth = useAuth();
  const [handson, setHandson] = React.useState<HandsonDetail>();

  React.useEffect(() => {
    (async function () {
      if (auth.currentUser?.username) {
        const data = await getHandson({
          id: Number(id),
        });
        setHandson(data);
      }
    })();
  }, []);

  const onUpdateHandson = async (data: HandsonFormProps) => {
    try {
      if (handson?.id && auth.currentUser) {
        await updateHandson({
          ...data,
          id: handson.id,
          is_public: true,
        });
        data.contents.forEach(async (updateContent) => {
          // handson.contentにもdata.contentsにも存在している時はupdate
          // handson.contentに存在していてdata.contentsにないものはdelete
          // handson.contentに存在していなくてdata.contentsにあるものはcreate
          await updateHandsonContent({
            id: updateContent.id,
            handson: handson.id,
            content: updateContent.content,
          });
        });
        history.push('/handsons/' + handson.id);
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
      contents={handson?.contents}
      handleHandsonFormSubmit={(v) => onUpdateHandson(v)}
    ></HandsonFormLayout>
  );
};
