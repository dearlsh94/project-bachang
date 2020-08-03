import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const carouselStyle = {
  section: {
    padding: "70px 0"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
}

const useStyle = makeStyles(carouselStyle);

const baseUrl = "/assets/img/dictionary/raid/";

export default function MainCarousel() {
  const classes = useStyle();

  const [value, setValue] = React.useState(0);

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Container>
          <Grid container item xs={12}>
            <img src={baseUrl + "거마왕.png"}></img>
            <img src={baseUrl + "수룡장.png"}></img>
          </Grid>
        </Container>
      </div>
    </div>
  );
}