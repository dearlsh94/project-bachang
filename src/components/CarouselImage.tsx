import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

interface IProps{
  url: string
}

const imageStyle = {
  image: {
    padding: "10 0",
    width: "100%",
    backgroundColor: "grey",
  },
}

const baseUrl = "/assets/img/dictionary/raid/";

const useStyle = makeStyles(imageStyle);

export default function CarouselImage(props: IProps) {
  const classes = useStyle();

  return (
    <img
      onClick={() => console.log(props.url)}
      src={baseUrl + props.url}
    />
  );
}