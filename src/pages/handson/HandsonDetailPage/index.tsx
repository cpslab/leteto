import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../../../auth/AuthProvider';
import { HandsonDetail } from '../../../entity';
import { HandsonDetailLayout } from '../../../layouts/handson/HandsonDetailLayout';
import { HandsonDetailPageParams } from '../../../routes/params-types';
import {
  addContentPassMember,
  addHandsonMember,
  deleteContentPassMember,
  deleteHandson,
  deleteHandsonMember,
  getHandson,
} from '../../../services';

export const HandsonDetailPage = (): JSX.Element => {
  const { id } = useParams<HandsonDetailPageParams>();
  const [handson, setHandson] = useState<HandsonDetail>();
  const [loading, setLoading] = useState<number>(0);
  const history = useHistory();
  const auth = useAuth();

  const onJoinHandsonMember = async () => {
    if (handson) {
      await addHandsonMember({
        handson: handson?.id,
      });
      setLoading(loading + 1);
    }
  };

  const onLeaveHandsonMember = async () => {
    if (handson && auth.currentUser?.pk) {
      const handsonMemberId = handson.members.find(
        (joinMember) => joinMember.member.id === auth.currentUser?.pk
      )?.id;
      if (handsonMemberId) {
        await deleteHandsonMember({
          id: handsonMemberId,
          handson: handson.id,
        });
        setLoading(loading + 1);
      }
    }
  };

  const onCompleteHandsonContentMember = async (content: number) => {
    if (handson) {
      await addContentPassMember({ content, handson: handson.id });
      setLoading(loading + 1);
    }
  };

  const onRevertHandsonContentMember = async (id: number, content: number) => {
    if (handson) {
      await deleteContentPassMember({ id, content, handson: handson.id });
      setLoading(loading + 1);
    }
  };

  const onDeleteHandson = async () => {
    if (handson) {
      await deleteHandson({ id: handson.id });
      history.push('/handsons/');
      setLoading(loading + 1);
    }
  };

  React.useEffect(() => {
    (async function () {
      if (auth.currentUser?.username) {
        const data = await getHandson({ id: Number(id) });
        setHandson(data);
      }
    })();
  }, [loading]);

  return (
    <>
      {handson && (
        <HandsonDetailLayout
          handson={handson}
          joinHandsonMember={() => onJoinHandsonMember()}
          leaveHandsonMember={() => onLeaveHandsonMember()}
          completeHandsonContentMember={(contentId: number) =>
            onCompleteHandsonContentMember(contentId)
          }
          revertHandsonContentMember={(id: number, contentId: number) =>
            onRevertHandsonContentMember(id, contentId)
          }
          deleteHandson={() => onDeleteHandson()}
        ></HandsonDetailLayout>
      )}
    </>
  );
};
