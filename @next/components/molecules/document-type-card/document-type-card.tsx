import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';
import { DocumenttypeData } from '@constants';

export const DocumentTypeCard = () => {
  return (
    <React.Fragment>
      {' '}
      <Grid>
        <Card
          sx={{
            Width: '591px',
            height: '330px',
            backgroundColor: '#ffffff',
            border: '0.787575px solid #E8E8EC',
            borderRadius: '9.4509px',
          }}
        >
          <Typography
            gutterBottom
            variant="h3"
            sx={{ color: 'primary.dark', p: 3 }}
          >
            Document Type
          </Typography>
          {DocumenttypeData.map((item) => {
            return (
              <Grid
                item
                key={item.id}
                sx={{
                  dispaly: 'flex',
                  borderRadius: '8px',
                  position: 'relative',
                  margin: 2,
                  bgcolor: `${item.bgColor}`,
                  justifyContent: 'center',
                }}
              >
                <CardMedia
                  sx={{
                    display: 'flex',
                    position: 'absolute',
                    mt: 1.2,
                    marginLeft: '5px',
                  }}
                >
                  <Image src={item.img} alt={item.Alt} />
                </CardMedia>
                <CardContent>
                  <Typography
                    sx={{
                      display: 'flex',
                      position: 'absolute',
                      mt: -1.7,
                      marginLeft: '15px',
                      color: 'primary.light',
                      fontSize: '16px',
                      fontWeight: '400',
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Grid>
            );
          })}
        </Card>
      </Grid>
    </React.Fragment>
  );
};
