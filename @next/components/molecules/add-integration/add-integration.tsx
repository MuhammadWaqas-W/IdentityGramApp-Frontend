import React, { useEffect, useState } from 'react';
import {
  CustomButton,
  CustomizedRadios,
  CustomModel,
  CustomTextField,
} from '@atoms';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAddVerificationVal } from './add-integration.type';
import { SchemaAddVerification } from './add-integration.schema';
import { CustomMessage } from '@molecules';
import { integrationType } from '@constants';

let defaultValues = {
  name: '',
  type: '',
};

export const AddIntegrationMol = ({
  handleAddorEdit,
  open,
  setOpen,
  isLoading,
}: any) => {
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: {},
  } = useForm<IAddVerificationVal>({
    resolver: yupResolver(SchemaAddVerification),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleOpen = () => {
    setOpen(true);
    reset(defaultValues);
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setResponseMessage({ error: null, message: null });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [responseMessage]);

  return (
    <React.Fragment>
      <CustomButton
        type="submit"
        padding="10px 15px"
        maxWidth="200px"
        onClick={handleOpen}
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
          Add Integration
        </Typography>
      </CustomButton>
      <CustomModel
        open={open}
        setOpen={setOpen}
        styleModal={{ width: { xs: '90%', sm: '80%', md: '70%', xl: '60%' } }}
      >
        <form onSubmit={handleSubmit(handleAddorEdit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                sx={{
                  color: 'primary.dark',
                  fontSize: '24px',
                  fontWeight: 600,
                }}
              >
                Add Integrations
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'end', mt: 3 }}>
              <CloseIcon
                sx={{
                  fontFamily: 'Poppins',
                  color: 'primary.light',
                  fontSize: '24px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => setOpen(false)}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                labelText="Integration Name"
                padding="15px"
                placeholder="Integration Name"
                type="text"
                name="name"
                id="name"
                control={control}
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
              />
            </Grid>
            <Grid item lg={12}>
              <CustomizedRadios
                label={
                  <Typography variant="h5" color="#2E285C" sx={{ mb: 1 }}>
                    Choose intergration type
                  </Typography>
                }
                name="type"
                control={control}
                id="type"
                data={integrationType}
                labelWidth={380}
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
              <CustomButton
                type="submit"
                padding="10px"
                loading={isLoading}
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
                  Add Integration
                </Typography>
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </CustomModel>
    </React.Fragment>
  );
};
