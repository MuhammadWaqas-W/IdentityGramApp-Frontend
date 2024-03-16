import React, { useEffect, useState } from 'react';
import { CustomButton, CustomTextField } from '@atoms';
import { Typography, Grid, Skeleton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CustomSelect } from '@atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SchemaAddVerification,
  SchemaAddVerificationSuperAdmin,
} from './add-verification.schema';
import { CustomMessage } from '../custom-message';
import { apiGetRequest } from '@helpers';
import { endpoints } from '@config';
import { useAppSelector } from '@hooks';

let superAdminDefaultValues = {
  firstName: '',
  lastName: '',
  integrationId: '',
  uniqueIdentifier: '',
  companyId: '',
};

let companyAdminDefaultValues = {
  firstName: '',
  lastName: '',
  integrationId: '',
  uniqueIdentifier: '',
};

export const AddVerificationMol = ({
  getResponseData,
  handleAddVerification,
  isLoadingMutation,
  responseMessage,
  requestStatusGet,
}: any) => {
  const [companies, setCompanies] = useState([]);
  const [integrationByCompany, setIntegrationByCompany] = useState([]);
  const { user }: any = useAppSelector((state: { auth: any }) => state.auth);
  const role = user?.roles?.length && user?.roles[0];

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res: any = await apiGetRequest(endpoints?.getCompanies);
        const { data } = res;
        const options = data?.data?.map((item: { title: any; _id: any }) => ({
          label: item?.title,
          value: item?._id,
        }));
        setCompanies(options);
      } catch (error) {}
    };
    role === 'SUPER_ADMIN' && fetchCompanies();
  }, []);

  const integrationid =
    getResponseData &&
    getResponseData?.map((item: any) => {
      return { label: item?.name, value: item?._id };
    });

  const {
    handleSubmit,
    control,
    formState: {},
    setValue,
    getValues,
  } = useForm<any>({
    resolver: yupResolver(
      role === 'SUPER_ADMIN'
        ? SchemaAddVerificationSuperAdmin
        : SchemaAddVerification,
    ),
    defaultValues:
      role === 'SUPER_ADMIN'
        ? superAdminDefaultValues
        : companyAdminDefaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleCompanyClick = async ({ target }: any) => {
    setValue('companyId', target?.value);
    let companyId = target?.value;
    try {
      const res: any = await apiGetRequest(
        endpoints?.getIntegrationByCompany,
        null,
        { companyId },
      );
      const { data } = res;
      const options = data?.data?.map((item: { name: any; _id: any }) => ({
        label: item?.name,
        value: item?._id,
      }));
      setIntegrationByCompany(options);
    } catch (error) {
      setIntegrationByCompany([]);
    }
  };

  let integrations = [];
  integrations = role === 'SUPER_ADMIN' ? integrationByCompany : integrationid;

  // get All Integration  of Values on Select Change
  return (
    <>
      {requestStatusGet === 'loading' ? (
        <>
          <Skeleton animation="wave" width={1200} height={70} />
          <Skeleton animation="wave" width={1200} height={70} />
          <Skeleton animation="wave" width={1200} height={70} />
          <Skeleton animation="wave" width={1200} height={70} />
        </>
      ) : (
        <form onSubmit={handleSubmit(handleAddVerification)}>
          <Grid container spacing={2} sx={{ px: 2 }}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  pb: 2,
                  fontWeight: 400,
                  color: 'text.primary',
                }}
              >
                To authorise transactions, please scan this QR code with your
                Google Authenticator App and enter the verification code below.{' '}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                fullWidth
                labelText="First Name"
                padding="15px"
                placeholder="Write here"
                type="text"
                name="firstName"
                id="firstName"
                control={control}
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                fullWidth
                labelText="Last Name"
                padding="15px"
                placeholder="Write here"
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="text"
                name="lastName"
                id="lastName"
                control={control}
              />
            </Grid>
            {role === 'SUPER_ADMIN' && (
              <Grid item xs={12} lg={6}>
                <CustomSelect
                  stylePaperProps={{ maxHeight: 300 }}
                  fullWidth
                  label="Product Title"
                  padding="15px"
                  placeholder="Write here"
                  data={companies}
                  name="companyId"
                  id="companyId"
                  control={control}
                  customOnChange={handleCompanyClick}
                  customValue={getValues('companyId')}
                />
              </Grid>
            )}

            <Grid item xs={12} lg={role === 'SUPER_ADMIN' ? 6 : 12}>
              <CustomSelect
                stylePaperProps={{ maxHeight: 300 }}
                fullWidth
                label="Integration"
                padding="15px"
                placeholder="Write here"
                data={integrations}
                name="integrationId"
                id="integrationId"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomMessage
                hasMessage={!!responseMessage?.message}
                text={responseMessage?.message}
                error={responseMessage?.error}
                isBold={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                notRequired
                labelText="Unique Identifier"
                padding="15px"
                placeholder="User ID"
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="text"
                name="uniqueIdentifier"
                id="uniqueIdentifier"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
              <CustomButton
                type="submit"
                padding="10px"
                loading={isLoadingMutation}
                maxWidth="200px"
              >
                <Typography
                  variant="h6"
                  sx={{
                    transition: 'all .2s ease-in-out',
                    display: 'flex',
                    fontWeight: 400,
                    '& span': {
                      display: 'flex',
                      '& :hover': {
                        transform: 'scale(1.3)',
                      },
                    },
                  }}
                >
                  Generate Verification
                </Typography>
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};
