import React, { useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PrimaryCardAtom } from '@atoms';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { useGetTableData } from '@hooks';
import { VerificationList } from '@constants';

export const VerificationDataMolecule = () => {
  const router = useRouter();
  const res = () => {
    return apiGetRequest(endpoints?.verificationCount, null);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.verificationCount,
      apiFunc: res,
    };
  }, []);

  const { data, isError, isSuccess, isLoading, isFetching } =
    useGetTableData(querydata);

  return (
    <React.Fragment>
      <Grid container spacing={5} justifyContent={'center'}>
        {VerificationList.map((item) => {
          return (
            <Grid key={item.id} item xs={12} lg={4} md={6}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  router.push({
                    pathname: '/app/verifications',
                    query: { keyword: item.imgAlt },
                  });
                }}
              >
                <PrimaryCardAtom
                  xs={12}
                  StyleObject={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 0,
                    // minWidth: '240px',
                    minHeight: '140px',
                    borderRadius: '12px',
                  }}
                >
                  <Box>
                    <Image
                      src={item.logoIcon}
                      alt={item.imgAlt}
                      priority={true}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h3"
                      sx={{ color: `primary.light`, fontWeight: 600 }}
                    >
                      {data?.data?.data[item.type] ?? '0'}
                    </Typography>
                    <Typography variant="h4" sx={{ color: `primary.light` }}>
                      {item.name}
                    </Typography>
                  </Box>
                </PrimaryCardAtom>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
