import * as Yup from 'yup';

export const SchemaViaEmail = Yup.object({
  value: Yup.string()
    .required('Email Is Required')
    .email('Please Enter Valid Email'),
}).required();
