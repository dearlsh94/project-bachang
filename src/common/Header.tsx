import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  menuList: {
    
  },
  menuItem:{
    verticalAlign: 'middle',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function Header() {
  const classes = useStyles();
  const title = "Basa";

  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const _onTabsChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    
    console.log(menus.find((menu) => {
      return menu.key === newValue.toString();
    }));
  };

  const _onListItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  };
  
  const _onListItemOpen = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setIsOpen(true);
  }
  const _onListItemClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setIsOpen(false);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const menus: Array<ISection> = [
      {
        key: "0",
        title: "메인", 
        url: "/",
        sub: [
        ]
      },
      {
        key: "1",
        title: "게시판", 
        url: "/#1",
        sub: [
          {
            key: "11",
            title: "자유게시판",
            url: "/#1/#1"
          },
          {
            key: "12",
            title: "서버게시판",
            url: "/#1/#2"
          },
        ]
      },
      {
        key: "2",
        title: "계산기", 
        url: "/#2",
        sub: [
          {
            key: "21",
            title: "전투력 계산기",
            url: "/#2/#1"
          },
          {
            key: "22",
            title: "능력치 계산기",
            url: "/#2/#2"
          },
        ]
      },
      {
        key: "3",
        title: "도감", 
        url: "/#3",
        sub: [
          {
            key: "31",
            title: "아이템",
            url: "/#3/#1"
          },
          {
            key: "32",
            title: "환수",
            url: "/#3/#2"
          },
        ]
      },
      {
        key: "4",
        title: "경매장", 
        url: "/#4",
        sub: [
          {
            key: "41",
            title: "거래게시판",
            url: "/#4/#1"
          }
        ]
      },
      {
        key: "5",
        title: "회원시스템", 
        url: "/#5",
        sub: [
          {
            key: "51",
            title: "질의응답",
            url: "/#5/#1"
          },
          {
            key: "52",
            title: "등급별 보상",
            url: "/#5/#2"
          },
        ]
      },
      {
        key: "6",
        title: "마이페이지", 
        url: "/#6",
        sub: [
          {
            key: "61",
            title: "내정보",
            url: "/#6/#1"
          },
          {
            key: "62",
            title: "아이디 찾기",
            url: "/#6/#2"
          },
          {
            key: "63",
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
      <Tabs
          value={value}
          onChange={_onTabsChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          >
        {
          menus.map((menu: ISection) => (
            <Tab
              key={menu.key}
              className={classes.toolbarLink}
              label={menu.title}
            />
          ))
        }
        {
          isOpen ?
            <Tab
              key="98"
              label="접기"
              onClick={_onListItemClose}>
            </Tab>
          : <Tab
              key="99"
              label="더보기"
              onClick={_onListItemOpen}>
            </Tab>
        }
      </Tabs>
    </React.Fragment>
  );
}