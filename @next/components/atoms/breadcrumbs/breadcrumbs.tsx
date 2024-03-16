import { Box, Breadcrumbs } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { breadcrumbArrow } from '@icons';
import { useRouter } from 'next/router';

export const BreadcrumbsAtom = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment);
  // Store the original path for the first segment
  const originalFirstSegmentPath = `/${pathSegments[0]}/dashboard`;

  return (
    <Box
      sx={{
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Image src={breadcrumbArrow} alt="Breadcrumb" />}
      >
        <Link
          href={originalFirstSegmentPath}
          passHref
          style={{ textDecoration: 'none', marginRight: 4, color: '#645CAA' }}
        >
          Identity Gram
        </Link>
        {pathSegments.slice(1).map((segment, index) => {
          const isLastSegment = index === pathSegments.length - 2;

          if (isLastSegment) {
            // Last segment, show segment without link
            return (
              <Typography key={index + 1} sx={{ textTransform: 'capitalize' }}>
                {segment?.split('?')[0].replace(/-/, ' ')}
              </Typography>
            );
          }

          const segmentHref = `/${pathSegments.slice(0, index + 2).join('/')}`;

          return (
            <Link
              key={index + 1}
              href={segmentHref}
              passHref
              style={{
                textDecoration: 'none',
                marginRight: 4,
                color: '#645CAA',
                textTransform: 'capitalize',
              }}
            >
              {segment.replace(/-/g, ' ')}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
