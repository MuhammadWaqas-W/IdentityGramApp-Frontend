import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const CustomTabsAtom = ({ tabData }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {tabData?.map((item: any, i: number) => {
            return (
              <Tab
                label={item?.tabName}
                {...a11yProps(i)}
                key={i}
                disableRipple
                sx={{
                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#A0A3BD',
                }}
              />
            );
          })}
        </Tabs>
      </Box>
      {tabData?.map((item: any, i: number) => {
        return (
          <TabPanel value={value} index={i} key={i}>
            {item?.tabContent}
          </TabPanel>
        );
      })}
    </Box>
  );
};
