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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { connect } from "react-redux";
import {
  setColumns,
  setMapData,
  setTableData,
  setTimeLineData,
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
    setSliderValue(newValue);
  };
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
    <Paper style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" component="div" style={{ marginBottom: "10px" }}>
        ToolBar
      </Typography>
      <Grid container xs={12} justify="center" alignItems="center">
        <Grid item xs={4}>
          <Typography id="range-slider" gutterBottom>
            Date Range
          </Typography>
        </Grid>{" "}
        <Grid item xs={8}>
          <TextField
            label="Start Date"
            id="filled-size-small1"
            variant="filled"
            size="small"
            value={sliderValue[0]}
            style={{ width: "80px" }}
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
            style={{ width: "80px" }}
            onChange={(newValue) => {
              handleDateChange(sliderValue[0], newValue.currentTarget.value);
            }}
          />
        </Grid>
      </Grid>
      <Slider
        style={{ width: "120px" }}
        value={sliderValue}
        step={10}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        marks={marks}
        min={1816}
        max={1900}
      />{" "}
      <Button onClick={applyDateChange} variant="contained" color="primary">
        Apply Date Change
      </Button>
      <Typography gutterBottom>Number of Results:</Typography>
      <Typography variant="h5" component="div">
        {props.tableData.length}
      </Typography>
      <br></br>
      <Button
        variant="outlined"
        onClick={() => {
          download("CSV");
        }}
        // startIcon={<DownloadIcon />}
      >
        Download CSV
      </Button>
      <br></br> <br></br>
      <Button
        variant="outlined"
        onClick={() => {
          download("JSON");
        }}
        //  startIcon={<DownloadIcon />}
      >
        Download JSON
      </Button>
      <br></br>
      <br></br>
      <Accordion
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
        }}
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
      </Accordion>{" "}
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
  setColumns,
})(ToolbarComponent);
