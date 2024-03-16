import React from 'react';

export interface GuestPanelLayoutProps {
  children: React.ReactNode;
  heading: string;
  subHeading?: string;
  color?: string;
  fontSize?: number;
  test?: string;
}
