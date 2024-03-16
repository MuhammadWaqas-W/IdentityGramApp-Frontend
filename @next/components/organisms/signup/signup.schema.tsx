import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(80, 'First Name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z ]*$/, 'Please Enter Valid First Name')
    .required('First Name is required')
    .trim(),
  lastName: Yup.string()
    .max(80, 'Last Name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z ]*$/, 'Please Enter Valid Last Name')
    .required('Last Name is required')
    .trim(),
  email: Yup.string()
    .email('Email address is invalid')
    .required('Company Email is required'),
  contactNumber: Yup.string()
    .matches(/^\+44\d{10}$/, 'Please Enter Valid Contact Number, i.e Including +44xxxxxxxxxx')
    .required('Contact Number is required')
    .trim(),
  companyId: Yup.object().nullable().required('Product Title is required'),
  termsAndConditions: Yup.boolean().required().oneOf([true]),
});
