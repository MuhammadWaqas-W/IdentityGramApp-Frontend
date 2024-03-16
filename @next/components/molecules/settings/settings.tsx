import { CustomTextField } from '@atoms';
import { copyLinkIcon } from '@icons';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

export const SettingsMolecule = ({ callBackUrl, webhookUrls }: any) => {
  const {
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      callBackURL: callBackUrl,
      webhookEventURL: webhookUrls?.event,
      webhookDecisionsURL: webhookUrls?.decision,
      webhookAddressURL: webhookUrls?.proofAddress,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const copyLinkContent = () => {
    navigator.clipboard.writeText(callBackUrl);
  };

  return (
    <Grid container mt={3}>
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{ color: 'primary.dark', fontWeight: 600 }}
        >
          Integration Settings
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', textTransform: 'capitalize', mt: 2 }}
        >
          This section allows you to manage integration settings.
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ color: 'primary.dark', mb: 1 }}>
                Callback URL
              </Typography>
              <CustomTextField
                type="text"
                name={'callBackURL'}
                id="callBackURL"
                control={control}
                fullWidth
                notRequired
                disabled
                EndIcon={
                  <Image
                    src={copyLinkIcon}
                    alt="copyLinkIcon"
                    onClick={copyLinkContent}
                    style={{ cursor: 'pointer' }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ color: 'primary.dark', mb: 1 }}>
                Webhook Events URL
              </Typography>
              <CustomTextField
                type="text"
                name={'webhookEventURL'}
                id="webhookEventURL"
                control={control}
                fullWidth
                notRequired
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: 'primary.dark', mb: 1 }}>
                Webhook Decisions URL
              </Typography>
              <CustomTextField
                type="text"
                name={'webhookDecisionsURL'}
                id="webhookDecisionsURL"
                control={control}
                fullWidth
                notRequired
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ color: 'primary.dark', mb: 1 }}>
                Webhook Proof of address URL
              </Typography>
              <CustomTextField
                type="text"
                name={'webhookAddressURL'}
                id="webhookAddressURL"
                control={control}
                fullWidth
                notRequired
                disabled
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
