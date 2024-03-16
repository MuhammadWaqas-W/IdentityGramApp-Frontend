import * as Yup from 'yup';

export const AccountDetailsSchema = Yup.object({
  firstName: Yup.string().required('First Name Is Required').trim(),
  lastName: Yup.string().required('Last Name Is Required').trim(),
}).required();
