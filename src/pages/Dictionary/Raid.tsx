import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import RaidListItem from 'components/Dictionary/RaidListItem';
import { getDicAllRaidList } from 'utils/DictionaryUtil';
import IRaids from 'interfaces/Dictionary/IRaids';

import { MyGridDivider } from 'elements/Grid/MyGridDivider';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: "auto",
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
			<Grid container spacing={3}
        className={classes.root}>
        <Grid container>
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
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            
          </Grid>
          <Grid item xs={4}>
            레이드명 
          </Grid>
          <Grid item xs={2}>
            제한 전투력
          </Grid>
          <Grid item xs={2}>
            제한 인원
          </Grid>
          <Grid item xs={2}>

          </Grid>
        </Grid>
        <MyGridDivider/>
        {
          allRaids.map((raids) => {
            return (
              <Container
                key={raids.section}>
                  <Grid item xs={12}>
                    {raids.section}
                  </Grid>
                  <Grid container item xs={12}>
                    {
                      raids.raidInfos.map((raid) => (
                        <RaidListItem
                          key={raid.key}
                          raid= {raid}
                          keyword={search}/>
                      ))
                    }
                  </Grid>
                  <MyGridDivider/>
              </Container>
            );
          })
        }
      </Grid>
    </React.Fragment>
  );
}