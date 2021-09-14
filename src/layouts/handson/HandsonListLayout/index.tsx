import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppBar, Tab, Tabs, Button, Box } from '@material-ui/core';
import { HandsonListItem } from '../../../services/service-types';
import { AppBar as CustomAppBar } from '../../../components/common/AppBar';
import { AppBase } from '../../../components/common/AppBase';
import { parse } from 'date-fns';

export type HandsonListLayoutProps = {
  handsons: HandsonListItem[];
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
  text-align: right;
`;

const HandsonTypeTabs = styled(Tabs)`
  background-color: white;
`;

type HandsonCardProps = {
  handson: HandsonListItem;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

type CenterdTabsProps = {
  handsons: HandsonListItem[];
  value: number;
};

const HandsonCardTemplete: React.FC<HandsonCardProps> = (props) => {
  const { handson } = props;
  const start_time: Date = parse(
    handson.start_at,
    "yyyy-MM-dd'T'HH:mm",
    new Date()
  );
  const now_minutes: string =
    start_time.getMinutes().toString() === '0'
      ? '00'
      : start_time.getMinutes().toString();
  const now_time = String(
    start_time.getMonth().toString() +
      '/' +
      start_time.getDate().toString() +
      ' ' +
      start_time.getHours().toString() +
      ':' +
      now_minutes
  );
  return (
    <HandsonCard>
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
        <DateTypoGraphy variant="h6">{now_time}</DateTypoGraphy>
      </HandsonContents>
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
      <AppBar position="static">
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
      </AppBar>
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
            <Button color="inherit">マイページ</Button>
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
