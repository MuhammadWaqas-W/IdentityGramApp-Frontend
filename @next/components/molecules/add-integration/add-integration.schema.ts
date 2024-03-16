import * as Yup from 'yup';

export const SchemaAddVerification = Yup.object({
  name: Yup.string().required('Integration Name Is Required'),
  type: Yup.string().required('Integration Type Is Required'),
});
