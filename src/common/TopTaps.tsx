import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import ISection from '../interfaces/ISection';

const useStyles = makeStyles((theme) => ({
  toolbarTabs: {
    margin: "0 auto",
    justifyContent: "space-between",
  },
  toolbarTab: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  tabListItem: {
    margin: "auto",
    textAlign: "center"
  }
}));

export default function TopTaps() {
  const classes = useStyles();
  
  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenFixed, setIsOpenFixed] = React.useState(false);

  const _tabsOpen = () => {
    setIsOpen(true);
  }
  const _tabsClose = () => {
    setIsOpen(false);
  }

  const _onTabsEnter = (e: React.MouseEvent<{}>) => {
    _tabsOpen();
    console.log(e.currentTarget);
  }
  const _onTabsLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    _tabsClose();
  }

  const _onListItemOpen = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setIsOpenFixed(true);
    _tabsOpen();
  }
  const _onListItemClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setIsOpenFixed(false);
    _tabsClose();
  }

  const _onTabsChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    
    console.log(menus.find((menu) => {
      return menu.key === newValue.toString();
    }));
  };
  
  const menus: Array<ISection> = [
      {
        key: "0",
        title: "메인", 
        url: "/",
        sub: []
      },
      {
        key: "1",
        title: "게시판", 
        url: "/#1",
        sub: [
          {
            key: "11",
            title: "자유게시판",
            url: "/#1/#1",
            sub: []
          },
          {
            key: "12",
            title: "서버게시판",
            url: "/#1/#2",
            sub: []
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
            url: "/#2/#1",
            sub: []
          },
          {
            key: "22",
            title: "능력치 계산기",
            url: "/#2/#2",
            sub: []
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
            url: "/#3/#1",
            sub: []
          },
          {
            key: "32",
            title: "환수",
            url: "/#3/#2",
            sub: []
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
            url: "/#4/#1",
            sub: []
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
            url: "/#5/#1",
            sub: []
          },
          {
            key: "52",
            title: "등급별 보상",
            url: "/#5/#2",
            sub: []
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
            url: "/#6/#1",
            sub: []
          },
          {
            key: "62",
            title: "아이디 찾기",
            url: "/#6/#2",
            sub: []
          },
          {
            key: "63",
            title: "패스워드 찾기",
            url: "/#6/#3",
            sub: []
          },
        ]
      },
  ]

  return (
    <Tabs
      value="false" //{value}
      onChange={_onTabsChange}
      indicatorColor="primary"
      textColor="primary"
      //variant="fullWidth"
      centered
      className={classes.toolbarTabs}
      >
    {
      menus.map((menu: ISection) => (
        <Box
          key={menu.key}
          onMouseEnter={_onTabsEnter}
          onMouseLeave={_onTabsLeave}
          >
          <Tab
            value={value}
            className={classes.toolbarTab}
            label={menu.title}
          />
          {
            (isOpen || isOpenFixed) &&
              <List>
                {
                  menu.sub.map((submenu: ISection) => (
                    <ListItem
                      key={submenu.key}
                      button
                      className={classes.tabListItem}>
                        <Typography
                          align="center"
                          className={classes.tabListItem}
                          variant="subtitle2"
                          display="block">
                            {submenu.title}
                        </Typography>
                    </ListItem>
                  ))
                }
              </List>
          }
        </Box>
      ))
    }
    {
      isOpenFixed ?
        <Box
          key="98">
          <Tab
            label="접기"
            onClick={_onListItemClose}>
          </Tab>
          <ExpandLessIcon/>
        </Box>
      : 
        <Box
          key="99">
          <Tab
            label="더보기"
            onClick={_onListItemOpen}>
          </Tab>
          <ExpandMoreIcon/>
        </Box>
    }
  </Tabs>
  );
}
