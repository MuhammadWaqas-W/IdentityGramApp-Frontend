import React, { useCallback, useEffect, useState } from 'react';
import { CustomModel } from '@atoms';
import { Box } from '@mui/material';
import Image from 'next/image';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { DownloadIcon, IdentityGramLogo } from '@icons';
import { apiGetRequest } from '@helpers';
import { useRouter } from 'next/router';
import { REQUEST_STATUS } from '@constants';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PdfContent } from '@molecules';
import { CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';

export const ReportVerificationDataModal = ({
  verificationId,
}: // handleExportPdf,
any) => {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState(false);
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);
  const [getResponseData, setGetResponseData] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
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
      doc.save(
        `${
          getResponseData[0]?.firstName + ' ' + getResponseData[0]?.lastName
        }'s report.pdf`,
      );
    }
  };

  const getUserApplicationData = useCallback(async () => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    try {
      const res: any = await apiGetRequest(
        `/verification/view/${verificationId}`,
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
      enqueueSnackbar('Something went wrong', {
        variant: 'error',
      });
    } finally {
      setRequestStatusGet(REQUEST_STATUS.IDEL);
    }
  }, [open]);

  useEffect(() => {
    if (download && getResponseData) {
      handleExportPdf();
      setDownload(false);
    }
  }, [getResponseData]);
  useEffect(() => {
    if (open || download) {
      getUserApplicationData();
    }
  }, [open, download]);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: '10px',
        }}
      >
        <VisibilityOutlinedIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setOpen(true);
          }}
        />
        {download && requestStatusGet === REQUEST_STATUS.LOADING ? (
          <CircularProgress size={20} sx={{ fontSize: '14px' }} />
        ) : (
          <Image
            src={DownloadIcon}
            alt=""
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setDownload(true);
            }}
          />
        )}
        {download && (
          <Box
            sx={{
              position: 'fixed',
              zIndex: '-1300',
              width: '1000px',
              top: '200%',
            }}
          >
            <PdfContent dataArray={getResponseData} />
          </Box>
        )}
      </Box>
      <CustomModel
        setOpen={setOpen}
        open={open}
        styleModal={{
          p: 3,
          maxHeight: '550px',
          width: { lg: '45%', xs: '90%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image
            src={IdentityGramLogo}
            alt=""
            style={{ width: '135px', height: '36px' }}
          />
          <CloseOutlinedIcon
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              mt: '10px',
            }}
          >
            {/* <CustomButton
              variant="outlined"
              background="transparent"
              maxWidth="140px"
              onClick={handleExportPdf}
            >
              <Typography variant="h5">Export as PDF</Typography>
            </CustomButton> */}
          </Box>
          <PdfContent dataArray={getResponseData} />
        </Box>
      </CustomModel>
    </React.Fragment>
  );
};
