import {
  SET_MAP_DATA,
  SET_TABLE_DATA,
  SET_TIMELINE_DATA,
  SET_WORDCLOUD_DATA,
  SET_COLUMNS,
} from "../actionTypes";
import data from "../../vadata.json";
export const initializeData = (data: any) => {
  const mData: any = data;
  const finalData = mData.map((d: any) => ({
    id: d.id,
    letter: d.letter,
    lat: d.originsLat,
    lon: d.originsLong,
    summary: d.summary,
    sender: d.sender,
    receiver: d.receiver,
    origin: d.origin,
    impor: d.impor,
    source: d.source,
    dateSent: d.dateSent,
    dateReceived: d.dateReceived,
  }));
  const result = Object.values(
    finalData.reduce(function (r: any, e: any) {
      var key = e.impor;
      if (!r[key]) {
        r[key] = e;
        r[key].z = 1;
      } else {
        r[key].z += 1;
      }
      return r;
    }, {})
  );
  const timeline = Object.values(
    finalData.reduce(function (r: any, e: any) {
      const split = e?.dateSent?.split("-");
      if (split.length > 0) {
        var key = split[0];
        if (!r[key]) {
          r[key] = { name: split[0] };
          r[key].y = 1;
        } else {
          r[key].y += 1;
        }
        return r;
      } else return {};
    }, {})
  );
  const wordcloud = mData.map((d: any) => ({
    text: d.summary,
    value: d.letter,
  }));

  const wordcloudOptions = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, 30],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
    };
  
  const columns = [
    { show: false, title: "ID", field: "id" },
    { show: false, title: "Letter", field: "letter" },
    { show: true, title: "Sender", field: "sender" },
    { show: true, title: "Receiver", field: "receiver" },
    { show: false, title: "Origin", field: "origin" },
    { show: true, title: "Imputed Origin", field: "impor" },
    { show: true, title: "Date Sent", field: "dateSent" },
    { show: false, title: "Date Received", field: "dateReceived" },
    { show: true, title: "Summary", field: "summary" },
    { show: false, title: "Source", field: "source" },
  ];
  return {
    mapData: [...result],
    tableData: [...finalData],
    timelineData: [...timeline],
    wordcloudData: [...wordcloud],
    wordcloudoptionsData: wordcloudOptions, 
    columns,
  };
};
export const initializeResetData = () => {
  return initializeData(data);
};

const initialState = initializeResetData();
export const abolitionData = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MAP_DATA:
      return Object.assign({}, state, {
        mapData: [...action.mapData],
        action: action,
      });
    case SET_TABLE_DATA:
      return Object.assign({}, state, {
        tableData: action.tableData,
        action: action,
      });
    case SET_TIMELINE_DATA:
      return Object.assign({}, state, {
        timelineData: action.timelineData,
        action: action,
      });
    case SET_WORDCLOUD_DATA:
      return Object.assign({}, state, {
        wordcloudData: action.wordcloudData,
        action: action,
      });
    case SET_COLUMNS:
      return Object.assign({}, state, {
        columns: action.columns,
        action: action,
      });
    default:
      return state;
  }
};
