import React from 'react';
import CanvasJSReact from "./canvasjs.react";

const likelinessValueScaleMap = {
  "VERY_UNLIKELY": 0,
  "UNLIKELY": 0.2,
  "POSSIBLE": 0.4,
  "LIKELY": 0.6,
  "VERY LIKELY": 0.8
};

export default function Chart(props) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Emotions over Time for this session"
    },
    axisY: {
      title: "Likeliness of certain emotions",
      // includeZero: false,
      // suffix: "%"
    },
    axisX: {
      title: "Time",
      // prefix: "W",
      interval: 2 // TODO: figure this out
    },
    data: [
      {
        type: "line",
        toolTipContent: "Week {x}: {y}%",
        dataPoints: [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 64 },
          { x: 4, y: 62 },
          { x: 5, y: 64 },
          { x: 6, y: 60 },
          { x: 7, y: 58 },
          { x: 8, y: 59 },
          { x: 9, y: 53 },
          { x: 10, y: 54 },
          { x: 11, y: 61 },
          { x: 12, y: 60 },
          { x: 13, y: 55 },
          { x: 14, y: 60 },
          { x: 15, y: 56 },
          { x: 16, y: 60 },
          { x: 17, y: 59.5 },
          { x: 18, y: 63 },
          { x: 19, y: 58 },
          { x: 20, y: 54 },
          { x: 21, y: 59 },
          { x: 22, y: 64 },
          { x: 23, y: 59 }
        ]
      },
      {
        type: "line",
        toolTipContent: "Week {x}: {y}%",
        dataPoints: [
          { x: 1, y: 4 },
          { x: 2, y: 6 },
          { x: 3, y: 6 },
          { x: 4, y: 6 },
          { x: 5, y: 6 },
          { x: 6, y: 6 },
          { x: 7, y: 5 },
          { x: 8, y: 5 },
          { x: 9, y: 5 },
          { x: 10, y: 4 },
          { x: 11, y: 1 },
          { x: 12, y: 0 },
          { x: 13, y: 5 },
          { x: 14, y: 6 },
          { x: 15, y: 5 },
          { x: 16, y: 6 },
          { x: 17, y: 5 },
          { x: 18, y: 6 },
          { x: 19, y: 5 },
          { x: 20, y: 5 },
          { x: 21, y: 5 },
          { x: 22, y: 6 },
          { x: 23, y: 5 }
        ]
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
  )
}