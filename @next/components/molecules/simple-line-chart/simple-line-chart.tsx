import React from 'react';
import dynamic from 'next/dynamic';
import { SimpleLineChartOptions } from '@next/constants/chart-options/chart-options';
import { SimpleLineChartTypes } from './simple-line-chart.types';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const SimpleLineChart = ({
  color,
  name,
  data,
  max,
}: SimpleLineChartTypes) => {
  const series = [
    {
      name: name,
      data: data,
    },
  ];
  return (
    <Chart
      series={series}
      options={SimpleLineChartOptions(color!, max)}
      type="line"
      height={95}
    />
  );
};
