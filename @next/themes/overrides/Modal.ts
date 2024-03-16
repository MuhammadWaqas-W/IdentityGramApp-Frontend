export default function Modal() {
  return {
    '& MuiModal-root': {
      styleOverrides: {
        // Name of the slot
        root: {
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          py: 2,
          px: 4,
          borderRadius: '12px',
          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },
  };
}
