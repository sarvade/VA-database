import ReactWordcloud from "react-wordcloud";
import React from "react";
import { connect } from "react-redux";

export const WordCloudComponent = (props: any) => {
  console.log("WordCloudComponent");
      return (
        <ReactWordcloud options={props.wordcloudoptionsData} words={props.wordcloudData}/>
      );
    };

  const mapStateToProps: any = (state: any) => {
    return { wordcloudData: state.abolitionData.wordcloudData, wordcloudoptionsData: state.abolitionData.wordcloudoptionsData };
  };

  export default connect(mapStateToProps, {
    // setAdmin
  })(WordCloudComponent);