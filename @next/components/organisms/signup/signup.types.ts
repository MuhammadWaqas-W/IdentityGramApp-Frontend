export interface IFormValuesType {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  companyId: string;
}

export interface LoadOptionTypes {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export interface CompanyListValuesType {
  label: string;
  value: string;
}
