import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import cloneDeep from "lodash.clonedeep";

export default function App() {
  const DEFAULT_OPTION = {
    // add for title and subtitle
    title: {
      text: "Title",
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
      name: "time",
      data: (function () {
        let now = new Date();
        let res = [];
        let len = 7;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
        }
        return res;
      })(),
    },
    //   This is responsible for y-axis plot
    yAxis: {
      type: "value",
      name: "value",
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
  };
  const [option, setOption] = useState(DEFAULT_OPTION);

  function fetchNewData() {
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
    const newOption = cloneDeep(option); // as constant
    newOption.title.text = "Hello Echarts-for-react." + new Date().getSeconds();
    const data0 = newOption.series[0].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    newOption.xAxis.data.shift();
    newOption.xAxis.data.push(axisData);
    setOption(newOption);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNewData();
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div>
      <ReactEcharts
        // we can add a state to do all the stuff in case of dynamic chart
        option={option}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
