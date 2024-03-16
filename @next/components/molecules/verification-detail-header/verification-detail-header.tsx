import React from 'react';
import { UserName } from '@atoms';
import { Box } from '@mui/material';
import { profilePic } from '@images';
import { Typography } from '@mui/material';
import { Status } from '@atoms';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CustomButton } from '@atoms';
import moment from 'moment';

export const VerificationDetailHeader = ({
  handleExportPdf,
  responseData,
}: any) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
          <UserName
            image={profilePic}
            name={`${responseData[0]?.firstName ?? '-'} ${
              responseData[0]?.lastName ?? '-'
            }`}
            width="50px"
            height="50px"
            styleName={{ fontSize: '24px', fontWeight: 600 }}
          />
          <Status
            children={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FiberManualRecordIcon
                  sx={{ fontSize: 'small', color: '#0BAB52' }}
                />
                <Typography variant="body2" sx={{ color: '#065F46', px: 0.5 }}>
                  {responseData[0]?.integration?.type ?? '-'}
                </Typography>
              </Box>
            }
            color="#065F46"
            bgColor="#D1FAE5"
            styleWrapper={{ ml: 1, width: '60px', height: '22px' }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: 'primary.light',
            '& span': {
              pr: 1,
              color: '#FAA31E',
            },
          }}
        >
          <span>Last update</span>
          {moment(responseData[0]?.updatedAt).format('lll') + ' ' ?? '-'}
          {/* {' 20 Aug 2022 10:15 PM ( Session will be archieved at 6 Nov )'} */}
        </Typography>
      </Box>
      <Box sx={{ mx: 1 }}>
        <CustomButton
          variant="outlined"
          background="transparent"
          onClick={handleExportPdf}
        >
          <Typography variant="h5">Export as PDF</Typography>
        </CustomButton>
      </Box>
    </Box>
  );
};
