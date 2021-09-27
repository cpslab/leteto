import React from 'react';
import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  AppBar,
  Tab,
  Tabs,
  Box,
  CardActionArea,
  IconButton,
} from '@material-ui/core';
import { Handson } from '../../../entity';
import { AppBar as CustomAppBar } from '../../../components/common/AppBar';
import { AppBase } from '../../../components/common/AppBase';
import { format } from 'date-fns';
import { Link, useHistory } from 'react-router-dom';
import {
  NoteAdd as HandsonAddIcon,
  ExitToApp as LogoutIcon,
} from '@material-ui/icons';
import { useAuth } from '../../../auth/AuthProvider';

export type HandsonListLayoutProps = {
  handsons: Handson[];
};

const CenterdTabsBase = styled.div`
  flex-grow: 0;
  padding-bottom: 5px;
`;

const HandsonCard = styled(Card)`
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 14;
`;

const TitleBox = styled(Box)`
  width: 100%;
  overflow: hidden;
  white-space: no-wrap;
`;

const TitleTypoGraphy = styled(Typography)`
  text-align: center;
  overflow: hidden;
  white-space: no-wrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;

const HandsonContents = styled(CardContent)`
  margin: 0;
  padding: 0;
`;

const DateTypoGraphy = styled(Typography)`
  padding-right: ${(props) => props.theme.spacing(1)}px;
  text-align: right;
`;

const HandsonTypeTabs = styled(Tabs)`
  background-color: white;
`;

type HandsonCardProps = {
  handson: Handson;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

type CenterdTabsProps = {
  handsons: Handson[];
  value: number;
};

const HandsonCardTemplete: React.FC<HandsonCardProps> = (props) => {
  const { handson } = props;
  return (
    <HandsonCard>
      <CardActionArea component={Link} to={'/handsons/' + handson.id}>
        <CardMedia
          component="img"
          alt={handson.title}
          height="140"
          image="/static/noimage.jpeg"
          title={handson.title}
        />
        <HandsonContents>
          <TitleBox component="div" whiteSpace="nowrap">
            <TitleTypoGraphy variant="h4">{handson.title}</TitleTypoGraphy>
          </TitleBox>
          <DateTypoGraphy variant="subtitle1">
            {format(new Date(handson.start_at), 'yyyy/MM/dd hh:mm')}
          </DateTypoGraphy>
        </HandsonContents>
      </CardActionArea>
    </HandsonCard>
  );
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container spacing={2}>
          {children}
        </Grid>
      )}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const CenteredTabs: React.FC<CenterdTabsProps> = (props) => {
  const { handsons } = props;
  const [value, setValue] = React.useState<string>('one');

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (
    <CenterdTabsBase>
      {/* <AppBar position="static">
        <HandsonTypeTabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          indicatorColor="secondary"
          centered
        >
          <Tab value="one" label="開催予定のハンズオン" {...a11yProps('one')} />
          <Tab value="two" label="開催中のハンズオン" {...a11yProps('two')} />
          <Tab
            value="three"
            label="過去開催されたハンズオン"
            {...a11yProps('three')}
          />
        </HandsonTypeTabs>
      </AppBar> */}
      <TabPanel value={value} index="one">
        {handsons.map((handsonItem) => {
          return (
            <Grid item xs={4} key={handsonItem.id}>
              <HandsonCardTemplete handson={handsonItem}></HandsonCardTemplete>
            </Grid>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index="two">
        {handsons.map((handsonItem) => {
          return (
            <Grid item xs={4} key={handsonItem.id}>
              <HandsonCardTemplete handson={handsonItem}></HandsonCardTemplete>
            </Grid>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index="three">
        {handsons.map((handsonItem) => {
          return (
            <Grid item xs={4} key={handsonItem.id}>
              <HandsonCardTemplete handson={handsonItem}></HandsonCardTemplete>
            </Grid>
          );
        })}
      </TabPanel>
    </CenterdTabsBase>
  );
};

export const HandsonListLayout: React.FC<HandsonListLayoutProps> = (props) => {
  const history = useHistory();
  const auth = useAuth();
  return (
    <AppBase>
      <CustomAppBar
        left={
          <img
            src="/static/Leteto.svg"
            alt="Leteto"
            title="Leteto レテト"
            width="94px"
            height="100%"
          ></img>
        }
        right={
          <>
            <IconButton onClick={() => history.push('/handsons/create')}>
              <HandsonAddIcon></HandsonAddIcon>
            </IconButton>
            <IconButton onClick={() => auth.signout(history)}>
              <LogoutIcon></LogoutIcon>
            </IconButton>
          </>
        }
      ></CustomAppBar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CenteredTabs handsons={props.handsons} value={1} />
        </Grid>
      </Grid>
    </AppBase>
  );
};
