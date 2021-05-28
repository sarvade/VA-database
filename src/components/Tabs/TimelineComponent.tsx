import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { connect } from "react-redux";

export const TimelineComponent = (props: any) => {
    const chartOptions = {
    chart: {
      panning: {
        enabled: false,
        type: "x",
      },
      styledMode: false,
      borderRadius: 15,
      colorCount: 10,
      defaultSeriesType: "line",
      ignoreHiddenSeries: true,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: {
          zIndex: 6,
        },
        position: {
          align: "right",
          x: -10,
          y: 10,
        },
      },
      zoomBySingleTouch: false,
      width: null,
      height: null,
      borderColor: "#335cad",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc",
      type: "column",
      spacingBottom: 50,
    },
    legend: {
      enabled: false,
    },
    xAxis: [
      {
        type: "category",
        index: 0,
        isX: true,
      },
    ],
    title: { text: "" },
    tooltip: {
      enabled: true,
      animation: true,
      borderRadius: 3,
      dateTimeLabelFormats: {
        millisecond: "%A, %b %e, %H:%M:%S.%L",
        second: "%A, %b %e, %H:%M:%S",
        minute: "%A, %b %e, %H:%M",
        hour: "%A, %b %e, %H:%M",
        day: "%A, %b %e, %Y",
        week: "Week from %A, %b %e, %Y",
        month: "%B %Y",
        year: "%Y",
      },
      footerFormat: "",
      padding: 8,
      snap: 10,
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">●</span> Letters: <b>{point.y}</b><br/>',
      backgroundColor: "rgba(247,247,247,0.85)",
      borderWidth: 1,
      shadow: true,
      style: {
        color: "#333333",
        cursor: "default",
        fontSize: "12px",
        whiteSpace: "nowrap",
      },
    },
    yAxis: [
      {
        title: {
          text: null,
        },
        index: 0,
      },
    ],
    series: [{ data: props.timelineData, color: "#00744E" }],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};
const mapStateToProps: any = (state: any) => {
  return { timelineData: state.abolitionData.timelineData };
};
export default connect(mapStateToProps, {
  // setAdmin
})(TimelineComponent);
