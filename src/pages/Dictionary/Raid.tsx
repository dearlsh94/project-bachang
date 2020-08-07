import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import RaidListItem from 'components/Dictionary/RaidListItem';
import { getDicAllRaidList } from 'utils/DictionaryUtil';
import IRaids from 'interfaces/Dictionary/IRaids';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    justifyContent: "space-between"
  },
  listItemContainer: {
    padding: "2"
  }
}));

export default function Raid() {
  const classes = useStyles();

  const [search, setSearch] = React.useState("");

  const _onChangeSearch = (value: string) => {
    setSearch(value);

    //Reactive Filter
  }
  
  const allRaids: Array<IRaids> = getDicAllRaidList();

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
            {
              allRaids.map((raids) => {
                return (
                  <div>
                    {raids.section}
                    {
                      raids.raidInfos.map((raid) => (
                        <RaidListItem
                          raid= {raid}
                          keyword={search}/>
                      ))
                    }
                  </div>
                );
              })
            }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}