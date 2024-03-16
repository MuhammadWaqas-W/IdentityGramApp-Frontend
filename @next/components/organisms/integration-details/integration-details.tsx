import { CustomTabsAtom } from '@atoms';
import { REQUEST_STATUS } from '@constants';
import { apiGetRequest } from '@helpers';
import {
  InstallationMol,
  IntegrationDocumentMol,
  IntegrationInfoMolecule,
  MonitoringMolecule,
  SettingsMolecule,
  SmallLoader,
} from '@molecules';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

export const IntegrationDetailsOrganism = () => {
  const router = useRouter();
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);
  const [getResponseData, setGetResponseData] = useState<any>({});
  const { privateKey, _id, name, callBackUrl, webhookUrls, documents } =
    getResponseData;

  const tabData = [
    {
      tabName: 'Installation',
      tabContent: <InstallationMol apiKey={privateKey} />,
      tabValue: 0,
    },
    {
      tabName: 'Monitoring',
      tabContent: (
        <MonitoringMolecule IntegrationID={_id} integrationName={name} />
      ),
      tabValue: 1,
    },
    {
      tabName: 'Settings',
      tabContent: (
        <SettingsMolecule callBackUrl={callBackUrl} webhookUrls={webhookUrls} />
      ),
      tabValue: 2,
    },
    {
      tabName: 'Documents',
      tabContent: <IntegrationDocumentMol documents={documents} />,
      tabValue: 3,
    },
  ];

  const getUserApplicationData = useCallback(async () => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    try {
      const res: any = await apiGetRequest(
        `/integration/${router?.query?.integration_Details}`,
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
  }, [router]);

  useEffect(() => {
    if (router?.isReady) {
      getUserApplicationData();
    }
  }, [router]);

  return (
    <>
      <Typography variant="h3" sx={{ color: 'primary.dark', fontWeight: 600 }}>
        Live Information
      </Typography>
      {requestStatusGet === REQUEST_STATUS?.LOADING ? (
        <SmallLoader isLoader={true} />
      ) : (
        <IntegrationInfoMolecule
          type={getResponseData?.type}
          baseURL="www.identitygram.com"
          privateKey={getResponseData?.privateKey}
          publishKey={getResponseData?.publicKey}
        />
      )}
      <CustomTabsAtom tabData={tabData} />
    </>
  );
};
