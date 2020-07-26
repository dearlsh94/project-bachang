import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LocationOn from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import image1 from "../assets/img/bg01.jpg";
import image2 from "../assets/img/bg02.jpg";
import image3 from "../assets/img/bg03.jpg";

const carouselStyle = {
  section: {
    padding: "70px 0"
  },
  carousel: {
    overflow: "hidden"
  },
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
  "@media (min-width: 576px)": {
    maxWidth: "540px"
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px"
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px"
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1140px"
  }
}

const useStyle = makeStyles(carouselStyle);

const baseUrl = "../assets/img";

export default function MainCarousel() {
  const classes = useStyle();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Container>
          <Grid container item xs={12} sm={12} md={8} 
            className={classes.marginAuto}>
              
          </Grid>
        </Container>
      </div>
    </div>
  );
}