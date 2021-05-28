import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";

import '../App.css'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
//import {useAlert} from 'react-alert';
import { connect } from "react-redux";
import {
  setColumns,
  setMapData,
  setTableData,
  setTimeLineData,
  setWordCloudData,
} from "../redux/actions";
import { initializeData } from "../redux/reducers/abolitionData";

export const ToolbarComponent = (props: any) => {
  console.log("ToolbarComponent");
  const handleColumnChange = (column: any) => {
    const newColumns = [...props.columns];
    props.setColumns({ columns: newColumns });
  };
  const [sliderValue, setSliderValue] = React.useState([1816, 1900]);
  const [expanded, setExpanded] = React.useState(false);
  //const alert = useAlert();
  const marks = [
    {
      value: 1816,
      label: "1816",
    },
    {
      value: 1900,
      label: "1900",
    },
  ];
  const handleSliderChange = (event: any, newValue: any) => {
    // _.debounce(, 500)
    setSliderValue(newValue)
    
    
  }
  const handleDateChange = (newValue1: any, newValue2: any) => {
    setSliderValue([newValue1, newValue2]);
  
  };
  const applyDateChange = () => {
    const newTableData = props.tableRef.current.dataManager.data.filter(
      (d: any) => {
        return (
          d.dateReceived.split("-")[0] > sliderValue[0] &&
          d.dateReceived.split("-")[0] < sliderValue[1]
        );
      }
    );
    const newData = initializeData(newTableData);
    props.setTimeLineData({ timelineData: newData.timelineData });
    props.setTableData({ tableData: newData.tableData });
    props.setMapData({ mapData: newData.mapData });
    props.setWordCloudData({wordcloudData: newData.wordcloudData });
  };
  const arrayToCSV = (data: any) => {
    let csv = data.map((row: any) => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return csv.join("\n");
  };
  const download = (csvOrJson: string) => {
    const fields = props.tableRef.current.dataManager.columns.map((c: any) => {
      return c.field;
    });
    const downloadData = props.tableRef.current.state.data.map((d: any) => {
      const data = { ...d };
      Object.entries(data).map((entry: any, key: any, value: any) => {
        if (!fields.includes(entry[0])) {
          delete data[entry[0]];
        }
        return {};
      });
      return data;
    });
    let filename = "data.json";
    let str;
    let element = document.createElement("a");
    if (csvOrJson === "CSV") {
      filename = "export.csv";
      str = arrayToCSV(downloadData);
    } else if (csvOrJson === "JSON") {
      filename = "export.json";
      str = JSON.stringify(downloadData);
    }
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(str)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return (
    <Paper className="toolbar">
      <Typography variant="h4" component="div" style={{fontWeight:'bolder', marginBottom: "10px",fontSize:'20px' }}>
        TOOLBAR
      </Typography>
      <Accordion
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
        }}
        style={{fontSize:'12px', marginBottom: "10px" }}
      >
        <AccordionSummary
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            height: "40px",
            minHeight: "40px",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Columns</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: "0px", paddingBottom: "0px" }}>
          {" "}
          <FormGroup>
            {props.columns.map((column: any) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={column.show}
                      onChange={() => {
                        column.show = !column.show;
                        handleColumnChange(column);
                      }}
                    />
                  }
                  label={column.title}
                />
              );
            })}{" "}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Grid container xs={12} justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography id="range-slider" gutterBottom>
            Date Range
          </Typography>
        </Grid>
        <Grid item xs={12}
        
        style={{ width: "80px",
        margin : "20px",
        display: "flex"
        }}>
          <TextField
            label="Start Date"
            id="filled-size-small1"
            variant="filled"
            size="small"
            value={sliderValue[0]}
            style={{ width: "80px",
                    marginLeft : "20px"
          }}
            onChange={(newValue) => {
              handleDateChange(newValue.currentTarget.value, sliderValue[1]);
            }}
          />
          <TextField
            label="End Date"
            id="filled-size-small2"
            variant="filled"
            size="small"
            value={sliderValue[1]}
            style={{ width: "80px",
            marginLeft : "20px" }}
            onChange={(newValue) => {
              handleDateChange(sliderValue[0], newValue.currentTarget.value);
            }}
          />
        </Grid>
      </Grid>
      <Slider
        style={{ width: "80%",marginLeft:"10%",marginBottom:"30px" }}
        value={sliderValue}
        step={10}
        onChange={handleSliderChange}
        
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        marks={marks}
        min={1816}
        max={1900}
      />
      <Grid style={{
      display:'inline-block'
      }}>
      <Button style={{marginBottom:'10px',width:'100%'}}  onClick={applyDateChange} variant="contained" color="primary">
        Apply Date Change
      </Button>
      <Typography  style={{marginTop:'30px',borderBottom:'1px solid black'}} gutterBottom>Number of Results:</Typography>
      <Typography variant="h5" component="div">
        {props.tableData.length}
      </Typography>
      <br></br>
      <Button
       style={{width:'100%'}}
       variant="outlined"
        onClick={() => {
          download("CSV");
        //  alert.show('Your Json file Download will start soon!')

        }}
        // startIcon={<DownloadIcon />}
      >
        Download CSV
      </Button>
      <br></br> <br></br>
      <Button
       style={{width:'100%'}}
        variant="outlined"
        onClick={() => {
          download("JSON")
      //  alert.show('Your Json file Download will start soon!')
        }}

        //  startIcon={<DownloadIcon />}
      >
        Download JSON
      </Button></Grid>
      <br></br>
      <br></br>
    </Paper>
  );
};
const mapStateToProps: any = (state: any) => {
  return {
    tableData: state.abolitionData.tableData,
    columns: state.abolitionData.columns,
  };
};
export default connect(mapStateToProps, {
  setMapData,
  setTableData,
  setTimeLineData,
  setWordCloudData,
  setColumns,
})(ToolbarComponent);
