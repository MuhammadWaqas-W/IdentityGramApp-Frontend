import React, { useEffect, useMemo, useState } from 'react';
import { PrimaryCardAtom } from '@atoms';
import { Box, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from 'apexcharts';
import { useGetTableData } from '@hooks';
import { VerificationStatusList } from '@constants';

export const VerificationStatusMolecule = () => {
  const [documentValue, setDocumentValue] = useState<any>([]);

  const res = () => {
    return apiGetRequest(endpoints?.verificationCount);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.verificationCount,
      apiFunc: res,
    };
  }, []);

  const { data, isError, isSuccess, isLoading, isFetching } =
    useGetTableData(querydata);
  let arrr: any = [];
  useEffect(() => {
    if (typeof data?.data?.data === 'object' && data?.data?.data !== null) {
      arrr.push(data?.data?.data['Declined'] ?? 0.5);
      arrr.push(data?.data?.data['Approved'] ?? 0.5);
      arrr.push(data?.data?.data['NotStarted'] ?? 0.5);
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
      categories: ['Declined', 'Approved', 'Not Started'],
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
        if (value.value === data?.data?.data['NotStarted'] ?? 0) {
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
      <Grid container mt={2}>
        <PrimaryCardAtom xs={12} StyleObject={{ borderRadius: '12px' }}>
          <Typography variant="h3" sx={{ color: 'primary.light' }}>
            Verification Status
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <ApexCharts
                options={options}
                series={series}
                type="line"
                height={250}
                width={280}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {VerificationStatusList.map((item) => {
                return (
                  <Box key={item.id}>
                    <Typography
                      variant="h3"
                      sx={{
                        color: `${item.color}`,
                      }}
                    >
                      {data?.data?.data[item.type] ?? '0'}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'primary.light',
                        fontSize: '16px',
                        mr: 0.5,
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
