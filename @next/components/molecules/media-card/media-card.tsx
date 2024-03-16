import React, { FC } from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import { CustomMediaCard } from './media-card.types';

export const MediaCard: FC<CustomMediaCard> = ({
  type,
  src,
  title = 'None',
  height = 90,
  width = '100%',
  maxWidth = 200,
  maxHeight = '100%',
}) => {
  return (
    <Card style={{ width: maxWidth, height: maxHeight }}>
      <CardActionArea>
        {type === 'image' ? (
          <CardMedia
            component="img"
            image={src}
            title={title}
            height={height}
            width={width}
          />
        ) : (
          <CardMedia
            component="video"
            src={src}
            controls
            title={title}
            height={height}
            width={width}
          />
        )}
      </CardActionArea>
    </Card>
  );
};
