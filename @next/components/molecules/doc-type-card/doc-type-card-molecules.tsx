import React from 'react';
import { PrimaryCardAtom } from '@atoms';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { DocTypesCardProps } from './doc-type-card.types';
import router from 'next/router';

export const DocTypeCardMolecules: React.FC<DocTypesCardProps> = ({
  image,
  heading,
  subheading,
  bgColor,
  textColor,
  type,
}: DocTypesCardProps) => {
  return (
    <>
      <PrimaryCardAtom
        StyleObject={{
          background: bgColor,
          p: 5,
          border: 'none',
          cursor: 'pointer',
        }}
        wrapperStylObject={{
          transition: 'all .2s ease-in-out',
          '& :hover': {
            img: {
              tranform: 'scale(1.5)',
            },
          },
        }}
        clickHandler={() => {
          router?.push(`/app/reports/${type}`);
        }}
      >
        <Image className="img-prop" src={image} alt="" />

        <Typography variant="h2" color={textColor} sx={{ mt: 2 }}>
          {heading}
        </Typography>
        <Typography variant="h6" color={textColor} sx={{ mt: 2 }}>
          {subheading}
        </Typography>
      </PrimaryCardAtom>
    </>
  );
};
