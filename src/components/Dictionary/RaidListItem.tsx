import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import { IRaid } from '../../interfaces/Dictionary/IRaids';

import image01 from "../../assets/img/dictionary/raid/거마왕.png";

const baseUrl = "../../assets/img/dictionary/raid/";

interface IProps {
  raid: IRaid,
  keyword?: string,
}

const useStyles = makeStyles((theme) => ({
  root: {
  },
  shortImage: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function RaidListItem(props: IProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
			<Grid container item xs={12} spacing={3}
        className={classes.root}>
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
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            <Avatar alt="Raid" src={baseUrl + props.raid.img} className={classes.shortImage}/>
          </Grid>
          <Grid item xs={4}>
            {props.raid.name}
          </Grid>
          <Grid item xs={2}>
            {props.raid.limitPower}
          </Grid>
          <Grid item xs={2}>
            {props.raid.minPeopleCount} ~ {props.raid.maxPeopleCount}
          </Grid>
          <Grid item xs={2}>
            검색어 - {props.keyword}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}