import React from 'react';

import { Line } from '@reactchartjs/react-chart.js'

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const LineCharts = ({
  className,
}) => {
  return (
    <div className={className}>
      <Line data={data} options={{ maintainAspectRatio: false }}  />
    </div>
  );
};

export default LineCharts;
