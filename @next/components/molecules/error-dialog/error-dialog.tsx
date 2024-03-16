import React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { useAppSelector, useAppDispatch } from '@hooks';
import * as S from './error-dialog.styles';

export const ErrorDialog = (): JSX.Element => {
  const { message, tokenLoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleCloseDialog = (val: boolean) => {
    // dispatch(authActions.setErrorDialog());
  };
  return (
    <Dialog
      fullWidth
      sx={{ '& .MuiDialog-paper': { maxWidth: '700px' } }}
      open={tokenLoginError}
      onClose={() => handleCloseDialog(false)}
    >
      <S.MainContainer>
        <S.CloseContainer>
          <CloseIcon
            style={{ color: '#E6492D', cursor: 'pointer' }}
            onClick={() => handleCloseDialog(false)}
          />
        </S.CloseContainer>
        <S.ErrorContainer>
          <ErrorIcon sx={{ fontSize: 100, color: '#E6492D' }} />
        </S.ErrorContainer>
        <S.StyledWarningText>
          Something went wrong. Please try again.
        </S.StyledWarningText>
        {/* <S.StyledWarningText>{message}</S.StyledWarningText> */}
      </S.MainContainer>
    </Dialog>
  );
};
