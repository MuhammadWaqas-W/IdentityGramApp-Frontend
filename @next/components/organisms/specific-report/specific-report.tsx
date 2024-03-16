import React, { useEffect, useMemo, useState } from 'react';
import { awsBaseUrl, endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { useAppSelector, useGetTableData } from '@hooks';
import { CustomTable, SpecficReportButton, TableHeader } from '@molecules';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { Status, UserName } from '@atoms';
import { userAvatar } from '@icons';
import { ReportVerificationDataModal } from '../report-verifaction-data-modal';
import moment from 'moment';
import { logoAvatar } from '@images';

export const SpecificReportOrganisms = () => {
  const [status, setStatus] = useState('');
  const [linkType, setLinkType] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [document, setDocument] = useState('');
  const [company, setCompany] = useState([]);
  const router = useRouter();

  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  // FETCH COMPANIES API CALL
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res: any = await apiGetRequest(endpoints?.getCompanies);
        const { data } = res;
        const options = data?.data?.map((item: { title: any; _id: any }) => ({
          label: item?.title,
          value: item?._id,
        }));
        setCompany(options);
      } catch (error) {
      } finally {
      }
    };
    fetchCompanies();
  }, []);
  // FETCH COMPANIES API CALL

  const resetFunc = () => {
    setDocument('');
    setCompanyId('');
    setStatus('');
  };

  const ColFilterOptions = useMemo(() => {
    return [
      {
        type: 'select',
        defaultValue: status,
        Options: [
          { label: 'Status', value: '' },
          { label: 'Approved', value: 'Approved' },
          { label: 'Declined', value: 'Declined' },
        ],
        OnChange: ({ target }: any) => setStatus(target?.value),
      },
      role === 'SUPER_ADMIN' && {
        type: 'select',
        defaultValue: companyId,
        Options: [{ label: 'Product Title', value: '' }, ...company],
        OnChange: ({ target }: any) => setCompanyId(target?.value),
      },
      role === 'SIMPLE_USER' && {
        type: 'select',
        defaultValue: document,
        Options: [
          { label: 'Document Type', value: '' },
          { label: 'Passport', value: 'Passport' },
          { label: 'License', value: 'License' },
          { label: 'Address Permit', value: 'Address Permit' },
          { label: 'Proof of Address', value: 'Proof Address' },
        ],
        OnChange: ({ target }: any) => setDocument(target?.value),
      },
      {
        type: 'select',
        defaultValue: linkType,
        Options: [
          { label: 'Verification Method', value: '' },
          { label: 'SMS', value: 'SMS' },
          { label: 'LINK', value: 'EMAIL' },
          { label: 'QR CODE', value: 'QRCODE' },
        ],
        OnChange: ({ target }: any) => setLinkType(target?.value),
      },
    ];
  }, [status, linkType, company, document]);

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
      documentType: role === 'SIMPLE_USER' ? document : router.query.reports,
      dateFrom: dateFrom ? moment.unix(dateFrom).format('YYYY-MM-DD') : '',
      dateTo: dateTo ? moment.unix(dateTo).format('YYYY-MM-DD') : '',
      status,
      linkType,
      companyId,
    };
    return router?.isReady
      ? apiGetRequest(endpoints?.getReports, null, payload)
      : '';
  };

  const querydata = useMemo(() => {
    return {
      key: endpoints?.getReports,
      apiFunc: res,
      dependencies: { status, linkType, companyId, document },
    };
  }, [
    router.query.reports,
    status,
    linkType,
    companyId,
    document,
    router?.isReady,
  ]);

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

  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) => (
          <UserName
            image={userAvatar}
            name={row.firstName + ' ' + row.lastName}
          />
        ),
        id: 'userName1',
        cell: (info: any) => info.getValue(),
        header: () => <span>User Name</span>,
      },

      {
        accessorFn: (row: any) => (
          <UserName
            image={logoAvatar}
            name={row.company?.title}
            borderRadius={0}
          />
        ),
        id: 'requestedBy',
        cell: (info: any) => info.getValue(),
        header: () => <span>Requested By</span>,
      },
      {
        accessorFn: (row: any) => row?.documentType ?? '---',
        id: 'documentType',
        cell: (info: any) => info.getValue(),
        header: () => <span>Document Type</span>,
      },
      {
        accessorFn: (row: any) => row?.company?.title ?? '-',
        id: 'productTitle',
        cell: (info: any) => info.getValue(),
        header: () => <span>Product Title</span>,
      },
      {
        accessorFn: (row: any) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Status
              title={row.status}
              color={
                row.status === 'Approved'
                  ? '#065F46'
                  : row.status === 'Declined'
                  ? '#FF624E'
                  : '-'
              }
              bgColor={
                row.status === 'Approved'
                  ? '#D1FAE5'
                  : row.status === 'Declined'
                  ? 'rgba(255, 98, 78, 0.12);'
                  : '-'
              }
              styleWrapper={{ width: '111px' }}
            />
          </Box>
        ),
        id: 'status',
        cell: (info: any) => info.getValue(),
        header: () => <span>Verification Status</span>,
      },
      {
        accessorFn: (row: any) => row?.linkType ?? '-',
        id: 'linkType',
        cell: (info: any) => info.getValue(),
        header: () => <span>Verificaton Via</span>,
      },
      {
        accessorFn: (row: any) => row?.createdAt ?? '-',
        id: 'createdAt',
        cell: (info: any) =>
          moment(info.getValue()).format('DD MMM HH:mm') ?? '-',
        header: () => <span>Verification Date</span>,
      },
      {
        accessorFn: (row: any) => row?.action ?? '-',
        id: 'actions',
        cell: (info: any) => (
          <ReportVerificationDataModal
            verificationId={info?.row?.original?._id}
            // handleExportPdf={handleExportPdf}
          />
        ),
        header: () => <span>Actions</span>,
      },
    ],
    [],
  );
  const filteredColumn =
    role === 'COMPANY_ADMIN'
      ? columns.filter(
          (item) =>
            item?.id !== 'requestedBy' &&
            item?.id !== 'productTitle' &&
            item?.id !== 'documentType',
        )
      : role === 'SIMPLE_USER'
      ? columns.filter(
          (item) => item?.id !== 'userName1' && item?.id !== 'productTitle',
        )
      : role === 'COMPANY_ADMIN'
      ? columns.filter(
          (item) => item?.id !== 'requestedBy' && item?.id !== 'documentType',
        )
      : columns;

  return (
    <React.Fragment>
      <TableHeader
        handleClearFilter={clearFilter}
        colfilter
        ColFilterOptions={ColFilterOptions}
        resetFunc={resetFunc}
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
        clearAllBtnHandle={true}
        setCustomButton={<SpecficReportButton />}
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
    </React.Fragment>
  );
};
