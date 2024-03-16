// import React, { useState, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const CameraTestInnerPage = () => {
//   const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

//   useEffect(() => {
//     const mediaConstraints = {
//       audio: true,
//       video: { facingMode },
//     };

//     navigator.mediaDevices.getUserMedia(mediaConstraints).then(() => {
//       // The camera stream has been restarted
//     }).catch((error) => {
//       console.error('Error restarting camera stream:', error);
//     });
//   }, [facingMode]);

//   const switchCamera = () => {
//     setFacingMode((prevFacingMode) =>
//       prevFacingMode === 'environment' ? 'user' : 'environment'
//     );
//   };

//   return (
//     <div>
//       <Webcam audio={true} videoConstraints={true} />
//       <button onClick={switchCamera}>Switch Camera</button>
//     </div>
//   );
// };

// export default CameraTestInnerPage;
import React, { useState, useEffect, useRef } from 'react';

const CameraTestInnerPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(newStream);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const switchCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    alert('button-clicked');
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'environment' ? 'user' : 'environment',
    );
  };

  useEffect(() => {
    setTimeout(() => {
      startCamera();
      console.log('function run');
    }, 1000);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={switchCamera}>Switch Camera</button>
    </div>
  );
};

export default CameraTestInnerPage;
