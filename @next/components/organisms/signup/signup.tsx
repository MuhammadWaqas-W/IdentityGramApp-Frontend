import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  LinkedinCircle,
  Instagram,
  Facebook,
  Twitter,
  Circle,
  Pattern,
  Envelope,
  Plan,
  Ellipse6,
  Ellipse4,
  CrossTag,
  IdentityGramLogo,
} from '@icons';
import Image from 'next/image';
import {
  CustomButton,
  CustomCheckBox,
  CustomReactSelect,
  CustomTextField,
  PrimaryCardAtom,
} from '@atoms';
import { IFormValuesType } from './signup.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from './signup.schema';
import { apiGetRequest, apiPostRequest } from '@helpers';
import { endpoints } from '@config';
import { useSnackbar } from 'notistack';
import router from 'next/router';
import { CustomMessage } from '@molecules';
import { identityList } from '@constants';

export const SignupOrganism = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  const [companies, setCompanies] = useState([]);

  const { handleSubmit, control, reset, formState } = useForm<IFormValuesType>({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      companyId: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleSignUp: SubmitHandler<IFormValuesType> = async (values: any) => {
    try {
      const payload = {
        ...values,
        defaultRole: 'COMPANY_ADMIN',
        companyId: values?.companyId?.value,
      };
      const res: any = await apiPostRequest(endpoints?.signup, payload);
      const { data, status } = res;
      switch (status) {
        case 201:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          reset({
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            companyId: '',
          });
          router?.push('/auth/login');
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error });
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setResponseMessage({ error: null, message: null });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [responseMessage]);

  // FETCH COMPANIES API CALL
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
      } catch (error) {
      } finally {
      }
    };
    fetchCompanies();
  }, []);
  // FETCH COMPANIES API CALL

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          left: { xl: '8%', lg: '7%', sm: '8%' },
          top: '8.5%',
          display: { lg: 'inline', xs: 'none' },
        }}
      >
        <Image src={Pattern} alt="Pattern" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: { xl: '18%', xs: '18%' },
          top: { xl: '2%', xs: '2%' },
          display: { lg: 'inline', xs: 'none' },
        }}
      >
        <Image src={Envelope} alt="Envelope" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: { xl: '2.5%', lg: '2%', md: '2%', xs: '1%' },
          top: '0%',
          display: { lg: 'inline', md: 'inline', xs: 'none' },
        }}
      >
        <Image src={Plan} alt="Plan" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: '25%',
          top: '9%',
          display: { lg: 'inline', xs: 'none' },
        }}
      >
        <Image src={Ellipse4} alt="" />
      </Box>

      <PrimaryCardAtom
        xs={10}
        sm={8}
        md={9}
        StyleObject={{
          mt: { xs: '30px', lg: '10%' },
          mb: { xs: '30px', lg: '3%' },
        }}
      >
        <Grid container columnGap={5}>
          <Grid
            item
            sm={12}
            md={5.5}
            sx={{
              pt: 10,
              px: 5,
              background: '#FAF8FF',
              borderRadius: '20px',
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'inline' },
            }}
          >
            <Box sx={{ position: 'relative', left: '52%', top: '0%' }}>
              <Image src={Ellipse6} alt="" />
            </Box>
            <Grid container rowGap={4} sx={{ mb: 10 }}>
              <Grid item xs={12}>
                <Typography variant="h2" sx={{ color: '#3C347E' }}>
                  Why Identity Gram
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#6E7191',
                  }}
                >
                  Tell Identity Gram about you and we’ll put you in touch right
                  away with our team
                </Typography>
              </Grid>

              {identityList?.map((item, index: any) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
                >
                  <Image src={item.icon} alt="" height={25} />

                  <Typography
                    variant="h6"
                    sx={{
                      color: '#6E7191',
                      mx: 3,
                    }}
                  >
                    {item.data}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ pt: 8 }}>
              <Image src={Circle} alt="" />
              <Box
                sx={{
                  display: 'flex',
                  position: 'relative',
                  bottom: '25px',
                  left: '15px',
                  columnGap: 1,
                }}
              >
                <Image src={LinkedinCircle} alt="Linkedin" />
                <Image src={Instagram} alt="Instagram" />
                <Image src={Facebook} alt="Facebook" />
                <Image src={Twitter} alt="Twitter" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5.5}>
            <Box
              sx={{
                mt: 2,
                cursor: 'pointer',
                width: 'fit-content',
                ml: 'auto',
              }}
            >
              <Image
                src={CrossTag}
                alt=""
                onClick={() => {
                  router?.push('/auth/login');
                }}
              />
            </Box>
            <Box textAlign="center">
              <Image src={IdentityGramLogo} alt="" />
            </Box>
            <Typography
              variant="h2"
              sx={{
                color: 'palette.primaryCardPrimaryCardAtom.dark',
                textAlign: { xl: 'left', xs: 'center' },
                mt: 6,
              }}
            >
              Register With Us
            </Typography>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <Grid
                container
                columnSpacing={5}
                rowGap={4}
                sx={{
                  pt: 3,
                  px: { lg: '0px', md: '50px', sm: '30px', xs: '30px' },
                }}
              >
                <Grid item xs={12} sm={12} md={12} xl={6}>
                  <CustomTextField
                    fullWidth
                    labelText="First Name"
                    type="text"
                    name="firstName"
                    control={control}
                    placeholder="First Name"
                    id="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={6}>
                  <CustomTextField
                    fullWidth
                    labelText="Last Name"
                    type="text"
                    name="lastName"
                    control={control}
                    placeholder="Last Name"
                    id="lastName"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={6}>
                  <CustomTextField
                    fullWidth
                    labelText="Company Email"
                    type="email"
                    name="email"
                    control={control}
                    placeholder="Company Email"
                    id="email"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={6}>
                  <CustomTextField
                    fullWidth
                    labelText="Contact Number"
                    type="text"
                    name="contactNumber"
                    control={control}
                    placeholder="Contact Number"
                    id="contactNumber"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={6}>
                  <CustomReactSelect
                    name="companyId"
                    label={
                      <Typography>
                        Product Title{' '}
                        <Typography component="span" color="red">
                          *
                        </Typography>
                      </Typography>
                    }
                    id="companyId"
                    placeholder="Product Title"
                    control={control}
                    data={companies}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomCheckBox
                    name="termsAndConditions"
                    control={control}
                    label={
                      <Typography
                        sx={{
                          fontFamily: 'Poppins',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#A0A3BD',
                        }}
                      >
                        By submitting this form, you confirm that you have read
                        and understood our{' '}
                        <Typography
                          component="span"
                          sx={{
                            color: '#645CAA',
                            fontFamily: 'Poppins',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          Terms & Conditions
                        </Typography>
                      </Typography>
                    }
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
                  <CustomButton
                    background="#645CAA"
                    type="submit"
                    disabled={!formState.isValid}
                  >
                    Register Now
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
            <Typography
              variant="h5"
              sx={{
                color: '#6E7191',
                fontFamily: 'Poppins',
                fontWeight: 400,
                mt: 5,
              }}
              textAlign="center"
            >
              Already have an account?{' '}
              <Typography
                component="span"
                variant="h5"
                sx={{
                  color: '#3C347E',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router?.push('/auth/login');
                }}
              >
                Sign In
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </PrimaryCardAtom>
    </>
  );
};
