import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const PageCard = (props) => {
  const classes = useStyles();

  const Title = () =>
    props.title instanceof Element ? (
      <props.title />
    ) : (
      <Typography className={"d-flex"} variant="h3" gutterBottom>
        {props.title}
      </Typography>
    );
  return (
    <div className={"pt-3 animate__animated animate__fadeIn"}>
      <Card className={classes.root}>
        <CardContent>
          <div className={"noPrint"}>
            <Title />
          </div>
          {props.render}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageCard;
