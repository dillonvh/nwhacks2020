import React from "react";
import CanvasJSReact from "./canvasjs.react";

const moment = require("moment");

export default function Chart(props) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const endTimestampMoment = moment(props.endTimestamp);
  const startTimestampMoment = moment(props.startTimestamp);
  const timeDiffInSeconds = endTimestampMoment.diff(
    startTimestampMoment,
    "seconds"
  );

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Emotions over Time for this session"
    },
    axisY: {
      title: "Likeliness of certain emotions",
      includeZero: false,
      suffix: "%"
    },
    axisX: {
      title: "Time",
      interval: 10, // timeDiffInSeconds / 10, // TODO: figure this interval out
      suffix: "s"
    },
    data: [
      {
        type: "line",
        toolTipContent: "Time {x}s: {y}% Angry", // TODO: Proper timestamp intervals: hours if it makes sense, or minutes
        dataPoints: props.dataPointsAnger
      },
      {
        type: "line",
        toolTipContent: "Time {x}s: {y}% Joyous",
        dataPoints: props.dataPointsJoy
      },
      {
        type: "line",
        toolTipContent: "Time {x}s: {y}% Sad",
        dataPoints: props.dataPointsSorrow
      },
      {
        type: "line",
        toolTipContent: "Time {x}s: {y}% Surprised",
        dataPoints: props.dataPointsSurprise
      }
    ]
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
