import * as Yup from 'yup';

// Schema for Simple user and Super Admin
export const profileValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'First Name should have Aplhabets only')
    .required('First Name is required')
    .trim(),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Last Name should have Aplhabets only')
    .required('Last Name is required')
    .trim(),
  contactNumber: Yup.string()
    .matches(
      /^\+44\d{10}$/,
      'Please Enter Valid Contact Number, i.e Including +44xxxxxxxxxx',
    )
    .required('Contact Number is required')
    .trim(),
});

// Schema for Company Admin
export const companyAdminValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'First Name should have Aplhabets only')
    .required('First Name is required')
    .trim(),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Last Name should have Aplhabets only')
    .required('Last Name is required')
    .trim(),
  contactNumber: Yup.string()
    .matches(
      /^\+44\d{10}$/,
      'Please Enter Valid Contact Number, i.e Including +44xxxxxxxxxx',
    )
    .required('Contact Number is required')
    .trim(),
  date: Yup.string().required('Date is required').trim(),
});
