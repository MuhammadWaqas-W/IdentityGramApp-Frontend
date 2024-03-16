// custom style of react select
export const customStyle = (error: any) => {
  return {
    // Fixes the overlapping problem of the component
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '46px',
    }),
    control: (provided: any) => ({
      ...provided,
      border: error && '1px solid red',
      minHeight: '40px',
      height: '46px',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '46px',
    }),
  };
};
