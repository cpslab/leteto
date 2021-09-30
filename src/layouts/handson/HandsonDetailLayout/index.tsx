import {
  Button,
  Grid,
  Grid as MuiGrid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Edit as HandsonEditIcon,
  Delete as HandsonDeleteIcon,
} from '@material-ui/icons';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AppBar } from '../../../components/common/AppBar';
import { AppBase } from '../../../components/common/AppBase';
import { AppMain } from '../../../components/common/AppMain';
import { HandsonDetailContent } from '../../../components/handson/HandsonDetailContent';
import { HandsonDetailDescription } from '../../../components/handson/HandsonDetailDescription';
import { HandsonDetailInfo } from '../../../components/handson/HandsonDetailInfo';
import { HandsonDetailRequirement } from '../../../components/handson/HandsonDetailRequirement';
import { HandsonDetail } from '../../../entity';
import { format, isFuture, isPast } from 'date-fns';
import { useAuth } from '../../../auth/AuthProvider';

export type HandsonDetailLayoutProps = {
  handson: HandsonDetail;
  joinHandsonMember: () => void;
  leaveHandsonMember: () => void;
  completeHandsonContentMember: (contentId: number) => void;
  revertHandsonContentMember: (id: number, contentId: number) => void;
  deleteHandson: () => void;
};

export type HandsonDetailLayoutComponentProps = {
  handson: HandsonDetail;
  currentUserId: number;
  joinHandsonMember: () => void;
  leaveHandsonMember: () => void;
  completeHandsonContentMember: (contentId: number) => void;
  revertHandsonContentMember: (id: number, contentId: number) => void;
  deleteHandson: () => void;
};

const HeroGrid = styled(MuiGrid)`
  height: calc(100vh - 56px);
  padding: ${(props) => props.theme.spacing(6)}px
    ${(props) => props.theme.spacing(12)}px;
  background-color: ${(props) => props.theme.palette.secondary.main};
`;

const ContentGrid = styled(MuiGrid)`
  padding: ${(props) => props.theme.spacing(5)}px
    ${(props) => props.theme.spacing(10)}px;
`;

