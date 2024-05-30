import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { data } from './data/highcharts';
import './styles.css';

HighchartsMore(Highcharts);

(function (H) {
  H.seriesType(
    'flame',
    'columnrange',
    {
      cursor: 'pointer',
      colorAxis: {
        minColor: '#FFFFFF',
        maxColor: '#000000',
      },
      colorByPoint: true,
      style: {
        textOutline: 'none',
        fontWeight: 'normal',
      },
      dataLabels: {
        enabled: function () {
          console.log(this);
          // Display data labels only if the value is greater than a specific number
          return this.y > 300000; // Adjust 50 to your desired threshold value
        },
        format: '{point.name}',
        inside: true,
        align: 'center',
        crop: true,
        overflow: 'none',
        style: {
          textOutline: 'none',
          fontWeight: 'normal',
        },
      },
      point: {
        events: {
          click: function () {
            var point = this;
            console.log(
              'Clicked on',
              point.name,
              'with value',
              point.value,
              'and id',
              point.id
            );
          },
        },
      },
      pointPadding: 0.1,
      groupPadding: 0.1,
      pointWidth: 70, // Increased bar height
    },
    {
      drawDataLabels: H.seriesTypes.columnrange.prototype.drawDataLabels,
    }
  );
})(Highcharts);

function calculateGradientColor(value, min, max) {
  // Normalize the value within the range
  var normalizedValue = (value - min) / (max - min);

  // Invert the normalized value for the white to black gradient
  var invertedValue = 1 - normalizedValue;
  // Convert the normalized value to a grayscale color
  var grayscaleValue = Math.round(invertedValue * 255);
  var color =
    'rgb(' + grayscaleValue + ',' + grayscaleValue + ',' + grayscaleValue + ')';
  return color;
}

const FlameGraph = () => {
  const [chartOptions] = useState({
    chart: {
      inverted: true,
    },
    legend: {
      enabled: false,
    },
    colorAxis: {
      min: 0,
      max: 397316, // Assuming 397316 is the maximum value
      stops: [
        [0, 'white'], // Start color
        [1, 'black'], // End color
      ],
      labels: {
        format: '{value}',
      },
      title: {
        text: 'Legend Title',
      },
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1,
      },
    },
    title: {
      align: 'left',
      text: 'Flame chart (layout: flame)',
    },
    subtitle: {
      align: 'left',
      text: 'Highcharts chart rendering process',
    },
    xAxis: [
      {
        visible: true,
        min: 1, // Set the minimum value of the x-axis to 1
        minRange: 1, // Ensure a minimum range that accommodates the starting point
        tickInterval: 1,
        type: 'category',
        categories: [...new Set(data.map((point) => point.x))].map(
          (_, index) => index + 1
        ),
        // transform the keys to an array of positive integers starting from ,
        lineWidth: 0,
        startOnTick: true, // Ensure x-axis starts on a tick
        endOnTick: true,
        tickWidth: 0, // Hide x-axis ticks
        labels: {
          enabled: true, // Ensure x-axis labels are visible
        },
      },
      {
        visible: true,
        reversed: false,
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0,
        tickInterval: 1,
        categories: [...new Set(data.map((point) => point.x))].map(
          (_, index) => index + 1
        ),
        lineWidth: 0,
        tickWidth: 0, // Hide x-axis ticks
        labels: {
          enabled: true, // Ensure x-axis labels are visible
        },
      },
    ],
    yAxis: [
      {
        visible: false,
      },
      {
        visible: false,
        min: 0,
        maxPadding: 0,
        startOnTick: false,
        endOnTick: false,
      },
    ],
    series: [
      {
        type: 'flame',
        data: data.map(function (point) {
          return {
            name: point.name,
            id: point.id,
            value: point.value,
            x: point.x,
            low: point.low,
            high: point.high,
            color: calculateGradientColor(point.value, 0, 397316), // Assuming 0 is min and 100 is max value
            dataLabels: {
              enabled: point.high - point.low > 30000, // Display data labels only if value is greater than 300000
              format: '{point.name}',
              inside: true,
              align: 'center',
              crop: true,
              overflow: 'none',
              style: {
                textOutline: 'none',
                fontWeight: 'normal',
              },
            },
          };
        }),
        yAxis: 1,
        xAxis: 1,
        minPointLength: 2,
        min: 1,
      },
    ],
    tooltip: {
      headerFormat: '',
      pointFormat: 'selfSize of <b>{point.name}</b> is <b>{point.value}</b>',
    },
  });

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        <div className='gradient-legend-container'>
          <div className='linear-gradient-legend'>
            <div className='gradient'></div>
            <div className='labels'>
              <span>High</span>
              <span>Medium</span>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlameGraph;
