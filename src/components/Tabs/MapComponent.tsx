import mapDataIE from "@highcharts/map-collection/custom/world-continents.geo.json";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import React from "react";
import { connect } from "react-redux";
highchartsMap(Highcharts); // Initialize the map module

if (typeof window !== "undefined") {
  const w: any = window;
  w.proj4 = w.proj4 || proj4;
}

export const MapComponent = (props: any) => {
  let mapOptions = {
    chart: {
      borderWidth: 1,
      map: "custom/world",
      backgroundColor: "#ffffff",
      borderColor: "none",
    },
    title: {
      text: " ",
    },
    credits: {
      enabled: true,
    },
    legend: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    tooltip: {
      pointFormat: "{point.impor}: {point.z} letters",
    },
    series: [
      {
        name: "Basemap",
        mapData: mapDataIE,
        borderColor: "#A0A0A0",
        nullColor: "rgba(200, 200, 200, 0.3)",
        showInLegend: false,
        enableMouseTracking: false,
      },
      {
        type: "mapbubble",
        color: "#78b5a1",
        data: props.mapData,
        cursor: "pointer",
        maxSize: "20%",
        minSize: 8,
        name: "Total Letters",
      },
    ],
  };
  return (
    <HighchartsReact
      constructorType={"mapChart"}
      highcharts={Highcharts}
      options={mapOptions}
    />
  );
};
const mapStateToProps: any = (state: any) => {
  return { mapData: state.abolitionData.mapData };
};
export default connect(mapStateToProps, {
  // setAdmin
})(MapComponent);
