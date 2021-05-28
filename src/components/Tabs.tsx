import { AppBar, Button, Grid, Paper, Toolbar } from "@material-ui/core";
import '../App.css';
import React,{Suspense} from "react";
const DatabaseComponent = React.lazy(()=>import('./Tabs/DatabaseComponent'));
const MapComponent = React.lazy(()=>import('./Tabs/MapComponent'));
const TimelineComponent = React.lazy(()=>import('./Tabs/TimelineComponent'));
export const TabsComponent = (props: any) => {
  const showTab = (tabName: any) => {
    const w: any = window;
    if (tabName === "DatabaseComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "block";
      w.document.getElementById("MapComponent").style.display = "none";
      w.document.getElementById("TimeLineComponent").style.display = "none";
    } else if (tabName === "MapComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "none";
      w.document.getElementById("MapComponent").style.display = "block";
      w.document.getElementById("TimeLineComponent").style.display = "none";
    } else if (tabName === "TimeLineComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "none";
      w.document.getElementById("MapComponent").style.display = "none";
      w.document.getElementById("TimeLineComponent").style.display = "block";
    } 
  };
  return (
    <>
      <Grid item xs={10}>
        <AppBar position="static">
          <Toolbar>
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={4}>
                <Button
                  style={{width:'100%',height:'100%'}}
                  color="inherit"
                  onClick={() => showTab("DatabaseComponent")}
                >
                  Database
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="inherit" onClick={() => showTab("MapComponent")}>
                  Map
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  color="inherit"
                  onClick={() => showTab("TimeLineComponent")}
                >
                  TimeLine
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <br></br>
        <Grid container>
          <Grid item xs={12} id={"DatabaseComponent"}>
            <Paper elevation={5}>
            <Suspense fallback={
           <div className="splash-screen">
           Wait a moment while we load your app.
           <div className="loading-dot">.</div>
         </div> }> 
            
            <DatabaseComponent tableRef={props.tableRef}></DatabaseComponent>
            </Suspense>  </Paper>
          </Grid>
          <Grid item xs={12} id={"MapComponent"} style={{ display: "none" }}>
            <Paper elevation={5}>
            <Suspense fallback={
           <div className="splash-screen">
           Wait a moment while we load your app.
           <div className="loading-dot">.</div>
         </div> }> 
            
            <MapComponent></MapComponent>
           </Suspense>  </Paper>
          </Grid>
          <Grid item xs={12} id={"TimeLineComponent"} style={{ display: "none" }}>
            <Paper elevation={5}>
            <Suspense fallback={
            <div className="splash-screen">
            Wait a moment while we load your app.
            <div className="loading-dot">.</div>
          </div>}> 
            <TimelineComponent></TimelineComponent>
            </Suspense>  </Paper>
          </Grid>
          </Grid>
      </Grid>
    </>
  );
};

/*<Grid item xs={12} id={"WordCloud"} style={{ display: "none" }}>
            <Paper elevation={5} style={{paddingTop: "33px", paddingBottom: "33px"}}>
            <Suspense fallback={
            <div className="splash-screen">
            Wait a moment while we load your app.
            <div className="loading-dot">.</div>
          </div>}> 
              <WordcloudComponent/>
            </Suspense>
            </Paper>
          </Grid>
       </Grid>
      </Grid>
    </>
  );
};
*/


/*button topbar 

            <Grid item xs={3}>
                <Button
                  color="inherit"
                  onClick={() => showTab("WordCloud")}
                >
                  WordCloud
                </Button>
              </Grid>
  */