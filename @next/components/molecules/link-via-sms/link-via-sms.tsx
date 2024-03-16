import React from 'react';
import { CustomButton, CustomTextField } from '@atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { CustomMessage } from '../custom-message';
import { IFormSms } from './link-via-sms.type';
import { SchemaViaSms } from './link-via-sms.schema';
import { EnglandImage } from '@images';

export const LinkViaSms = ({ handleSentLinkViaSms, responseMessage }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormSms>({
    resolver: yupResolver(SchemaViaSms),
    defaultValues: {
      type: 'SMS',
      value: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  return (
    <React.Fragment>
      <Typography
        variant="h4"
        sx={{
          py: 2,
          color: 'primary.light',
        }}
      >
        A secure link will be shared via SMS
      </Typography>
      <form onSubmit={handleSubmit(handleSentLinkViaSms)}>
        <CustomTextField
          fullWidth
          placeholder="+44"
          type="text"
          StartIcon={
            <Box sx={{ pr: 1 }}>
              <Image src={EnglandImage} alt="" />
            </Box>
          }
          styleLabel={{ pb: 1, fontWeight: 500 }}
          labelText="Mobile"
          name="value"
          id="text"
          control={control}
          styleTextField={{
            fontSize: '14px',
            backgroundColor: 'secondary.100',
          }}
        />

        <CustomMessage
          hasMessage={!!responseMessage?.message}
          text={responseMessage?.message}
          error={responseMessage?.error}
          isBold={true}
        />
        <CustomButton
          margin="30px 0px"
          type="submit"
          padding="10px"
          loading={isSubmitting}
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
            Next
          </Typography>
        </CustomButton>
      </form>
    </React.Fragment>
  );
};
