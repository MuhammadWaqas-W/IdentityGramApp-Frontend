import { useRef } from 'react';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import {
  CustomButton,
  CustomCheckBox,
  CustomSelect,
  CustomTextField,
} from '@atoms';
import { CustomDateRange } from '@molecules';

export const TableHeader = (props: any) => {
  const {
    colfilter,
    setFilter,
    limit,
    setLimit,
    ColFilterOptions,
    timeframe,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleClearFilter,
    resetFunc = () => {},
    colfilterRow,
    select2,
    setSelect2,
    checkboxValue,
    setCustomButton,
    clearAllBtnHandle,
    isItems = true,
    isSearch = true,
    isRow3rd = true,
  } = props;

  const searchInputRef = useRef<any>(null);

  const handleQueryChange = debounce((event: any) => {
    setFilter(event?.target?.value);
  }, 1000);

  const handleShowItems = (e: any) => setLimit(e?.target?.value);

  const showCustomFilterOptions = () => {
    return (
      colfilter &&
      ColFilterOptions &&
      Array.isArray(ColFilterOptions) &&
      ColFilterOptions?.length > 0
    );
  };

  const clearFilter = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    handleClearFilter();
    resetFunc();
  };

  const onSelectChange = (e: any) => setSelect2(e.target.value);

  return (
    <Grid container rowGap={2}>
      <Grid container spacing={5}>
        {colfilterRow && (
          <Grid item>
            <CustomDateRange
              isOpen={timeframe}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Grid>
        )}
        {showCustomFilterOptions() &&
          ColFilterOptions?.map((data: any, index: number) => {
            return (
              data?.type === 'select' && (
                <Grid
                  key={index}
                  item
                  sx={{ display: 'flex', alignItems: 'end' }}
                >
                  <Box>
                    <CustomSelect
                      styleSelect={{
                        color: 'secondary.main',
                      }}
                      styleMenu={{ color: 'secondary.main' }}
                      minWidth={170}
                      fullWidth
                      data={data?.Options}
                      name="contentUploadPlatform"
                      id="contentUploadPlatform"
                      customOnChange={data?.OnChange ?? onSelectChange}
                      customValue={select2 ?? data?.defaultValue}
                      padding={'12px 20px'}
                    />
                  </Box>
                </Grid>
              )
            );
          })}
        {clearAllBtnHandle && (
          <Grid
            item
            xs
            sx={{
              display: 'flex',
              alignItems: { sm: 'end', xs: 'center' },
              justifyContent: { sm: 'end', xs: 'center' },
            }}
          >
            <CustomButton
              borderColor="transparent"
              variant="outlined"
              background="transparent"
              onClick={clearFilter}
              fullWidth={false}
              padding={0.8}
            >
              <Typography
                variant="body1"
                sx={{ color: 'secondary.main', fontWeight: 500 }}
              >
                Clear All
              </Typography>
            </CustomButton>
          </Grid>
        )}
      </Grid>

      {isRow3rd && (
        <Grid container spacing={5}>
          {isItems && (
            <Grid
              item
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: { xs: 'auto', md: '30%' },
              }}
            >
              <CustomSelect
                minWidth={20}
                data={[
                  {
                    label: '10',
                    value: 10,
                  },
                  {
                    label: '25',
                    value: 25,
                  },
                  {
                    label: '50',
                    value: 50,
                  },
                ]}
                name="limit"
                id="limit"
                customOnChange={handleShowItems}
                customValue={limit}
                padding={'12px 20px'}
                styleSelect={{
                  color: 'secondary.main',
                }}
                styleMenu={{ color: 'secondary.main' }}
              />
              <Typography
                variant="h6"
                sx={{ ml: 2, color: 'secondary.lighter' }}
              >
                Record Per Page
              </Typography>
            </Grid>
          )}

          {showCustomFilterOptions() &&
            ColFilterOptions?.map((data: any, index: number) => {
              return (
                data?.type === 'checkbox' && (
                  <Grid item key={index}>
                    <CustomCheckBox
                      label={data?.Lable}
                      name="checkbox"
                      customValue={checkboxValue}
                      customOnChange={data?.OnChange}
                    />
                  </Grid>
                )
              );
            })}
          {isSearch && (
            <Grid
              xs
              item
              sx={{
                display: 'flex',
                alignItems: { sm: 'end', xs: 'center' },
                // justifyContent: 'end',
                justifyContent: { sm: 'end', xs: 'center' },
              }}
            >
              <CustomTextField
                id="userNameCreditPlatform"
                name="userNameCreditPlatform"
                type="text"
                inputRef={searchInputRef}
                placeholder="Search"
                customOnChange={handleQueryChange}
                fullWidth={false}
                padding={'12px 0px'}
                width={170}
                StartIcon={
                  <InputAdornment position="start" sx={{ p: 0 }}>
                    <IconButton disabled aria-label="">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {/* Button if needed Here */}
              {setCustomButton && (
                <Box sx={{ width: 'fit-content', ml: 1 }}>
                  {setCustomButton}
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      )}

      <Grid container></Grid>
    </Grid>
  );
};
