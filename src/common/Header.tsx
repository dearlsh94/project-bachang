import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ISection from '../interfaces/ISection';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    flexGrow: 1,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header() {
  const classes = useStyles();
  const title: string = "Basa";

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const sections: Array<ISection> = [
      {
        title: "게시판", 
        url: "/#1",
        sub: [
          {
            title: "자유게시판",
            url: "/#1/#1"
          },
          {
            title: "서버게시판",
            url: "/#1/#2"
          },
        ]
      },
      {
        title: "계산기", 
        url: "/#2",
        sub: [
          {
            title: "전투력 계산기",
            url: "/#2/#1"
          },
          {
            title: "능력치 계산기",
            url: "/#2/#2"
          },
        ]
      },
      {
        title: "도감", 
        url: "/#3",
        sub: [
          {
            title: "아이템",
            url: "/#3/#1"
          },
          {
            title: "환수",
            url: "/#3/#2"
          },
        ]
      },
      {
        title: "경매장", 
        url: "/#4",
        sub: [
          {
            title: "거래게시판",
            url: "/#4/#1"
          }
        ]
      },
      {
        title: "회원시스템", 
        url: "/#5",
        sub: [
          {
            title: "질의응답",
            url: "/#5/#1"
          },
          {
            title: "등급별 보상",
            url: "/#5/#2"
          },
        ]
      },
      {
        title: "마이페이지", 
        url: "/#6",
        sub: [
          {
            title: "내정보",
            url: "/#6/#1"
          },
          {
            title: "아이디 찾기",
            url: "/#6/#2"
          },
          {
            title: "패스워드 찾기",
            url: "/#6/#3"
          },
        ]
      },
  ]

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        {/*
        <IconButton>
          <SearchIcon />
        </IconButton>
        */}
        <Button 
          variant="outlined" 
          size="small"
          onClick={() => document.location.href="/signin"}
        >
          Sign in
        </Button>
        <Button 
          variant="outlined" 
          size="small"
          onClick={() => document.location.href="/signup"}
        >
          Sign up
        </Button>
      </Toolbar>
      {/*
      <Toolbar 
        component="nav" 
        variant="dense" 
        className={classes.toolbarSecondary}>
        {sections.map((section: ISection) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      */}
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
          {sections.map((section: ISection) => (
            <Tab
              className={classes.toolbarLink}
              label={section.title}
              onClick={() => document.location.href=section.url}
            />
          ))}
        </Tabs>
    </React.Fragment>
  );
}