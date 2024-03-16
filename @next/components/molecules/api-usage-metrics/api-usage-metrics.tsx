import { useEffect, useMemo, useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { DashboardCard } from '../dashboard-card';
import { Box, TableRow, Table, TableHead, TableCell } from '@mui/material';
import { useAppSelector } from '@hooks';
import { NoContentFound } from '../no-content-found';
import { apisTableLoaderSX, REQUEST_STATUS } from '@constants';
import { ApisTableLoader } from '../apis-table-loader';

export const ApiUsageMetrics = () => {
  const { apisData, status } = useAppSelector((store) => store.apis);
  const [ApiUsageMetricsState, setApiUsageMetricsState] = useState<any>([]);
  const apiUsageMetricsData = useMemo(() => {
    return {
      data: ApiUsageMetricsState,
    };
  }, [ApiUsageMetricsState]);
  useEffect(() => {
    const tempcountAndGraphData = apisData?.apiCountByCompanies;
    setApiUsageMetricsState(tempcountAndGraphData);
  }, [apisData]);
  return (
    <DashboardCard>
      <Box sx={{ minHeight: '450px' }}>
        {status === REQUEST_STATUS.LOADING &&
        !apiUsageMetricsData.data?.length ? (
          <ApisTableLoader />
        ) : apiUsageMetricsData.data?.length ? (
          <Table sx={apisTableLoaderSX} aria-label="simple table">
            <TableHead>
              <TableRow>
                {['Product Title', 'Success Count', 'Fail Hits'].map(
                  (item: string, i: number) => (
                    <TableCell key={item} align={i !== 0 ? 'center' : 'left'}>
                      {item}
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <Flipper
              element={'tbody'}
              staggerConfig={{ default: { speed: 0.9 } }}
              flipKey={ApiUsageMetricsState}
            >
              {ApiUsageMetricsState.map((row: any) => (
                <Flipped key={row?._id} flipId={row?._id}>
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row?.company?.title ?? '-'}
                    </TableCell>
                    {[
                      row?.apis[0]?.status === 'Success'
                        ? row?.apis[0]
                        : row?.apis[1],
                      row?.apis[0]?.status === 'Failed'
                        ? row?.apis[0]
                        : row?.apis[1],
                    ].map((item: any) => (
                      <TableCell
                        key={item?.status}
                        align="center"
                        sx={{
                          color:
                            item?.status === 'Success'
                              ? '#0A8D44 !important'
                              : '#FF0000  !important',
                        }}
                      >
                        {item?.count ?? '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                </Flipped>
              ))}
            </Flipper>
          </Table>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '450px',
              width: '100%',
            }}
          >
            <NoContentFound />
          </Box>
        )}
      </Box>
    </DashboardCard>
  );
};
