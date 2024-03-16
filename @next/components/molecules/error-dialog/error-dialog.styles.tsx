import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';
import { Chip } from '@mui/material';

export const MainContainer = styled.div`
  margin-right: 53px;
  margin-left: 70px;
  margin-bottom: 60px;
`;

export const StyledChip = styled(Chip)`
  color: #3e3f42 !important;
  background-color: #eaedf3 !important;
  text-transform: capitalize !important;
  font-size: 18px !important;
  padding: 25px 18px !important;
  border-radius: 24px !important;
`;

export const SubMainContainer = styled.div`
  width: 100%;
`;

export const FooterContainer = styled.div`
  margin-top: 80px;
`;

export const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 13px;
  margin-bottom: 37px;
`;

export const StyledHeading = styled.p`
  font-weight: 500;
  font-size: 36px;
  color: #3e3f42;
  padding: 0;
  margin: 0;
`;

export const RequestText = styled.p`
  font-size: 36px;
  color: #3e3f42;
  padding: 0;
  margin: 0;
`;

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 60px;
  margin-top: 70px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const FooterItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const FooterLabel = styled.p`
  font-size: 18px;
  margin-right: 10px;
  color: #9ea0a5;
`;

export const StyledLoadingButton = styled(LoadingButton)`
  height: 45px !important;
  width: 180px !important;
  text-transform: none !important;
  background-color: #0667eb !important;
  :disabled {
    color: white !important;
    background: rgba(6, 103, 235, 0.2) !important;
  }
`;

export const StyledWarningText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 24px;
  color: #3e3f42;
  margin-top: 26px;
`;