export const HandsonDetailLayoutComponent = (
  props: HandsonDetailLayoutComponentProps
): JSX.Element => {
  const {
    handson,
    currentUserId,
    joinHandsonMember,
    leaveHandsonMember,
    completeHandsonContentMember,
    revertHandsonContentMember,
    deleteHandson,
  } = props;
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [isMember, setIsMember] = React.useState(false);
  const [isOwner, setIsOwner] = React.useState(false);
  const [isHoldHandson, setIsHoldHandson] = React.useState(false);
  const [canJoinHandson, setCanJoinHandson] = React.useState(false);
  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        history.push('/handsons/' + handson.id + '/description');
        break;

      case 1:
        history.push('/handsons/' + handson.id + '/info');
        break;

      case 2:
        history.push('/handsons/' + handson.id + '/content');
        break;

      case 3:
        history.push('/handsons/' + handson.id + '/requirement');
        break;

      default:
        history.push('/handsons/' + handson.id + '/description');
        break;
    }
  };

  const onJoinHandsonMember = () => {
    joinHandsonMember();
  };
  const onLeaveHandsonMember = () => {
    leaveHandsonMember();
  };
  const onDeleteHandson = () => {
    deleteHandson();
  };

  React.useEffect(() => {
    const member = (): boolean => {
      return handson.members.some(
        (joinMember) => joinMember.member.id === currentUserId
      );
    };
    const owner = (): boolean => {
      return handson.owner.id === currentUserId;
    };
    const holdHandson = (): boolean => {
      return (
        isPast(new Date(handson.start_at)) && isFuture(new Date(handson.end_at))
      );
    };
    const joinHandson = (): boolean => {
      const isFutureOrHold =
        isFuture(new Date(handson.start_at)) || isHoldHandson;
      return !owner() && isFutureOrHold;
    };
    setIsMember(member());
    setIsOwner(owner());
    setIsHoldHandson(holdHandson());
    setCanJoinHandson(joinHandson());
  }, [handson, currentUserId]);

  React.useEffect(() => {
    history.push('/handsons/' + handson.id + '/description');
  }, []);

  return (
    <AppBase>
      <AppBar
        left={
          <>
            <IconButton onClick={() => history.push('/handsons')}>
              <ArrowBackIosIcon />
            </IconButton>
          </>
        }
        right={
          <>
            {isOwner && (
              <>
                <IconButton
                  onClick={() =>
                    history.push('/handsons/' + handson.id + '/edit')
                  }
                >
                  <HandsonEditIcon></HandsonEditIcon>
                </IconButton>
                <IconButton onClick={() => onDeleteHandson()}>
                  <HandsonDeleteIcon></HandsonDeleteIcon>
                </IconButton>
              </>
            )}
          </>
        }
      ></AppBar>

      <AppMain bgcolor="primary">
        <HeroGrid container justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              {handson.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {handson.headline}
            </Typography>
            <Typography variant="caption" display="block">
              {handson.owner.username}
            </Typography>
            <Typography variant="caption" display="block">
              {format(new Date(handson.start_at), 'yyyy/MM/dd hh:mm')} ~{' '}
              {format(new Date(handson.end_at), 'yyyy/MM/dd hh:mm')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              {canJoinHandson && (
                <>
                  {!isMember ? (
                    <Button
                      variant="contained"
                      onClick={() => onJoinHandsonMember()}
                    >
                      参加する
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => onLeaveHandsonMember()}
                    >
                      取り消し
                    </Button>
                  )}
                </>
              )}
              {isHoldHandson && <Typography>開催中</Typography>}
              {isPast(new Date(handson.end_at)) && (
                <Typography>終了</Typography>
              )}
            </Grid>
          </Grid>
        </HeroGrid>
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="講義詳細" />
            <Tab label="講義情報" />
            <Tab label="講義内容" />
            <Tab label="要件" />
          </Tabs>
        </Paper>
        <ContentGrid>
          <Route exact path="/handsons/:id/description">
            <HandsonDetailDescription
              detail={handson.detail}
            ></HandsonDetailDescription>
          </Route>
          <Route exact path="/handsons/:id/info">
            <HandsonDetailInfo
              document_url={handson.document_url}
              meeting_url={handson.meeting_url}
              movie_url={handson.meeting_url}
              isMember={isMember}
              isOwner={isOwner}
            ></HandsonDetailInfo>
          </Route>
          <Route exact path="/handsons/:id/content">
            <HandsonDetailContent
              contents={handson.contents}
              isMember={isMember}
              isOwner={isOwner}
              currentUserId={currentUserId}
              completeHandsonContentMember={(contentId: number) =>
                completeHandsonContentMember(contentId)
              }
              revertHandsonContentMember={(id: number, contentId: number) =>
                revertHandsonContentMember(id, contentId)
              }
            ></HandsonDetailContent>
          </Route>
          <Route exact path="/handsons/:id/requirement">
            <HandsonDetailRequirement
              require={handson.require}
            ></HandsonDetailRequirement>
          </Route>
        </ContentGrid>
      </AppMain>
    </AppBase>
  );
};

export const HandsonDetailLayout = (
  props: HandsonDetailLayoutProps
): JSX.Element => {
  const {
    handson,
    joinHandsonMember,
    leaveHandsonMember,
    completeHandsonContentMember,
    revertHandsonContentMember,
    deleteHandson,
  } = props;
  const auth = useAuth();

  return (
    <>
      {auth.currentUser?.pk && (
        <HandsonDetailLayoutComponent
          handson={handson}
          currentUserId={auth.currentUser?.pk}
          joinHandsonMember={joinHandsonMember}
          leaveHandsonMember={leaveHandsonMember}
          completeHandsonContentMember={completeHandsonContentMember}
          revertHandsonContentMember={revertHandsonContentMember}
          deleteHandson={deleteHandson}
        ></HandsonDetailLayoutComponent>
      )}
    </>
  );
};
