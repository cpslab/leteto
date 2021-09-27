import {
  Avatar as MuiAvatar,
  Button,
  Divider,
  Grid,
  Grid as MuiGrid,
  Paper,
  Typography as MuiTypography,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';
import { HandsonContent, PassedContentMember } from '../../../entity';
import { GrowContainer } from '../../common/GrowContainer';
import { SpacingContainer } from '../../common/SpacingContainer';

export type HandsonDetailContentProps = {
  contents: HandsonContent[];
  isMember: boolean;
  isOwner: boolean;
  currentUserId: number;
  completeHandsonContentMember: (contentId: number) => void;
  revertHandsonContentMember: (id: number, contentId: number) => void;
};

const UnderlineTypography = styled(MuiTypography)`
  border-bottom: solid 4px white;
  position: relative;

  ::after {
    position: absolute;
    content: ' ';
    display: block;
    border-bottom: solid 4px #fdd000;
    bottom: -4px;
    width: 40%;
  }
`;

const ContentItemContainer = styled(MuiGrid)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const CompletedButtonContainer = styled(MuiGrid)`
  height: 100%;
`;

const SmallAvatar = styled(MuiAvatar)`
  height: ${(props) => props.theme.spacing(4)}px;
  width: ${(props) => props.theme.spacing(4)}px;
`;

export const HandsonDetailContent = (
  props: HandsonDetailContentProps
): JSX.Element => {
  const {
    contents,
    isMember,
    isOwner,
    currentUserId,
    completeHandsonContentMember,
    revertHandsonContentMember,
  } = props;

  const onCompleteHandsonContentMember = (contentId: number) => {
    completeHandsonContentMember(contentId);
  };

  const onRevertHandsonContentMember = (
    passed_members: PassedContentMember[]
  ) => {
    const member = passed_members.find((passed_member) => {
      passed_member.member.id === currentUserId;
    });
    if (member) {
      revertHandsonContentMember(member.id, member.content);
    }
  };

  const isCompleted = (passed_members: PassedContentMember[]): boolean => {
    return passed_members.some((passed_member) => {
      passed_member.member.id === currentUserId;
    });
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <UnderlineTypography variant="h5" display="inline">
          講義内容
        </UnderlineTypography>
      </Grid>
      <Grid item>
        {isMember && (
          <Paper>
            {contents.map((content) => {
              return (
                <>
                  <ContentItemContainer>
                    <Grid container>
                      <GrowContainer item isflex="true">
                        <SpacingContainer spacing={1} container>
                          <Grid item>{content.content}</Grid>
                          <Grid container item>
                            {content.passed_members.map((passed_member) => {
                              <SmallAvatar>
                                {passed_member.member.username}
                              </SmallAvatar>;
                            })}
                          </Grid>
                        </SpacingContainer>
                      </GrowContainer>
                      <Grid item>
                        <CompletedButtonContainer
                          container
                          justify="center"
                          alignItems="center"
                        >
                          {!isOwner && (
                            <>
                              {!isCompleted(content.passed_members) && (
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    onCompleteHandsonContentMember(content.id)
                                  }
                                >
                                  完了
                                </Button>
                              )}
                              {isCompleted(content.passed_members) && (
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    onRevertHandsonContentMember(
                                      content.passed_members
                                    )
                                  }
                                >
                                  戻す
                                </Button>
                              )}
                            </>
                          )}
                        </CompletedButtonContainer>
                      </Grid>
                    </Grid>
                  </ContentItemContainer>
                  <Divider></Divider>
                </>
              );
            })}
          </Paper>
        )}
        {!isMember && (
          <Paper>
            <ContentItemContainer
              container
              justify="center"
              alignItems="center"
            >
              講義内容を閲覧するには本イベントへの参加をお願いします。
            </ContentItemContainer>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
