import * as Yup from 'yup';

export const SchemaAddUser = Yup.object({
  firstName: Yup.string().required('First Name Is Required'),
  lastName: Yup.string().required('Last Name Is Required'),
  email: Yup.string().required('Email Is Required'),
  contactNumber: Yup.string()
    .matches(
      /^\+44\d{10}$/,
      'Please Enter Valid Contact Number, i.e Including +44xxxxxxxxxx',
    )
    .required('Contact Number is required')
    .trim(),
  companyId: Yup.object().required('Project Title Is Required'),
});
