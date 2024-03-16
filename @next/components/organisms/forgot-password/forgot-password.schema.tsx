import * as Yup from 'yup';

export const schemaForgotPassword = Yup.object({
  email: Yup.string()
    .required('Email Is Required')
    .email('Please Enter Valid Email'),
}).required();
