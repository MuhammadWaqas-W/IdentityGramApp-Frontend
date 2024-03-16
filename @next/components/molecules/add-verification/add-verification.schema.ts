import * as Yup from 'yup';

export const SchemaAddVerification = Yup.object({
  firstName: Yup.string().required('First Name Is Required'),
  lastName: Yup.string().required('Last Name Is Required'),
  integrationId: Yup.string().required('Integration Is Required'),
  uniqueIdentifier: Yup.string().required('Unique Identifier Is Required'),
}).required();
export const SchemaAddVerificationSuperAdmin = Yup.object({
  firstName: Yup.string().required('First Name Is Required'),
  lastName: Yup.string().required('Last Name Is Required'),
  integrationId: Yup.string().required('Integration Is Required'),
  uniqueIdentifier: Yup.string().required('Unique Identifier Is Required'),
  companyId: Yup.string().required('Company Is Required'),
}).required();
