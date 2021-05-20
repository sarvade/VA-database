import {
  SET_COLUMNS,
  SET_MAP_DATA,
  SET_TABLE_DATA,
  SET_TIMELINE_DATA,
  SET_WORDCLOUD_DATA,
} from "./actionTypes";
export const setMapData = (content: any) => {
  return {
    type: SET_MAP_DATA,
    mapData: content.mapData,
  };
};
export const setTableData = (content: any) => {
  return {
    type: SET_TABLE_DATA,
    tableData: content.tableData,
  };
};
export const setTimeLineData = (content: any) => {
  return {
    type: SET_TIMELINE_DATA,
    timelineData: content.timelineData,
  };
};
export const setWordCloudData = (content: any) => {
  return {
    type: SET_WORDCLOUD_DATA,
    wordcloudData: content.wordcloudData,
  };
};
export const setColumns = (content: any) => {
  console.log("SET_COLUMNS");
  return {
    type: SET_COLUMNS,
    columns: content.columns,
  };
};
