import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const Details = (props: any) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <Grid container>
        <Grid item xs={4}>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              ID : {props.data.id}
            </Typography>{" "}
            <Typography className={classes.pos} color="textSecondary">
              Date Sent : {props.data.dateSent}
            </Typography>{" "}
            <Typography className={classes.pos} color="textSecondary">
              Date Received : {props.data.dateReceived}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              Imputed Origin : {props.data.impor}
            </Typography>{" "}
            <Typography className={classes.pos} color="textSecondary">
              Letter : {props.data.letter}
            </Typography>{" "}
            <Typography className={classes.pos} color="textSecondary">
              Summary : {props.data.summary}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              Origin : {props.data.origin}
            </Typography>{" "}
            <Typography className={classes.pos} color="textSecondary">
              Sender : {props.data.sender}
            </Typography>{" "}
            <Typography className={classes.pos} color="textSecondary">
              Receiver: {props.data.receiver}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
