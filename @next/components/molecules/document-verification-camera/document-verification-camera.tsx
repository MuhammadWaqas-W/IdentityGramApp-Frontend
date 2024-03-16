import { CustomButton } from '@atoms';
import { Box, Grid, Typography } from '@mui/material';
import { useState, useRef, forwardRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Image from 'next/image';
import { cameraScan, loadingVerificationImage } from 'public/images';
import { endpoints } from '@config';
import { apiPatchRequest } from '@helpers';
import { useAppSelector } from '@hooks';
import { VerificationOnFail, CustomMessage } from '@molecules';
import { useRouter } from 'next/router';
import { REQUEST_STATUS } from '@constants';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import Webcam, { WebcamProps } from 'react-webcam';
import { useMediaQuery } from 'react-responsive';

const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 300;
export type Ref = {
  handleCapture: () => void;
};

export const DocumentVerificationCamera = ({ isProofAddress }: any) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 512 });
  const isTablet = useMediaQuery({ minWidth: 513, maxWidth: 767 });
  const webcamRef = useRef<Webcam | any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [blobImage, setBlobImage] = useState<any>('');
  const [hitsCount, setHitsCounts] = useState<any>(
    parseInt(localStorage.getItem('hitcount') || '0'),
  );
  const [isAllowed, setIsAllowed] = useState<number>(1);
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);

  const { verifcationProccessResponseData } = useAppSelector(
    (store) => store.verification,
  );

  // this function refer to on success wheater it shoud move to selfie or take back of document
  const onSuccessCaseHandler = () => {
    stream?.getTracks().forEach((track: any) => {
      track.stop();
    });
    setStream(null);
    if (router.query.keyword === 'Passport') {
      router.push({
        pathname: '/app/verifications/selfie-verification',
        query: { keyword: 'selfie' },
      });
      stream?.getTracks().forEach((track: any) => {
        track.stop();
      });
      setStream(null);
    } else if (router.query.keyword === 'Proof Address') {
      isProofAddress(true);
    } else if (router.query.type === 'front') {
      router.push({
        pathname: '/app/verifications/verification-proccess',
        query: { keyword: router.query.keyword, type: 'back' },
      });
      setIsAllowed(1);
    } else {
      router.push({
        pathname: '/app/verifications/selfie-verification',
        query: { keyword: 'selfie' },
      });
      stream?.getTracks().forEach((track: any) => {
        track.stop();
      });
      setStream(null);
    }
  };
  // this function refer to on success wheater it shoud move to selfie or take back of document
  useEffect(() => {
    localStorage.setItem('hitcount', hitsCount.toString());
    // if (hitsCount === 2) {
    //   setRequestStatusGet(REQUEST_STATUS.IDEL);
    //   localStorage.removeItem('myItem');
    // }
    return () => {
      localStorage.removeItem('hitcount');
    };
  }, [hitsCount]);

  // function the send the capture image for verificaton
  const getImageHandler = async (
    bypassVerification: boolean,
    blobImageVal: any,
  ) => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    const payload = {
      integrationId: verifcationProccessResponseData?.integrationId,
      verificationId: verifcationProccessResponseData?._id,
      documentImage: blobImageVal,
      documentType: router.query.keyword,
      imageType: router.query.type,
      customerSaidItsOk: bypassVerification,
    };
    try {
      const res: any = await apiPatchRequest(
        endpoints?.uploadDocument,
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
          onSuccessCaseHandler();
          localStorage.removeItem('hitcount');
          setHitsCounts(0);
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
      if (hitsCount !== 3) {
        setHitsCounts(hitsCount + 1);
      }
      setResponseMessage({ error: true, message: error });
      setRequestStatusGet(REQUEST_STATUS.FAILURE);
      // enqueueSnackbar(error, {
      //   variant: 'error',
      // });
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
    const timeout: any = setTimeout(() => {
      handleStartCapture();
    }, 2000);
    return () => {
      stream?.getTracks().forEach((track: any) => {
        track.stop();
      });
      setStream(null);
      clearTimeout(timeout);
    };
  }, [videoRef, loading, isAllowed, router.query.type, facingMode]);
  // this Function Load the Camera on When we open

  //show a loader before Camera Load
  useEffect(() => {
    const timeout: any =
      !loading &&
      setTimeout(() => {
        setIsAllowed(2);
      }, 4000);
    return () => clearTimeout(timeout);
  }, [isAllowed, loading, router.query.type]);
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
    setBlobImage(blob);
    setImageUrl(imageSrc);
    getImageHandler(false, blob);
  };
  //This Function Capture the image on button Click

  //if verification Failed
  const tryAgainHandler = () => {
    setRequestStatusGet(REQUEST_STATUS.IDEL);
    handleStartCapture();
  };
  //if verification Failed
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

  const verificationByPass = () => {
    getImageHandler(true, blobImage);
  };
  // if (proofAddress) return <VerificationLoader />;
  if (loading)
    return (
      <>
        <Grid container sx={{ pt: 3 }}>
          <Grid
            item
            xs={10}
            md={8}
            lg={5}
            sx={{
              background: 'white',
              margin: 'auto',
              minHeight: '550px',
              borderRadius: '30px',
              boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src={loadingVerificationImage}
              alt=""
              width={500}
              height={500}
            />
          </Grid>
        </Grid>
        <Box sx={{ margin: 'auto', pt: 3 }}>
          <CustomButton
            disabled
            maxWidth="330px"
            width="330px"
            padding="10px"
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

  if (requestStatusGet === 'failure')
    return (
      <VerificationOnFail
        responseMessage={responseMessage}
        tryAgain={tryAgainHandler}
        documentImage={imageUrl}
        hitsCount={hitsCount}
        setHitsCounts={setHitsCounts}
        verificationByPass={verificationByPass}
      />
    );
  const WebCamCOmponent = {
    width: isMobile ? 350 : isTablet ? 450 : 640,
    height: isMobile ? 250 : isTablet ? 300 : 480,
    facingMode: facingMode,
  };
  return (
    <>
      <Grid container sx={{ pt: 3 }}>
        {isAllowed === 1 && (
          <Grid
            item
            xs={10}
            md={8}
            lg={5}
            sx={{
              background: 'white',
              margin: 'auto',
              minHeight: '550px',
              borderRadius: '30px',
              boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src={cameraScan} alt="" />
          </Grid>
        )}
        {requestStatusGet === 'loading' ? (
          <Grid
            item
            xs={5}
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
              xs={11}
              md={8}
              lg={5}
              sx={{
                background: 'black',
                margin: 'auto',
                minHeight: '500px',
                borderRadius: '30px',
                boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', lg: 'none' },
                justifyContent: { xs: 'space-evenly', lg: 'center' },
              }}
            >
              <Box sx={{ position: 'relative', mt: { xs: 0, sm: 10, lg: 0 } }}>
                <Box sx={{ border: '2px solid #fff' }}>
                  <Webcam ref={webcamRef} videoConstraints={WebCamCOmponent} />
                </Box>
                {!isMobile && (
                  <Box
                    className="frame"
                    sx={{
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      width: '80%',
                      height: { xs: '60%', lg: '80%' },
                      border: '5px solid #fff',
                      borderRadius: 4,
                    }}
                  ></Box>
                )}
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
        {(router.query.keyword === 'License' ||
          router.query.keyword === 'Address Permit') && (
          <Grid item xs={12} sx={{ textAlign: 'center', pt: 2 }}>
            <Typography variant="h4" sx={{ color: 'primary.light' }}>
              {router.query.type === 'front'
                ? 'Please put front side of your document'
                : 'Please put back side of your document'}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ margin: 'auto', pt: 2 }}>
        <CustomButton
          styleCustomButton={{ width: { md: '330px' } }}
          maxWidth="330px"
          // width={"330px"}
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
