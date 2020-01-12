import React from "react";
import CanvasJSReact from "./canvasjs.react";

const moment = require("moment");

export default function SoloChart(props) {
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
      text: props.titles.main
    },
    axisY: {
      title: props.titles.y,
      includeZero: false,
      suffix: "%"
    },
    axisX: {
      title: props.titles.x,
      interval: 10, // timeDiffInSeconds / 10, // TODO: figure this interval out
      suffix: "s"
    },
    data: [
      {
        type: "line",
        toolTipContent: props.titles.tooltip, // TODO: Proper timestamp intervals: hours if it makes sense, or minutes
        dataPoints: props.dataPoints
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
