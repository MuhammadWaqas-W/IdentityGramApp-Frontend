import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { apiGetRequest } from '@helpers';
import { awsBaseUrl, endpoints } from '@config';
import { useGetTableData } from '@hooks';
import { RegisterProductsSwiperProps } from '@constants';

export const RegisterProductsMolecule = () => {
  const [registerProducts, setRegisterProducts] = useState<any>([]);
  const res = () => {
    return apiGetRequest(endpoints?.registeredProducts);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.registeredProducts,
      apiFunc: res,
    };
  }, []);
  const { data, isError, isSuccess, isLoading } = useGetTableData(querydata);
  useEffect(() => {
    if (typeof data?.data?.data === 'object' && data?.data?.data !== null) {
      const tempArr = data?.data?.data;
      setRegisterProducts(tempArr);
    }
  }, [data?.data?.data]);
  return (
    <React.Fragment>
      <Grid container>
        {isLoading && (
          <Swiper {...RegisterProductsSwiperProps}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item: any) => {
              return (
                <Grid key={item} item xl={1.7} lg={2} md={3} sm={4} xs={12}>
                  <SwiperSlide key={item}>
                    <Skeleton variant="rounded" width="226px" height="128px" />
                  </SwiperSlide>
                </Grid>
              );
            })}
          </Swiper>
        )}
        {isSuccess && (
          <Swiper loopedSlides={20} {...RegisterProductsSwiperProps}>
            {registerProducts.map((item: any) => {
              return (
                <Grid key={item._id} item xl={1.7} lg={2} md={3} sm={4} xs={12}>
                  <SwiperSlide key={item._id}>
                    {
                      <Link
                        href="/app/reports"
                        passHref
                        style={{ textDecoration: 'none' }}
                      >
                        <Box
                          key={item._id}
                          sx={{
                            px: 3.9,
                            py: 4.2,
                            background: `${item.bgColor}`,
                            borderRadius: 4,
                          }}
                        >
                          <Box
                            sx={{ width: '59px', height: '35px', mb: '6px' }}
                          >
                            <Image
                              width={59}
                              height={35}
                              src={awsBaseUrl + item.logo}
                              alt={item.title}
                            />
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              color: `${item.color}`,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                      </Link>
                    }
                    {isError && <>Something went wrong</>}
                  </SwiperSlide>
                </Grid>
              );
            })}
          </Swiper>
        )}
      </Grid>
    </React.Fragment>
  );
};
