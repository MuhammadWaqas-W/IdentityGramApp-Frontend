import React, { useCallback, useEffect, useState } from 'react';
import { VerificationDetailHeader } from '@molecules';
import { Box, Skeleton, Grid } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TabPanel from '@mui/lab/TabPanel';
import { VerificationDetailAttempts } from '@molecules';
import { VerfificationDetailWebhooks } from '@molecules';
import { REQUEST_STATUS } from '@constants';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { useRouter } from 'next/router';

export const VerificationsDetailOrg = () => {
  const [value, setValue] = React.useState('1');
  const [responseData, setResponseData] = React.useState<any>({});
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);
  const router = useRouter();

  const getDataUsingLinkCode = useCallback(async () => {
    if (router.isReady) {
      setRequestStatusGet(REQUEST_STATUS.LOADING);
      try {
        const res: any = await apiGetRequest(
          `${endpoints?.veiwVerificationDetail}/${router.query.keyword}`,
        );
        const { data, status } = res;
        switch (status) {
          case 200:
            setRequestStatusGet(REQUEST_STATUS.SUCCESS);
            setResponseData(data?.data);
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
    }
  }, [router.query.keyword]);
  useEffect(() => {
    getDataUsingLinkCode();
  }, [router.query.keyword]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleExportPdf = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pdfContent = document.getElementById('pdf-content');
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (pdfContent) {
      const canvas = await html2canvas(pdfContent, {
        scrollY: -window.scrollY,
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
      });
      const imgData = canvas.toDataURL('image/png');

      doc.addImage(imgData, 'PNG', 10, 10, 190, 180);
      doc.save('mypdf.pdf');
    }
  };
  if (requestStatusGet === 'loading')
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Skeleton animation="wave" height={200} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton animation="wave" height={200} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton animation="wave" height={100} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton animation="wave" height={150} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton animation="wave" height={150} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton animation="wave" height={150} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton animation="wave" height={150} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton animation="wave" height={70} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton animation="wave" height={70} />
          </Grid>
        </Grid>
      </>
    );

  return (
    <Box id="pdf-content" sx={{ pt: 1 }}>
      <VerificationDetailHeader
        handleExportPdf={handleExportPdf}
        responseData={responseData}
      />
      <Box sx={{ width: '100%', typography: 'body1', mt: 5 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Attempts"
                value="1"
                sx={{ fontSize: '16px', fontWeight: 500 }}
              />
              <Tab
                label="Webhooks"
                value="2"
                sx={{ fontSize: '16px', fontWeight: 500 }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <VerificationDetailAttempts responseData={responseData} />
          </TabPanel>
          <TabPanel value="2">
            <VerfificationDetailWebhooks value={value} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
