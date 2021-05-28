
import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { TabsComponent } from "./components/Tabs";
import ToolbarComponent from "./components/ToolbarComponent";
import { setMapData, setTableData, setTimeLineData, setWordCloudData } from "./redux/actions";
import withSplashScreen from './Loading.js'
function App() {
  const tableRef = React.createRef();
  return (
    <>
      <div  className="row Body-main">
        <div className=" col-lg-3 main-toolbar" >
          <ToolbarComponent tableRef={tableRef}></ToolbarComponent>
        </div>
        <div className="col-lg-9 Tabs-comp">    <TabsComponent className="tab" tableRef={tableRef}></TabsComponent>
    </div>
      </div>
    </>
  );
}
const mapStateToProps: any = (state: any) => {
  return {};
};
export default connect(mapStateToProps, {
  setMapData,
  setTableData,
  setTimeLineData,
  setWordCloudData,
})(withSplashScreen(App));
