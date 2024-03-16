import { Table, TableCell, TableHead, TableRow, Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { apisCatalougeTableSX, REQUEST_STATUS } from '@constants';
import { useAppSelector } from '@hooks';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { DashboardCard } from '../dashboard-card';
import { NoContentFound } from '../no-content-found';
import { ApisTableLoader } from '../apis-table-loader';
import { nanoid } from '@reduxjs/toolkit';

export const ApiCatalogue = () => {
  const [apiPerformanceSummaryState, setApiPerformanceSummaryState] =
    useState<any>([]);
  const apiPerformanceSummaryData = useMemo(() => {
    return {
      data: apiPerformanceSummaryState,
    };
  }, [apiPerformanceSummaryState]);
  const { apisData, status } = useAppSelector((store) => store.apis);
  useEffect(() => {
    const tempcountAndGraphData = apisData?.latestApis;
    setApiPerformanceSummaryState(tempcountAndGraphData);
  }, [apisData]);
  return (
    <DashboardCard>
      <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
        {status === REQUEST_STATUS.LOADING &&
        !apiPerformanceSummaryData?.data?.length ? (
          <ApisTableLoader />
        ) : apiPerformanceSummaryData?.data?.length ? (
          <Table sx={apisCatalougeTableSX} aria-label="simple table">
            <TableHead>
              <TableRow>
                {['API Name', 'API Service', 'product title'].map((item) => (
                  <TableCell key={item} align="left">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <Flipper
              className="MuiTableBody-root"
              staggerConfig={{ default: { speed: 0.9 } }}
              element={'tbody'}
              flipKey={apiPerformanceSummaryState}
            >
              {apiPerformanceSummaryState.map((row: any) => (
                <Flipped key={row._id} flipId={row._id}>
                  <TableRow key={row._id}>
                    {[
                      { title: row?.apiName, sx: {} },
                      {
                        title: row?.apiUrl,
                        sx: {
                          color:
                            row?.status === 'Success'
                              ? '#0A8D44 !important'
                              : '#FF624E !important',
                        },
                      },
                      { title: row?.company?.title, sx: { fontSize: '15px' } },
                    ].map((item) => (
                      <TableCell key={nanoid()} sx={item.sx} align="left">
                        {item.title ?? '-'}
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
