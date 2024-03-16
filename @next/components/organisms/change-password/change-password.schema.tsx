import * as Yup from 'yup';
const passwordValidationReg =
  /^.*(?=.{8,})((?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const schemaChangePassword = Yup.object({
  currentPassword: Yup.string().required('Password Is Required'),
  newPassword: Yup.string()
    .required('Please enter Your New Password')
    .matches(
      passwordValidationReg,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    )
    .min(8)
    .max(15),
  confirmPassword: Yup.string()
    .required('Please enter Your Confirm Password')
    .oneOf([Yup.ref('newPassword'), null], 'password must be match'),
}).required();
