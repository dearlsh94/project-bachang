import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RaidListItem from 'components/ListItem/RaidListItem';
import { getDicAllRaidList } from 'utils/DictionaryUtil';
import IRaids from 'interfaces/Dictionary/IRaids';
import MyInputSearch from 'elements/Input/MyInputSearch';
import MyGridDivider from 'elements/Grid/MyGridDivider';

import { useRecoilValue } from 'recoil';
import { SearchValueState } from 'state';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "auto",
    paddingTop: "10",
    justifyContent: "space-between",
  },
  searchContainer: {
  },
  sectionContainer: {

  },
  listItemContainer: {
    padding: "2"
  }
}));

export default function Raid() {
  const classes = useStyles();

  const searchValue = useRecoilValue(SearchValueState);

  const allRaids: Array<IRaids> = getDicAllRaidList();

  return (
    <React.Fragment>
      <Grid container spacing={3}
        direction="column"
        justify="flex-start"
        alignItems="center"
        className={classes.root}>
          <Grid container
            className={classes.searchContainer}>
              <Grid item xs={9}>
              </Grid>
              <Grid item xs={3}>
                <MyInputSearch /> 
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
                  key={raids.section}
                  className={classes.sectionContainer}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        {raids.section}
                      </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                      {
                        raids.raidInfos.map((raid) => (
                          <RaidListItem
                            key={raid.key}
                            raid= {raid}
                            keyword={searchValue}/>
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