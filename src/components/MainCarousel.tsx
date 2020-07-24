import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-slick";
import LocationOn from "@material-ui/icons/LocationOn";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import image1 from "../assets/img/bg01.jpg";
import image2 from "../assets/img/bg02.jpg";
import image3 from "../assets/img/bg03.jpg";

const carouselStyle = makeStyles({
  section: {
    padding: "70px 0"
  },
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important"
  },
  container: {
    width: "100%",
    height: "auto",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "1150px",
  }
});

const baseUrl = "../assets/img";

export default function MainCarousel() {
  const classes = carouselStyle();
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Container>
          <Grid container item xs={12} sm={12} md={8} 
            className={classes.marginAuto}>
              <Card>
                <Carousel {...settings}>
                  <div>
                    <img src={image1} alt="First slide" className="slick-image" />
                  </div>
                  <div>
                    <img src={image2} alt="Second slide" className="slick-image"/>
                  </div>
                  <div>
                    <img src={image3} alt="Third slide" className="slick-image" />
                  </div>
                </Carousel>
              </Card>
          </Grid>
        </Container>
      </div>
    </div>
  );
}