import React from 'react';
import { IFormEmail } from './link-via-email.type';
import { SchemaViaEmail } from './link-via-email.schema';
import { CustomButton, CustomTextField } from '@atoms';
import Image from 'next/image';
import { CustomMessage } from '../custom-message';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageIcon } from '@icons';

export const LinkViaEmail = ({
  handleSentLinkViaEmail,
  responseMessage,
}: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormEmail>({
    resolver: yupResolver(SchemaViaEmail),
    defaultValues: {
      type: 'EMAIL',
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
        A secure link will be shared via Email
      </Typography>
      <form onSubmit={handleSubmit(handleSentLinkViaEmail)}>
        <CustomTextField
          fullWidth
          placeholder="Email"
          type="text"
          StartIcon={
            <Box sx={{ pr: 1 }}>
              <Image src={messageIcon} alt="" />
            </Box>
          }
          styleLabel={{ pb: 1, fontWeight: 500 }}
          labelText="Email"
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
          // loading={isSubmitting}
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
