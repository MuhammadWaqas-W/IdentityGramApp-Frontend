import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
const emptyObj = {};

/////////////////////////////gettable data function//////////////////////////////////////////
export const useGetTableData = ({
  apiFunc,
  key = '',
  arrayKey = [],
  dependencies = emptyObj,
}: any) => {
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<any>(null);
  const [sort, setSort] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  ///////////////////////////////timeFramestates///////////////////////////////////////////////
  const [startDate, setStartDate] = useState<number | undefined | null>(
    undefined,
  );
  const [endDate, setEndDate] = useState<number | undefined | null>(undefined);
  const [select2, setSelect2] = useState<number | string | undefined>(
    undefined,
  );
  ////////////////////////////////timeFramestates/////////////////////////////////////////////
  // filter is used as a global filter.current page is used as a page state and limit is used as limit
  const payload = {
    offset: (currentPage - 1) * limit,
    limit: limit,
    searchTerm: filter,
    sortby: sortBy,
    sort: sort,
    from: startDate ? moment(startDate).unix() : undefined,
    to: endDate ? moment(endDate).unix() : undefined,
    select2,
  };

  const { data, isError, isSuccess, isFetching, isLoading, refetch } = useQuery(
    {
      queryKey: [
        ...arrayKey,
        key,
        {
          currentPage,
          limit,
          filter,
          sortBy,
          sort,
          startDate,
          endDate,
          select2,
          ...dependencies,
        },
      ],
      queryFn: () => apiFunc(payload),
      staleTime: Infinity,
      keepPreviousData: true,
    },
  );

  const clearFilter = () => {
    setSortBy(null);
    setSort(-1);
    setCurrentPage(1);
    setLimit(10);
    setStartDate(undefined);
    setEndDate(undefined);
    setFilter('');
    setSelect2(undefined);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  return {
    data,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    sort,
    sortBy,
    limit,
    filter,
    currentPage,
    startDate,
    endDate,
    select2,
    refetch,
    setSelect2,
    setStartDate,
    setEndDate,
    setFilter,
    setCurrentPage,
    setLimit,
    setSortBy,
    setSort,
    clearFilter,
  };
};
/////////////////////////////gettable data function//////////////////////////////////////////

export const useChangeTableData = ({
  apiFunc,
  key,
  onResponse,
  invalidationMeta,
}: any) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation(apiFunc, {
    ...onResponse,
    onSuccess: () => {
      if (invalidationMeta?.invalidateFn)
        queryClient.invalidateQueries({
          predicate: invalidationMeta.invalidateFn,
        });
      invalidationMeta?.keys?.forEach((key: any) => {
        queryClient.invalidateQueries(key);
      });
    },
  });

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
  };
};
