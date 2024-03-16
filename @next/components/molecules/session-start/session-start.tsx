import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { CustomButton } from '@atoms';
import { endpoints } from '@config';
import { useSnackbar } from 'notistack';
import router, { useRouter } from 'next/router';
import { apiGetRequest, apiPatchRequest } from '@helpers';
import { REQUEST_STATUS } from '@constants';
import { SessionStartData } from '@constants';
import { useAppDispatch } from '@hooks';
import { verificationAction } from '@store';

export const SessionStartMol = ({ startSession, browserName, osName }: any) => {
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [requestStatus, setRequestStatus] = useState<any>(REQUEST_STATUS.IDEL);
  const [responseData, setResponseData] = useState<any>({});

  // get Data of Current user  using Link Code
  const getDataUsingLinkCode = useCallback(async () => {
    try {
      const res: any = await apiGetRequest(
        `${endpoints?.verificationLinkCode}/${query?.keyword}`,
      );
      const { data, status } = res;
      switch (status) {
        case 200:
          dispatch(verificationAction.getVerificationData(data?.data));
          startSession(data?.data?.status === 'Started');
          setResponseData(data?.data);
          break;
      }
    } catch (error) {}
  }, [query.keyword]);

  useEffect(() => {
    if (router?.isReady) {
      getDataUsingLinkCode();
    }
  }, [query?.keyword]);
  // get Data of Current user  using Link Code

  //api Call to Start Session on Button Click
  const sessionStartHandler = async () => {
    const payload = {
      verificationId: responseData?._id,
      userAgent: `${browserName} @ ${osName} @ Pak`,
      platform: 'Web-React-JS',
    };
    try {
      setRequestStatus(REQUEST_STATUS.LOADING);
      const res: any = await apiPatchRequest(
        `${endpoints?.startVerification}/${responseData?._id}`,
        payload,
      );
      const { data, status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          // dispatch(verificationAction.getVerificationData(data?.data));
          startSession(true);
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          break;
      }
    } catch (error: any) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
      enqueueSnackbar(error, {
        variant: 'error',
      });
    }
  };
  //api Call to Start Session on Button Click

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', px: { xs: 1, lg: 0 } }}
    >
      <Box>
        <Typography
          sx={{
            color: 'primary.dark',
            fontSize: '24px',
            fontWeight: 500,
            textAlign: 'center',
            py: { xs: 1, md: 8 },
          }}
        >
          Let’s get you Verified
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'primary.dark',
            textAlign: 'center',
            py: { xs: 1, md: 5 },
          }}
        >
          Before you start
        </Typography>
        {SessionStartData?.map((item) => (
          <Box
            key={item?.name}
            sx={{ display: 'flex', alignItems: 'center', py: 2 }}
          >
            <Image
              src={item?.icon}
              alt=""
              style={{ width: '24px', height: '24px' }}
            />
            <Typography
              variant="h4"
              sx={{
                lineHeight: 1.9,
                pl: 1,
                color: 'primary.light',
              }}
            >
              {item?.name}
            </Typography>
          </Box>
        ))}
        <Box sx={{ textAlign: 'center', pt: 10, px: 1 }}>
          <CustomButton
            maxWidth="330px"
            padding="10px"
            onClick={sessionStartHandler}
            loading={requestStatus === REQUEST_STATUS?.LOADING}
          >
            <Typography
              variant="h6"
              sx={{
                transition: 'all .2s ease-in-out',
                display: 'flex',
                fontWeight: 400,
              }}
            >
              Start Session
            </Typography>
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};
