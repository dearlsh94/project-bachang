import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import ISection from '../interfaces/ISection';

const useStyles = makeStyles((theme) => ({
  menuTabs: {
    margin: "0 auto",
  },
  menuTab: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: "space-around",
    width: "13%",
    textAlign: "center",
  },
  tabListItem: {
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    flexShrink: 0,
  }
}));

export default function TopTaps() {
  const classes = useStyles();
  
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
  }
  const _onTabsLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    _tabsClose();
  }

  const _onListItemOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpenFixed(true);
    _tabsOpen();
  }
  const _onListItemClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpenFixed(false);
    _tabsClose();
  }

  const menus: Array<ISection> = [
      {
        idx: 0,
        key: "0000100",
        title: "게시판", 
        url: "/#1",
        sub: [
          {
            idx: 0,
            key: "0000101",
            title: "자유게시판",
            url: "/#1/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000102",
            title: "서버게시판",
            url: "/#1/#2",
            sub: []
          },
        ]
      },
      {
        idx: 1,
        key: "0000200",
        title: "계산기", 
        url: "/#2",
        sub: [
          {
            idx: 0,
            key: "0000201",
            title: "전투력 계산기",
            url: "/#2/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000202",
            title: "능력치 계산기",
            url: "/#2/#2",
            sub: []
          },
        ]
      },
      {
        idx: 2,
        key: "0000300",
        title: "도감", 
        url: "/#3",
        sub: [
          {
            idx: 0,
            key: "0000301",
            title: "아이템",
            url: "/dic/item",
            sub: []
          },
          {
            idx: 1,
            key: "0000302",
            title: "환수",
            url: "/#3/#2",
            sub: []
          },
        ]
      },
      {
        idx: 3,
        key: "0000400",
        title: "경매장", 
        url: "/#4",
        sub: [
          {
            idx: 0,
            key: "0000401",
            title: "거래게시판",
            url: "/#4/#1",
            sub: []
          }
        ]
      },
      {
        idx: 4,
        key: "0000500",
        title: "회원시스템", 
        url: "/#5",
        sub: [
          {
            idx: 0,
            key: "0000501",
            title: "질의응답",
            url: "/#5/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000502",
            title: "등급별 보상",
            url: "/#5/#2",
            sub: []
          },
        ]
      },
      {
        idx: 5,
        key: "0000600",
        title: "마이페이지", 
        url: "/#6",
        sub: [
          {
            idx: 0,
            key: "0000601",
            title: "내정보",
            url: "/#6/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000602",
            title: "아이디 찾기",
            url: "/findid",
            sub: []
          },
          {
            idx: 2,
            key: "0000603",
            title: "비밀번호 찾기",
            url: "/findpw",
            sub: []
          },
        ]
      },
  ]

  const _onMoveMenu = (url: string) => {
    document.location.href = url;
  }

  return (
    <React.Fragment>
      <Box>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="center"
          className={classes.menuTabs}>
          {
            menus.map((menu: ISection) => {
              return(
                <Grid
                  item
                  key={menu.idx}
                  className={classes.menuTab}
                  onMouseEnter={_onTabsEnter}
                  onMouseLeave={_onTabsLeave}>
                  <List>
                    <ListItem
                      key={menu.key}
                      button
                      className={classes.tabListItem}
                      onClick={() => (_onMoveMenu(menu.url))}>
                        <Typography
                          align="center"
                          variant="subtitle1"
                          display="block">
                            {menu.title}
                        </Typography>
                    </ListItem>
                    {
                      (isOpen || isOpenFixed) &&
                        menu.sub.map((submenu: ISection) => (
                          <ListItem
                            key={submenu.key}
                            button
                            className={classes.tabListItem}
                            onClick={() => (_onMoveMenu(submenu.url))}>
                              <Typography
                                align="center"
                                variant="subtitle2"
                                display="block">
                                  {submenu.title}
                              </Typography>
                          </ListItem>
                        ))
                    }
                  </List>
                </Grid>
              );
            })
          }
          <Grid
            item
            sm={1}
            className={classes.menuTab}>
            {
              isOpenFixed ?
                <IconButton
                  onClick={_onListItemClose}>
                  <ExpandLessIcon/>
                </IconButton>
              :
                <IconButton
                  onClick={_onListItemOpen}>
                  <ExpandMoreIcon/>
                </IconButton>
            }
          </Grid>
        </Grid>
      </Box>
      <Divider/>
    </React.Fragment>
  );
}
