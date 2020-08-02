import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import RaidListItem from '../../components/Dictionary/RaidListItem';

import { IRaid } from '../../interfaces/Dictionary/IRaids';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    justifyContent: "space-between"
  },
  listItemContainer: {
    backgroundColor: "grey",
  },
  listItem: {

  },
}));

export default function Raid() {
  const classes = useStyles();

  const [search, setSearch] = React.useState("");

  const _onChangeSearch = (value: string) => {
    setSearch(value);

    //Reactive Filter
  }
  
  const _tempRaid: IRaid = {
    idx: 0,
    key: "01",
    name: "수룡장",
    limitPower: 17000,
    limitEnter: "-",
    minPeopleCount: 0,
    maxPeopleCount: 4,
    maxEnterCount: 3,
    reward: "보상",
    img: "수룡장.png",
  }

  return (
    <React.Fragment>
			<Grid container item xs={12} spacing={3}
        className={classes.root}>
        <Grid item xs={9}>
          레이드 목록
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            size="small"
            id="raidsearch"
            name="raidsearch"
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
        <Grid item xs={12}
          className={classes.listItemContainer}>
            <RaidListItem
              raid= {_tempRaid}
              keyword={search}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}