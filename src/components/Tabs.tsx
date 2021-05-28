import { AppBar, Button, Grid, Paper, Toolbar } from "@material-ui/core";
import React from "react";
import DatabaseComponent from "./Tabs/DatabaseComponent";
import MapComponent from "./Tabs/MapComponent";
import TimelineComponent from "./Tabs/TimelineComponent";
import WordcloudComponent from "./Tabs/WordcloudComponent";
export const TabsComponent = (props: any) => {
  const showTab = (tabName: any) => {
    const w: any = window;
    if (tabName === "DatabaseComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "block";
      w.document.getElementById("MapComponent").style.display = "none";
      w.document.getElementById("TimeLineComponent").style.display = "none";
      w.document.getElementById("WordCloud").style.display = "none";
    } else if (tabName === "MapComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "none";
      w.document.getElementById("MapComponent").style.display = "block";
      w.document.getElementById("TimeLineComponent").style.display = "none";
      w.document.getElementById("WordCloud").style.display = "none";
    } else if (tabName === "TimeLineComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "none";
      w.document.getElementById("MapComponent").style.display = "none";
      w.document.getElementById("TimeLineComponent").style.display = "block";
      w.document.getElementById("WordCloud").style.display = "none";
    } else if (tabName === "WordCloud") {
      w.document.getElementById("DatabaseComponent").style.display = "none";
      w.document.getElementById("MapComponent").style.display = "none";
      w.document.getElementById("TimeLineComponent").style.display = "none";
      w.document.getElementById("WordCloud").style.display = "block";
    }
  };
  return (
    <>
      <Grid item xs={10}>
        <AppBar position="static">
          <Toolbar>
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={3}>
                <Button
                  color="inherit"
                  onClick={() => showTab("DatabaseComponent")}
                >
                  Database
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="inherit" onClick={() => showTab("MapComponent")}>
                  Map
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  color="inherit"
                  onClick={() => showTab("TimeLineComponent")}
                >
                  TimeLine
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  color="inherit"
                  onClick={() => showTab("WordCloud")}
                >
                  WordCloud
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <br></br>
        <Grid container>
          <Grid item xs={12} id={"DatabaseComponent"}>
            <Paper elevation={5}>
              <DatabaseComponent tableRef={props.tableRef}></DatabaseComponent>
            </Paper>
          </Grid>
          <Grid item xs={12} id={"MapComponent"} style={{ display: "none" }}>
            <Paper elevation={5}>
              <MapComponent></MapComponent>
            </Paper>
          </Grid>
          <Grid item xs={12} id={"TimeLineComponent"} style={{ display: "none" }}>
            <Paper elevation={5}>
              <TimelineComponent></TimelineComponent>
            </Paper>
          </Grid>
          <Grid item xs={12} id={"WordCloud"} style={{ display: "none" }}>
            <Paper elevation={5} style={{paddingTop: "33px", paddingBottom: "33px"}}>
              <WordcloudComponent></WordcloudComponent>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
