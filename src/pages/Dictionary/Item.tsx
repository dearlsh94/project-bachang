import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import IItem from '../../interfaces/Dictionary/IItem';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    justifyContent: "space-between",
  },
  tabs: {
    margin: "0 auto",
    justifyContent: "space-between",
  },
  tab: {
    padding: theme.spacing(1),
    flexShrink: 2,
  },
}));

export default function FindId() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState("");

  const tabs: Array<IItem> = [
    {
      idx: 0,
      key: "01",
      title: "전체"
    },
    {
      idx: 1,
      key: "02",
      title: "목록1"
    },
    {
      idx: 2,
      key: "03",
      title: "목록2"
    },
  ]

  const _onTabsChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setSearch("");
  };

  const _onChangeSearch = (value: string) => {
    setSearch(value);

    //Reactive Filter
  }

  return (
    <React.Fragment>
      아이템 - 현재 검색어 : {search}
			<Grid container xs={12} spacing={3}
        className={classes.tabbar}>
        <Grid item xs={9}>
          <Tabs
            value={value}
            onChange={_onTabsChange}
            indicatorColor="primary"
            textColor="primary">
              {
                tabs.map((tab: IItem) => {
                  return (
                    <Tab
                      key={tab.key}
                      className={classes.tab}
                      label={tab.title}>
                    </Tab>
                  );
                })
              }
          </Tabs>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            size="small"
            id="search"
            name="search"
            label="검색"
            value={search}
            onChange={(e) => _onChangeSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}