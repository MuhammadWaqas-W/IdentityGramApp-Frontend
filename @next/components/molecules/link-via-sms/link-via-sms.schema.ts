import * as Yup from 'yup';

export const SchemaViaSms = Yup.object({
  value: Yup.string()
    .matches(
      /^\+44\d{10}$/,
      'Please Enter Valid Contact Number, i.e Including +44xxxxxxxxxx',
    )
    .required('Contact Number is required')
    .trim(),
}).required();
