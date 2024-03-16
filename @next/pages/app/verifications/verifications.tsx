import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@layouts';
import { VerificationsOrg, SimpleUserVerification } from '@organisms';
import { Box } from '@mui/material';
import { useAppSelector, useChangeTableData, useGetTableData } from '@hooks';
import { CustomTable, TableHeader } from '@molecules';
import { awsBaseUrl, endpoints } from '@config';
import { apiGetRequest, apiPostRequest } from '@helpers';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { UserName, Status } from '@atoms';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import moment from 'moment';
import { continueIcon } from '@icons';
import Image from 'next/image';
import { userAvatar } from '@icons';

export const Verifications = (): JSX.Element => {
  const router = useRouter();
  const { user }: any = useAppSelector((state: { auth: any }) => state.auth);
  const role = user?.roles?.length && user?.roles[0];
  const [documentType, setDocumentType] = useState('');
  const [status, setStatus] = useState<any>('');
  const [verificationResponseData, setVerificationResponseData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompanies] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    router.isReady && router.query.keyword
      ? setStatus(router.query.keyword)
      : '';
  }, [router.isReady, router.query.keyword]);

  const resetFunc = () => {
    setDocumentType('');
    setSelectedCompanies('');
    setStatus('');
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res: any = await apiGetRequest(endpoints?.getCompanies);
        const { data } = res;
        const options = data?.data?.map((item: { title: any; _id: any }) => ({
          label: item?.title,
          value: item?._id,
        }));
        setCompanies(options);
      } catch (error) {}
    };
    role === 'SUPER_ADMIN' && fetchCompanies();
  }, []);

  const addNewVerification = {
    apiFunc: ({
      firstName,
      lastName,
      integrationId,
      uniqueIdentifier,
    }: any) => {
      const payload = { firstName, lastName, integrationId, uniqueIdentifier };
      return apiPostRequest(endpoints?.addVerification, payload);
    },
    invalidationMeta: {
      keys: [
        {
          queryKey: [endpoints.verificationCompanyData],
        },
      ],
    },
  };
  const addVerificationByAdmin = {
    apiFunc: ({
      firstName,
      lastName,
      integrationId,
      uniqueIdentifier,
      companyId,
    }: any) => {
      const payload = {
        firstName,
        lastName,
        integrationId,
        uniqueIdentifier,
        companyId,
      };
      return apiPostRequest(endpoints?.addVerificationByAdmin, payload);
    },
    invalidationMeta: {
      keys: [
        {
          queryKey: [endpoints.verificationCompanyData],
        },
      ],
    },
  };

  const ColFilterOptions = useMemo(() => {
    return [
      {
        type: 'select',
        defaultValue: status,
        Options: [
          { label: 'Status', value: '' },
          { label: 'Not Started', value: 'Not Started' },
          { label: 'Started', value: 'Started' },
          { label: 'Submitted', value: 'Submitted' },
          { label: 'Approved', value: 'Approved' },
          { label: 'Declined', value: 'Declined' },
          { label: 'Expired', value: 'Expired' },
          { label: 'Abandoned', value: 'Abandoned' },
        ],
        OnChange: ({ target }: any) => setStatus(target?.value),
      },
      role === 'SUPER_ADMIN' && {
        type: 'select',
        defaultValue: selectedCompany,
        Options: [{ label: 'Product Title', value: '' }, ...companies],
        OnChange: ({ target }: any) => setSelectedCompanies(target?.value),
      },
      {
        type: 'select',
        defaultValue: documentType,
        Options: [
          { label: 'Document Type', value: '' },
          { label: 'Passport', value: 'Passport' },
          { label: 'Driving License', value: 'License' },
          { label: 'Residence Permit', value: 'Address Permit' },
          { label: 'Proof of Address', value: 'Proof Address' },
        ],
        OnChange: ({ target }: any) => setDocumentType(target?.value),
      },
    ];
  }, [status, documentType, selectedCompany, companies]);

  const res = ({
    offset,
    limit,
    searchTerm: search,
    from: dateFrom,
    to: dateTo,
  }: any) => {
    const payload = {
      offset,
      limit,
      search,
      documentType,
      status,
      dateFrom: dateFrom ? moment.unix(dateFrom).format('YYYY-MM-DD') : '',
      dateTo: dateTo ? moment.unix(dateTo).format('YYYY-MM-DD') : '',
      companyId: selectedCompany,
    };
    return apiGetRequest(endpoints?.verificationCompanyData, null, payload);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.verificationCompanyData,
      apiFunc: res,
      dependencies: { status, documentType, selectedCompany },
    };
  }, [status, documentType, selectedCompany]);

  const {
    data,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    limit,
    filter,
    currentPage,
    startDate,
    endDate,
    select2,
    setSelect2,
    setFilter,
    setCurrentPage,
    setLimit,
    setSortBy,
    setSort,
    setStartDate,
    setEndDate,
    clearFilter,
  } = useGetTableData(querydata);

  //Mutate table Data on Add New Verification-------------------------------------

  const { isLoading: isLoadingMutation, mutate: addVerficationMutate } =
    useChangeTableData(
      role === 'SUPER_ADMIN' ? addVerificationByAdmin : addNewVerification,
    );

  //Add new Verification Form Hanlder-------------------------------------

  const handleAddVerification = (values: any) => {
    const formData: any = values;
    addVerficationMutate(formData, {
      onSuccess: addVerificationSuccess,
      onError,
    });
  };
  const addVerificationSuccess = ({ data }: any) => {
    enqueueSnackbar(data?.message || 'SuccessFully', {
      variant: 'success',
    });
    setVerificationResponseData(data?.data);
  };
  //End Add new Verification Form Hanlder-------------------------------------
  // Succcess and Error Messages Handlers
  const onError = (error: any) => {
    enqueueSnackbar(error || 'Something Went Wrong', {
      variant: 'error',
    });
  };
  // Succcess and Error Messages Handlers

  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) => (
          <UserName
            image={userAvatar}
            name={`${row?.firstName ?? '--'} ${row?.lastName}`}
          />
        ),
        id: 'userName',
        cell: (info: any) => info.getValue(),
        header: () => <Box>USER NAME</Box>,
      },
      {
        accessorFn: (row: any) => (
          <UserName
            image={userAvatar}
            name={row?.company?.title ?? '--'}
          />
        ),
        id: 'requestedBy',
        cell: (info: any) => info.getValue(),
        header: () => <Box>REQUESTED BY</Box>,
      },

      {
        accessorFn: (row: any) => row?.company?.title ?? '--',
        id: 'productTitle',
        cell: (info: any) => info.getValue(),
        header: () => <span>PRODUCT TITLE</span>,
      },
      {
        accessorFn: (row: any) =>
          row?.status ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Status
                // styleWrapper={{ width: '110px' }}
                title={row.status}
                color={
                  row.status === 'Declined'
                    ? '#B45050'
                    : row.status === 'Approved'
                    ? '#065F46'
                    : row.status === 'Not Started'
                    ? '#950F61'
                    : row.status === 'Expired'
                    ? '#FF624E'
                    : row.status === 'Abandoned'
                    ? '#816405'
                    : row.status === 'Started'
                    ? '#645CAA'
                    : row.status === 'Submitted'
                    ? '#0243BC'
                    : '-'
                }
                bgColor={
                  row.status === 'Declined'
                    ? 'rgba(254, 226, 226, 1)'
                    : row.status === 'Approved'
                    ? 'rgba(209, 250, 229, 1)'
                    : row.status === 'Not Started'
                    ? 'rgba(255, 240, 255, 1)'
                    : row.status === 'Expired'
                    ? 'rgba(255, 98, 78, 0.12)'
                    : row.status === 'Abandoned'
                    ? '#FFE99F'
                    : row.status === 'Started'
                    ? '#F5F4FF'
                    : row.status === 'Submitted'
                    ? '#D1E1FF'
                    : '-'
                }
              />
            </Box>
          ) : (
            '-'
          ),
        id: 'status',
        cell: (info: any) => info.getValue(),
        header: () => <span>STATUS</span>,
      },
      {
        accessorFn: (row: any) => row?.documentType ?? '--',
        id: 'documentType',
        cell: (info: any) => info.getValue(),
        header: () => <span>DOCUMENT TYPE</span>,
      },
      {
        accessorFn: (row: any) => row?.updatedAt ?? '--',
        id: 'lastUpdate',
        cell: (info: any) =>
          moment(info.getValue()).format('DD MMM HH:mm') ?? '--',
        header: () => <span>LAST UPDATE</span>,
      },
      {
        accessorFn: (row: any) => row?._id ?? '--',
        id: 'action',
        cell: (info: any) =>
          info?.row?.original?.status === 'Not Started' &&
          role !== 'SIMPLE_USER' ? (
            <Box
              onClick={() =>
                info?.row?.original?.status !== 'Not Started' &&
                router.push({
                  pathname: '/app/verifications/verification-detail',
                  query: { keyword: info?.row?.original?._id },
                })
              }
              sx={{
                cursor:
                  info?.row?.original?.status === 'Not Started'
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              <VisibilityOutlinedIcon
                sx={{
                  color:
                    info?.row?.original?.status === 'Not Started'
                      ? 'action.disabled'
                      : '',
                }}
              />
            </Box>
          ) : info?.row?.original?.status === 'Not Started' &&
            role === 'SIMPLE_USER' ? (
            <SimpleUserVerification
              verificationResponseData={info?.row?.original}
            />
          ) : info?.row?.original?.status === 'Started' &&
            role === 'SIMPLE_USER' ? (
            <Box
              onClick={() =>
                router.push({
                  pathname: '/app/verifications/verification-session',
                  query: { keyword: info?.row?.original?.linkCode },
                })
              }
              sx={{
                cursor: 'pointer',
              }}
            >
              <Image src={continueIcon} alt="" />
            </Box>
          ) : (
            <Box
              onClick={() =>
                router.push({
                  pathname: '/app/verifications/verification-detail',
                  query: { keyword: info?.row?.original?._id },
                })
              }
              sx={{
                cursor: 'pointer',
              }}
            >
              <VisibilityOutlinedIcon />
            </Box>
          ),
        header: () => <span>ACTION</span>,
      },
    ],
    [],
  );
  let filteredColumn: any = [];
  if (role === 'SUPER_ADMIN') {
    filteredColumn = columns.filter((item) => item.id !== 'requestedBy');
  } else if (role === 'SIMPLE_USER') {
    filteredColumn = columns.filter(
      (item) => item.id !== 'userName' && item.id !== 'productTitle',
    );
  } else if (role === 'COMPANY_ADMIN') {
    filteredColumn = columns.filter(
      (item) => item.id !== 'productTitle' && item.id !== 'requestedBy',
    );
  }

  return (
    <React.Fragment>
      <Box>
        <TableHeader
          handleClearFilter={clearFilter}
          resetFunc={resetFunc}
          colfilter
          ColFilterOptions={ColFilterOptions}
          timeframe
          colfilterRow
          limit={limit}
          filter={filter}
          setFilter={setFilter}
          setLimit={setLimit}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          select2={select2}
          setSelect2={setSelect2}
          clearAllBtnHandle
          setCustomButton={
            role !== 'SIMPLE_USER' && (
              <VerificationsOrg
                handleAddVerification={handleAddVerification}
                isLoading={isLoadingMutation}
                verificationResponseData={verificationResponseData}
              />
            )
          }
        />
        <CustomTable
          data={data?.data?.data?.verifications}
          columns={filteredColumn}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          count={Math.ceil(data?.data?.data?.meta?.total / limit)}
          limit={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSortBy={setSortBy}
          setSort={setSort}
        />
      </Box>
    </React.Fragment>
  );
};

Verifications.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
