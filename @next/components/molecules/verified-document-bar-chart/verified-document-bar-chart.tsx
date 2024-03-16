import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@mui/material';
import { DashboardCard } from '@molecules';
import { DashboardSwitch } from '@molecules';
import { VerifiedDocumentBarChartType } from './verified-document-bar-chart.types';
import { VerifiedDocumentBarChartOptions } from '@constants';
import { apiGetRequest } from '@helpers';
import { endpoints } from '@config';
import { useGetTableData } from '@hooks';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const VerifiedDocumentBarChart = ({
  name,
  onChangeSwitch,
  switchChart,
  startFrom,
  chartHeight = 433.15,
}: VerifiedDocumentBarChartType) => {
  const res = () => {
    return apiGetRequest(endpoints?.varifiedDocuments);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.varifiedDocuments,
      apiFunc: res,
    };
  }, []);

  const { data, isLoading, isFetching } = useGetTableData(querydata);

  const verifiedDocumentBarChartOption = useMemo(() => {
    return {
      switch: switchChart,
      options: VerifiedDocumentBarChartOptions(switchChart,data?.data?.monthly[4]?.monthLabels),
    };
  }, [switchChart,data?.data]);

  let index = verifiedDocumentBarChartOption?.switch?.toLocaleLowerCase() || '';

  const filterdSeriesDataFunc = (data: any) => {
    let lowerValue = 0.001;
    const modifiedArray = data?.map(({ name, data }: any) => {
      const filteredArr = data?.map((element: any) =>
        element === 0 ? lowerValue : element,
      );
      return { name: name, data: filteredArr };
    });
    return modifiedArray?.filter((item:any,index:any)=> index !== 4 ) || [{}];
  };

  let filterdSeriesData = filterdSeriesDataFunc(data?.data[index]);

  return (
    <DashboardCard
      heading={name}
      headingSibling={
        <DashboardSwitch
          startFrom={startFrom}
          onChangeSwitch={onChangeSwitch}
        />
      }
    >
      {(isLoading || isFetching) ? (
        <Skeleton variant="rounded" width="100%" height={chartHeight} />
      ) : (
        <Box
          sx={{
            overflowX: 'auto',
            overflowY: 'hidden',
            '&::-webkit-scrollbar': {
              width: '7px',
              cursor: 'pointer',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 5px grey',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#645CAA',
              borderRadius: '10px',
            },
          }}
          className="verified-document"
        >
          <Chart
            series={filterdSeriesData}
            height={chartHeight}
            options={verifiedDocumentBarChartOption?.options || {}}
            type="bar"
          />
        </Box>
      )}
    </DashboardCard>
  );
};
