import * as Yup from 'yup';

export const schema = Yup.object({
  email: Yup.string()
    .required('Email Is Required')
    .email('Please Enter Valid Email'),
  password: Yup.string().required('Password Is Required').min(8).max(15),
}).required();
