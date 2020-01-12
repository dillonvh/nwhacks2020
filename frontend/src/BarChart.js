import React from "react";
import CanvasJSReact from "./canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: this.props.titles.main
			},
			axisX: {
				title: this.props.titles.x,
				reversed: true,
			},
			axisY: {
				title: this.props.titles.y,
			},
			data: [{
				type: "bar",
				dataPoints: this.props.dataPoints
			}]
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

export default BarChart;