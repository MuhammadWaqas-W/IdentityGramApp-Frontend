import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minHeight: 250,
  bgcolor: 'background.paper',
  boxShadow: 20,
  py: 2,
  px: 4,
  width: { xs: '80%', sm: '60%', md: '40%', xl: '30%' },
};

export const AccessDenied = ({ open, handleClose }: any) => {
  return (
    <Box className="eligibillity-checker-pop-up">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            borderRadius: '8px',
            border: 'none',
            '&:focus-visible': {
              outline: 'none',
            },
          }}
          className="eligibillity-checker-modal"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <CloseIcon
                onClick={handleClose}
                sx={{ color: '#ABA7AF', cursor: 'pointer' }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ color: 'red' }}>
                Access Denied !
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                textAlign: 'center',
                mt: 3,
              }}
            >
              <Typography variant="body1">
                You Have Currently No Permissions Or Permission Service is
                Temporarily Down , Please Try Again
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
