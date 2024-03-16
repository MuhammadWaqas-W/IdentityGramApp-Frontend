import { CustomButton } from '@atoms';
import { Box, Grid, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  removeIcon,
  selfie1,
  selfie2,
  selfie3,
  successIcon,
} from 'public/images';
import { endpoints } from '@config';
import { apiPatchRequest } from '@helpers';
import { useAppSelector } from '@hooks';
import { VerificationOnFail, CustomMessage } from '@molecules';
import { useRouter } from 'next/router';
import { REQUEST_STATUS } from '@constants';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import Webcam, { WebcamProps } from 'react-webcam';
import { useMediaQuery } from 'react-responsive';

type Props = {
  loading?: any;
  buttonLabel: string;
  // Define props for the child component here
};

const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 500;

export const SelfieVerificationCamera = ({ sendRequestSatus }: any) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const webcamRef = useRef<Webcam | any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isAllowed, setIsAllowed] = useState<number>(1);
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);

  const { verifcationProccessResponseData } = useAppSelector(
    (store) => store.verification,
  );

  // function the send the capture image for verificaton
  const getImageHandler = async (image: any) => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    const payload = {
      integrationId: verifcationProccessResponseData?.integrationId,
      verificationId: verifcationProccessResponseData?._id,
      userImage: image,
    };
    try {
      const res: any = await apiPatchRequest(
        endpoints.uploadSelfie,
        payload,
        null,
        'multipart/form-data',
      );
      const { data, status } = res;
      switch (status) {
        case 200:
        case 201:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          setRequestStatusGet(REQUEST_STATUS.SUCCESS);
          sendRequestSatus(REQUEST_STATUS.SUCCESS);
          stream?.getTracks().forEach((track) => {
            track.stop();
          });
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          setRequestStatusGet(REQUEST_STATUS.FAILURE);
          // enqueueSnackbar(data?.message, {
          //   variant: 'error',
          // });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error });
      setRequestStatusGet(REQUEST_STATUS.FAILURE);
      // enqueueSnackbar(error, {
      //   variant: 'error',
      // });
    } finally {
      // setRequestStatusGet(REQUEST_STATUS.IDEL);
    }
  };
  // function the send the capture image for verificaton

  // this Function Load the Camera on When we open
  const handleStartCapture = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
      if (stream) {
        stream.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
      setStream(newStream);
    } catch (error) {
      enqueueSnackbar('camera not working', { variant: 'error' });
      router.push('/app/camera-error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeOutVal: any = setTimeout(() => {
      handleStartCapture();
    }, 4000);
    return () => {
      stream?.getTracks().forEach((track: any) => {
        track.stop();
      });
      clearTimeout(timeOutVal);
      setStream(null);
    };
  }, [videoRef, loading, isAllowed, facingMode]);
  // this Function Load the Camera on When we open

  //show a loader before Camera Load
  useEffect(() => {
    const timeout: any =
      !loading &&
      setTimeout(() => {
        setIsAllowed(2);
      }, 4000);
    return () => clearTimeout(timeout);
  }, [isAllowed, loading]);
  //show a loader before Camera Load

  //This Function Capture the image on button Click
  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;
    const ctx = canvas.getContext('2d');
    const video = webcamRef.current?.video;
    if (!ctx || !video) {
      return;
    }
    const x = (video.videoWidth - FRAME_WIDTH) / 2;
    const y = (video.videoHeight - FRAME_HEIGHT) / 2;
    ctx.drawImage(
      video,
      x,
      y,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      0,
      0,
      FRAME_WIDTH,
      FRAME_HEIGHT,
    );

    const imageSrc = canvas.toDataURL();
    const base64Image = imageSrc.split(',')[1];
    const byteCharacters = atob(base64Image);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    const blobUrl = URL.createObjectURL(blob);
    getImageHandler(blob);
    setImageUrl(imageSrc);
  };
  //This Function Capture the image on button Click

  //if verification Failed
  const tryAgainHandler = () => {
    setRequestStatusGet(REQUEST_STATUS.IDEL);
    handleStartCapture();
  };
  const flipCameraHandler = () => {
    stream?.getTracks().forEach((track: any) => {
      track.stop();
    });
    setIsAllowed(1);
    setStream(null);
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'environment' ? 'user' : 'environment',
    );
  };

  const WebCamCOmponent = {
    width: isMobile ? 400 : 640,
    height: isMobile ? 400 : 480,
    facingMode: facingMode,
  };
  //if verification Failed
  if (requestStatusGet === 'failure')
    return (
      <VerificationOnFail
        tryAgain={tryAgainHandler}
        documentImage={imageUrl}
        styleImage={{
          borderRadius: '50%',
          width: { xs: 200, lg: 300 },
          height: { xs: 200, lg: 300 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  return (
    <>
      <Grid container sx={{ pt: 3 }}>
        {(loading || isAllowed === 1) && (
          <Grid
            item
            xs={10}
            md={8}
            lg={5}
            className="circle-selfie"
            sx={{
              background: 'black',
              margin: 'auto',
              minHeight: '550px',
              borderRadius: '30px',
              boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              className="circle"
              sx={{
                height: { xs: '200px', sm: '250px', md: '350px' },
                width: { xs: '200px', sm: '250px', md: '350px' },
              }}
            ></Box>
          </Grid>
        )}
        {requestStatusGet === 'loading' ? (
          <Grid
            item
            xs={10}
            md={8}
            lg={5}
            sx={{
              minHeight: '550px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
            }}
            className="loading-animation-upload"
          >
            <Box
              className="spinner spinner--steps icon-spinner"
              aria-hidden="true"
            ></Box>
          </Grid>
        ) : (
          isAllowed === 2 && (
            <Grid
              item
              xs={12}
              md={8}
              lg={5}
              sx={{
                background: 'black',
                margin: 'auto',
                height: '550px',
                borderRadius: '30px',
                boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', lg: 'none' },
                justifyContent: { xs: 'space-evenly', lg: 'center' },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Webcam ref={webcamRef} videoConstraints={WebCamCOmponent} />

                <Box
                  className="frame circle-selfie-active"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Box
                    className="circle"
                    sx={{
                      height: { xs: '300px', md: '350px' },
                      width: { xs: '300px', md: '350px' },
                    }}
                  ></Box>
                </Box>
              </Box>
              <Box sx={{ display: { lg: 'none' }, p: { xs: 0, sm: 5 } }}>
                <CustomButton
                  width="70px"
                  height="70px"
                  onClick={flipCameraHandler}
                  borderRadius="50%"
                >
                  <FlipCameraIosIcon sx={{ fontSize: 30 }} />
                </CustomButton>
              </Box>
            </Grid>
          )
        )}
      </Grid>
      <Box sx={{ margin: 'auto', pt: 3 }}>
        <CustomButton
          maxWidth="330px"
          width="330px"
          padding="10px"
          disabled={isAllowed === 1 ? true : false}
          onClick={handleCapture}
        >
          <Typography
            variant="h6"
            sx={{
              transition: 'all .2s ease-in-out',
              display: 'flex',
              fontWeight: 400,
            }}
          >
            Take a photo
          </Typography>
        </CustomButton>
      </Box>
    </>
  );
};
