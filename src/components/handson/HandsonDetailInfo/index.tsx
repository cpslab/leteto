import {
  Grid,
  Grid as MuiGrid,
  Paper,
  Typography as MuiTypography,
  Divider,
  Typography,
  Link,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';

export type HandsonDetailInfoProps = {
  document_url: string;
  meeting_url: string;
  movie_url?: string;
  isMember: boolean;
  isOwner: boolean;
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

const InfoContainer = styled(MuiGrid)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

export const HandsonDetailInfo = (
  props: HandsonDetailInfoProps
): JSX.Element => {
  const { document_url, meeting_url, movie_url, isMember, isOwner } = props;
  const [
    hasBrowsingDetailAuthority,
    setHasBrowsingDetailAuthority,
  ] = React.useState<boolean>(false);

  React.useEffect(() => {
    const browsingDetailAuthority = (): boolean => {
      return isMember || isOwner;
    };
    setHasBrowsingDetailAuthority(browsingDetailAuthority());
  }, [isMember, isOwner]);

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <UnderlineTypography variant="h5" display="inline">
          講義情報
        </UnderlineTypography>
      </Grid>
      <Grid item>
        {hasBrowsingDetailAuthority ? (
          <Paper>
            <InfoContainer>
              <Typography variant="subtitle1">講義資料配布先</Typography>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Link
                  href={document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="initial"
                >
                  {document_url}
                </Link>
              </Grid>
            </InfoContainer>
            <Divider></Divider>
            <InfoContainer>
              <Typography variant="subtitle1">会議先URL</Typography>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Link
                  href={meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="initial"
                >
                  {meeting_url}
                </Link>
              </Grid>
            </InfoContainer>
            {movie_url && (
              <>
                <Divider></Divider>
                <InfoContainer>
                  <Typography variant="subtitle1">動画URL</Typography>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Link
                      href={movie_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="initial"
                    >
                      {movie_url}
                    </Link>
                  </Grid>
                </InfoContainer>
              </>
            )}
          </Paper>
        ) : (
          <Paper>
            <InfoContainer container justify="center" alignItems="center">
              講義情報を閲覧するには本イベントへの参加をお願いします。
            </InfoContainer>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
