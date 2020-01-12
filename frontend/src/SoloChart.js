import React from "react";
import CanvasJSReact from "./canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SoloChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: this.props.titles.main,
        fontFamily: "optima",
        fontWeight: "normal",
        fontColor: "black",
        fontSize: 28
      },
      axisY: {
        title: this.props.titles.y,
        titleFontSize: 18,
        includeZero: false,
        suffix: "%",
        minimum: 0,
        maximum: 100
      },
      axisX: {
        title: this.props.titles.x,
        titleFontSize: 18,
        interval: 10, // timeDiffInSeconds / 10, // TODO: figure this interval out
        suffix: "s",
        minimum: 0
      },
      data: [
        {
          type: "line",
          toolTipContent: "Time {x}s: {y}% Eye Level", // TODO: Proper timestamp intervals: hours if it makes sense, or minutes
          dataPoints: this.props.dataPoints
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
}

export default SoloChart;
