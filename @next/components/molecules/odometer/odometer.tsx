import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'odometer/themes/odometer-theme-default.css';
import { MyOdometerType } from './odometer.types';
let loadedCallback: any = null;
let loaded = false;

const Odometer = dynamic(
  async () => {
    const mod = await import('react-odometerjs');
    loaded = true;
    if (loadedCallback != null) {
      loadedCallback();
    }
    return mod;
  },
  {
    ssr: false,
    loading: () => null,
  },
);

export const MyOdometer = ({ value }: MyOdometerType) => {
  const [odometerLoaded, setOdometerLoaded] = useState(loaded);
  const [odometerValue, setOdometerValue] = useState(0);

  loadedCallback = () => {
    setOdometerLoaded(true);
  };

  useEffect(() => {
    if (odometerLoaded) {
      setOdometerValue(1);
    }
  }, [odometerLoaded]);

  useEffect(() => {
    setOdometerValue(value);
  }, [odometerValue, value]);

  return (
    <Odometer
      style={{
        color: '#2E285C',
        fontWeight: 400,
        fontSize: '28px',
        fontFamily: 'Poppins',
      }}
      value={odometerValue}
      format="(,dddd)"
      theme="default"
    />
  );
};
