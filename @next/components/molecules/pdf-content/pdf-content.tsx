import { awsBaseUrl } from '@config';
import { userAvatar } from '@icons';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { PdfContentType } from './pdf-content.types';

export const PdfContent = ({ dataArray }: PdfContentType) => {
  return (
    <>
      {dataArray?.map((values: any, index: any) => (
        <Box id="pdf-content" key={index}>
          <Box
            sx={{
              border: '1px solid #E8E8EC',
              p: 2,
              borderRadius: '6px',
              mt: 3,
            }}
          >
            <Box
              sx={{
                mb: 2,
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  paddingRight: '5px',
                }}
              >
                Integration Type:
              </Typography>
              <Typography sx={{ color: 'primary.light' }}>
                {values?.integration?.type}
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  paddingRight: '5px',
                }}
              >
                Person Name:
              </Typography>
              <Typography sx={{ color: 'primary.light' }}>
                {values?.firstName + ' ' + values?.lastName}
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  paddingRight: '5px',
                }}
              >
                Platform Used:
              </Typography>
              <Typography sx={{ color: 'primary.light' }}>
                {values?.platform}
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  paddingRight: '5px',
                }}
              >
                Document Type:
              </Typography>
              <Typography sx={{ color: 'primary.light' }}>
                {values?.documentType}
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  paddingRight: '5px',
                }}
              >
                Document Country:
              </Typography>
              <Typography sx={{ color: 'primary.light' }}>
                {values?.details?.country}
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  paddingRight: '5px',
                }}
              >
                Expires At:
              </Typography>
              <Typography sx={{ color: 'primary.light' }}>
                {values?.details?.expiration_date}
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  paddingRight: '5px',
                }}
              >
                IP Location:
              </Typography>
              <Typography sx={{ color: 'primary.light' }}>
                {values?.ip}
              </Typography>
            </Box>
          </Box>

          {values?.documentType !== 'Proof Address' && (
            <Box
              sx={{
                border: '1px solid #E8E8EC',
                p: 2,
                borderRadius: '6px',
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  pb: 2,
                }}
              >
                Portrait:
              </Typography>
              <Image
                height={200}
                width={200}
                priority={true}
                src={
                  (values?.selfie && awsBaseUrl + values?.selfie) || userAvatar
                }
                alt={''}
              />
            </Box>
          )}

          <Box
            sx={{
              border: '1px solid #E8E8EC',
              p: 2,
              borderRadius: '6px',
              mt: 3,
            }}
          >
            <Typography
              sx={{
                color: 'primary.light',
                width: { xs: 'max-content', md: '180px' },
                pb: 2,
              }}
            >
              {`Document${values?.documentBack ? ' Front:' : ':'}`}
            </Typography>
            <Image
              height={300}
              width={500}
              priority={true}
              src={
                (values?.documentFront?.url &&
                  awsBaseUrl + values?.documentFront?.url) ||
                userAvatar
              }
              alt={''}
            />
          </Box>

          {values?.documentBack && (
            <Box
              sx={{
                border: '1px solid #E8E8EC',
                p: 2,
                borderRadius: '6px',
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  width: { xs: 'max-content', md: '180px' },
                  pb: 2,
                }}
              >
                Document Back:
              </Typography>
              <Image
                height={300}
                width={500}
                priority={true}
                src={
                  (values?.documentBack?.url &&
                    awsBaseUrl + values?.documentBack?.url) ||
                  userAvatar
                }
                alt={''}
              />
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};
