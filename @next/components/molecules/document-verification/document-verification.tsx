import React, { useEffect, useMemo, useState } from 'react';
import { PrimaryCardAtom } from '@atoms';
import { Box, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from 'apexcharts';
import { apiGetRequest } from '@helpers';
import { endpoints } from '@config';
import { useGetTableData } from '@hooks';

export const DocumentVerificationMolecule = () => {
  const [documentValue, setDocumentValue] = useState<any>([]);
  const [formatValue, setFormatValue] = useState<Number>();
  const res = () => {
    return apiGetRequest(endpoints?.verificationDocCount);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.verificationDocCount,
      apiFunc: res,
    };
  }, []);

  const { data, isError, isSuccess, isLoading, isFetching } =
    useGetTableData(querydata);
  let arr: any = [];
  useEffect(() => {
    if (typeof data?.data?.data === 'object' && data?.data?.data !== null) {
      const tempObj = data?.data?.data;
      arr = [
        tempObj.Passport ?? 0,
        tempObj.DrivingLicense ?? 0,
        tempObj.ResidentPermit ?? 0,
        tempObj.ProofOfAddress ?? 0,
      ];
      setDocumentValue([...arr]);
      setFormatValue(
        arr
          .reduce((a: any, b: any) => {
            return a + b;
          }, 0)
          .toLocaleString(),
      );
    }
  }, [data?.data?.data]);
  const series = formatValue != 0 ? documentValue : [1];

  const options: ApexOptions = {
    chart: {
      width: 100,
      height: 100,
      type: 'donut',
    },
    labels: [
      'Passport',
      'Driving License',
      'Resident Permit',
      'Proof Of Address',
    ],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '18px',
              fontWeight: 700,
              color: 'primary.light',
            },
            total: {
              show: true,
              label: 'Total Verifications',
              color: '#4E4B66',
              fontSize: '15px',
              fontWeight: 700,
              formatter: function (w) {
                return formatValue != 0
                  ? w.globals.seriesTotals
                      .reduce((a: any, b: any) => {
                        return a + b;
                      }, 0)
                      .toLocaleString()
                  : 0;
              },
            },
            value: {
              show: true,
              fontSize: '12px',
              color: '#4E4B66',
              formatter: function (value: any) {
                return value;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          chart: {
            width: 320,
            height: 320,
          },
          legend: {
            show: true,
            position: 'bottom',
            fontSize: '10px',
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: 10,
      fontSize: '16px',
      itemMargin: {
        vertical: 12,
      },
      markers: {
        width: 13,
        height: 13,
        radius: 0,
        offsetX: 0,
        offsetY: 0,
        fillColors: ['#FDAA11', '#645CAA', '#BFACE0', '#A084CA'],
        strokeColor: '#fff',
        strokeWidth: 0,
      },
      labels: {
        colors: [
          'primary.light',
          'primary.light',
          'primary.light',
          'primary.light',
        ],
      },
    },
    colors:
      formatValue != 0
        ? ['#FDAA11', '#645CAA', '#BFACE0', '#A084CA']
        : ['#f0f0f0'],
  };
  return (
    <React.Fragment>
      <Grid container>
        <PrimaryCardAtom
          xs={12}
          StyleObject={{ borderRadius: '12px', maxHeight: '380px' }}
        >
          <Typography variant="h3" sx={{ color: 'primary.light' }}>
            Document Verification
          </Typography>
          <Typography variant="h4" sx={{ color: 'primary.light' }}>
            Documents verified
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <ApexCharts
              options={options}
              series={series}
              type="donut"
              height={520}
              width={450}
            />
          </Box>
        </PrimaryCardAtom>
      </Grid>
    </React.Fragment>
  );
};
