import React, { useCallback, useEffect, useState } from 'react';
import { CustomButton } from '@atoms';
import Image from 'next/image';
import { Box } from '@mui/material';
import { csvIcon, xlsIcon } from '@icons';
import { REQUEST_STATUS } from '@constants';
import { apiGetRequest } from '@helpers';
import { CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';

const specficReportButtonData = [
  {
    imgSrc: xlsIcon,
    type: 'EXCEL',
  },
  {
    imgSrc: csvIcon,
    type: 'CSV',
  },
];

export const SpecficReportButton = ({}: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [downloadType, setDownloadType] = useState<string>('');
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);
  const [getResponseData, setGetResponseData] = useState<any>(null);
  const getUserApplicationData = useCallback(async () => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    try {
      const res: any = await apiGetRequest(
        `/reports/download?downloadType=${downloadType}`,
      );
      const { data, status } = res;
      switch (status) {
        case 200:
          setRequestStatusGet(REQUEST_STATUS.SUCCESS);
          setGetResponseData(data?.data);
          break;
        default:
          setRequestStatusGet(REQUEST_STATUS.FAILURE);
          break;
      }
    } catch (error) {
      setRequestStatusGet(REQUEST_STATUS.FAILURE);
    } finally {
      setRequestStatusGet(REQUEST_STATUS.IDEL);
    }
  }, [downloadType]);
  useEffect(() => {
    if (getResponseData !== null) {
      const link = document.createElement('a');
      link.href = getResponseData;
      document.body.appendChild(link);
      link.click();
      link?.parentNode?.removeChild(link);
      enqueueSnackbar('Downloading Started', {
        variant: 'success',
      });
    }
    setGetResponseData(null);
    setDownloadType('');
  }, [getResponseData]);
  useEffect(() => {
    downloadType && getUserApplicationData();
  }, [downloadType]);
  useEffect(() => {
    requestStatusGet === REQUEST_STATUS.FAILURE &&
      enqueueSnackbar('Something Went Wrong', {
        variant: 'error',
      });
  }, [requestStatusGet]);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        {specficReportButtonData.map((item) => (
          <CustomButton
            background="transparent"
            backgroundHover="transparent"
            type="button"
            padding="0px"
            onClick={() => setDownloadType(item.type)}
          >
            <Image src={item.imgSrc} alt={item.type} />
            {requestStatusGet === REQUEST_STATUS.LOADING &&
              downloadType === item.type && (
                <CircularProgress
                  size={25}
                  sx={{
                    color: 'common.white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
          </CustomButton>
        ))}
      </Box>
    </React.Fragment>
  );
};
