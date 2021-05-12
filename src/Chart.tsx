import ReactEcharts from "echarts-for-react";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [getOption, setGetOption] = useState({
    // add for title and subtitle
    title: {
      text: "Price",
      subtext: "subtitle",
    },
    //   Added for showing data when hover on chart
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#FF5733",
        },
      },
    },
    //   This is added to add the function of download and print chart
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    //   This is responsible for x-axis plot
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    //   This is responsible for y-axis plot
    yAxis: {
      type: "value",
    },
    //   This is data and the chart type
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "bar",
      },
    ],
    //   this can add data zoom functionality
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
  });

  setInterval(function () {
    setGetOption((prevData) => {
      const newValue = Math.round(Math.random() * 100);
      const data = getOption.series[0].data;
      data.shift();
      data.push(newValue);
      return { ...prevData, series: [{ data, type: "bar" }] };
    });
  }, 100);
  return (
    <div>
      <ReactEcharts
        // we can add a state to do all the stuff in case of dynamic chart
        option={getOption}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
