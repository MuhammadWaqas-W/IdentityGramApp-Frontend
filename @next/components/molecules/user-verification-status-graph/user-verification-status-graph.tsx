import React, { useEffect, useMemo, useState } from 'react';
import { PrimaryCardAtom } from '@atoms';
import { Box, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from 'apexcharts';
import { useGetTableData } from '@hooks';
import { VerificationStatusGraphData } from '@constants';

export const UserVerificationStatusGraph = () => {
  const [documentValue, setDocumentValue] = useState<any>([]);
  const getUserGraphData = () => {
    return apiGetRequest(endpoints?.verificationCounts);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.verificationCounts,
      apiFunc: getUserGraphData,
    };
  }, []);
  const { data, isError, isSuccess, isLoading, isFetching } =
    useGetTableData(querydata);
  let arrr: any = [];
  useEffect(() => {
    if (typeof data?.data?.data === 'object' && data?.data?.data !== null) {
      arrr.push(data?.data?.data['Declined'] ?? 0.5);
      arrr.push(data?.data?.data['Approved'] ?? 0.5);
      arrr.push(data?.data?.data['Submitted'] ?? 0.5);
      setDocumentValue([...arrr]);
    }
  }, [data?.data?.data]);
  const series = [
    {
      // name: 'Approved',
      type: 'column',
      data: documentValue,
    },
    {
      // name: 'Total Value',
      type: 'line',
      data: documentValue,
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.6,
        opacityTo: 0.8,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '25',
        dataLabels: {
          position: 'top', // top, center, bottom
        },
        distributed: true,
      },
    },
    xaxis: {
      categories: ['Declined', 'Approved', 'Submitted'],
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      fixed: {
        position: 'top',
      },
      // enabled: false,
      theme: 'dark',
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (value: any) {
            return value;
          },
        },
      },
    },
    colors: [
      function (value: any) {
        if (value.value === data?.data?.data['Declined'] ?? 0) {
          return '#FF624E';
        }
        if (value.value === data?.data?.data['Approved'] ?? 0) {
          return '#0BAB52';
        }
        if (value.value === data?.data?.data['Submitted'] ?? 0) {
          return '#BFACE0';
        } else {
          return '#FF624E';
        }
      },
    ],
    // ['#FF624E', '#0BAB52', '#BFACE0']
  };
  return (
    <React.Fragment>
      <Grid container>
        <PrimaryCardAtom
          xs={12}
          StyleObject={{
            p: 2,
            height: '330px',
            backgroundColor: '#ffffff',
            border: '0.787575px solid #E8E8EC',
            borderRadius: '9.4509px',
          }}
        >
          <Typography variant="h3" sx={{ color: 'primary.dark' }}>
            Verification Status
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Box>
                <ApexCharts options={options} series={series} type="line" />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {VerificationStatusGraphData.map((item) => {
                return (
                  <Box key={item.id}>
                    <Typography
                      sx={{
                        color: `${item.color}`,
                        margin: '4px 0',
                        fontSize: '19px',
                        fontWeight: 500,
                      }}
                    >
                      {data?.data?.data[item.type] ?? 0}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: 'primary.light',
                        margin: '4px 0',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </PrimaryCardAtom>
      </Grid>
    </React.Fragment>
  );
};
