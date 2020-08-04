import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Carousel from "react-slick";

const useStyles = makeStyles((theme) => ({
  cardCarousel: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    margin: "25px 0",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "3px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    overflow: "hidden"
  },
  container: {
    padding: "5 0",
    width: "100%",
    height: "auto",
    marginLeft: "auto !important",
    marginRight: "auto !important",
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
  },
  btnMove: {
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    verticalAlign: "middle",
  }
}));

const baseUrl = "/assets/img/dictionary/raid/";

export default function MainCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [];
  images.push("수룡장.png");
  images.push("거마왕.png");

  return (
    <Container
      className={classes.container}>
      <Grid container item xs={12}>
        <Grid item xs={1} className={classes.btnMove}>
          <IconButton>
            <ArrowBackIosIcon/>
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Card className={classes.cardCarousel}>
            <Carousel {...settings}>
              {
                images.map((image, i) => {
                  return (
                    <div
                      key={image}>
                        <img src={baseUrl + image} alt="slide" className="slick-image" />
                    </div>
                  );
                })
              }
            </Carousel>
          </Card>
        </Grid>
        <Grid item xs={1} className={classes.btnMove}>
          <IconButton>
              <ArrowForwardIosIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}