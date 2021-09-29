import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../../../auth/AuthProvider';
import {
  updateHandson,
  getHandson,
  updateHandsonContent,
  deleteHandsonContent,
  createHandsonContent,
} from '../../../services';
import { HandsonEditPageParams } from '../../../routes/params-types';
import { HandsonContentWrite, HandsonDetail } from '../../../entity';
import {
  HandsonFormLayout,
  HandsonFormProps,
} from '../../../layouts/handson/HandsonFormLayout';

type HandsonContentDiff = {
  deleteContents: HandsonContentWrite[];
  updateContents: HandsonContentWrite[];
  createContents: HandsonContentWrite[];
};

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
        const contentDiff = getHandsonContentDiff(
          handson.contents,
          data.contents
        );
        contentDiff.updateContents.forEach(async (updateContent) => {
          await updateHandsonContent({
            id: updateContent.id,
            handson: handson.id,
            content: updateContent.content,
          });
        });
        contentDiff.deleteContents.forEach(async (deleteContent) => {
          await deleteHandsonContent({
            id: deleteContent.id,
            handson: handson.id,
          });
        });
        contentDiff.createContents.forEach(async (createContent) => {
          await createHandsonContent({
            handson: handson.id,
            content: createContent.content,
          });
        });
        history.push('/handsons/' + handson.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getHandsonContentDiff = (
    origin: HandsonContentWrite[],
    update: HandsonContentWrite[]
  ): HandsonContentDiff => {
    const same = update.filter((updateItem) =>
      origin.find((originItem) => updateItem.id === originItem.id)
    );
    const sameIds = same.map((sameItem) => sameItem.id);

    return {
      deleteContents: origin.filter((item) => !sameIds.includes(item.id)),
      updateContents: same,
      createContents: update.filter((item) => !sameIds.includes(item.id)),
    };
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
