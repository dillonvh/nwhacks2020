import React from "react";
import CanvasJSReact from "./canvasjs.react";

export default function PieChart(props) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Emotion Distribution",
      fontFamily: "Calibri"
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          {
            y: ((100 * props.values.anger) / props.values.total).toFixed(2),
            label: "Anger"
          },
          {
            y: ((100 * props.values.joy) / props.values.total).toFixed(2),
            label: "Joy"
          },
          {
            y: ((100 * props.values.sorrow) / props.values.total).toFixed(2),
            label: "Sorrow"
          },
          {
            y: ((100 * props.values.surprise) / props.values.total).toFixed(2),
            label: "Surprise"
          }
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
  );
}
