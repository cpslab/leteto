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
import { CustomAppBar } from '../../../components/common/CustomAppBar';
import { AppBase } from '../../../components/common/AppBase';

export type HandsonListLayoutProps = {
  handsons: HandsonListItem[];
};

// APPBASE 土台
const useStyles1 = makeStyles({
  root: {
    flexGrow: 0,
    paddingBottom: '5px',
  },
});

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

type HandsonCardProps = {
  handson: HandsonListItem;
};

const HandsonTypeTabs = styled(Tabs)`
  background-color: white;
`;

// HandsonCardTemplete
const HandsonCardTemplete: React.FC<HandsonCardProps> = (props) => {
  const { handson } = props;
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
        <DateTypoGraphy variant="h6">{handson.start_at}</DateTypoGraphy>
      </HandsonContents>
    </HandsonCard>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

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

type CenterdTabsProps = {
  handsons: HandsonListItem[];
  value: number;
};
const CenteredTabs: React.FC<CenterdTabsProps> = (props) => {
  const { handsons } = props;
  const classes = useStyles1();
  const [value, setValue] = React.useState<string>('one');

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <div className={classes.root}>
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
    </div>
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
