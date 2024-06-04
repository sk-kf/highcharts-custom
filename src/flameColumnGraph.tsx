import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { dataFlame } from "./data/dataFlame";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const FlameColumnGraph = () => {
  const navigate = useNavigate();
  const [optionsList, setOptionsList] = useState();

  HighchartsMore(Highcharts);

  (function (H) {
    H.seriesType(
      "flame",
      "columnrange",
      {
        grouping: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          inside: true,
          align: "center",
          crop: true,
          overflow: "none",
          color: "white",
          style: {
            fontSize: 16,
            textOutline: "none",
            fontWeight: "normal"
          }
        },
        point: {
          events: {
            click: function () {
              var point = this;
              setOptionsList(point.options);
              point.name === "Chief Information Officer" &&
                navigate("graph-details", {
                  state: { options: point.options }
                });
            }
          }
        },
        pointPadding: 0,
        groupPadding: 0
      },
      {
        drawDataLabels: H.seriesTypes.line.prototype.drawDataLabels
      }
    );
  })(Highcharts);

  const colors = [
    "#DADADA",
    "#303030",
    "#616161",
    "#000000",
    "#898989",
    "#282828",
    "#C8C8C8",
    "#F4F4F4",
  ];

  const [chartOptions] = useState({
    chart: {
      inverted: true,
      height: 700 //(9 / 16) * 100 + "%"
    },
    legend: {
      enabled: false
    },
    title: "",
    xAxis: {
      visible: true,
      reversed: false,
      tickWidth: 0,
      lineWidth: 0,
      labels: {
        enabled: true, // Ensure x-axis labels are visible
        formatter: function () {
          return Math.abs(this.value); // Display the absolute value of the x-axis label
        }
      }
    },
    yAxis: {
      visible: false,
      min: 0,
      max: 100
    },
    series: [
      {
        type: "flame",
        data: dataFlame.map(function (point, index) {
          return {
            ...point,
            color: colors[Math.floor(index % colors.length)]
          };
        })
      }
    ],
    tooltip: {
      headerFormat: "",
      pointFormat: "selfSize of <b>{point.name}</b> is <b>{point.value}</b>"
    }
  });
  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: optionsList ? "60%" : "100%" }}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          <div className="gradient-legend-container">
            <div className="linear-gradient-legend">
              <div className="gradient"></div>
              <div className="labels">
                <span>High</span>
                <span>Medium</span>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
        {optionsList && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "1px solid #d5d4d9",
              height: "100vh",
              width: "40%"
            }}
          >
            High chart data Content Widget
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <b>{optionsList?.id}</b>
              <b>{optionsList?.name}</b>
              <b>{optionsList?.value}</b>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FlameColumnGraph;
