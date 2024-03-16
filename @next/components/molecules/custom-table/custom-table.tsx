import { useState } from 'react';
import {
  Grid,
  TableCell,
  Typography,
  Pagination,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Box } from '@mui/system';
import { NoContentFound, TableLoader } from '@molecules';

const emptyArray: [] = [];

export const CustomTable = (props: any) => {
  const [rowSelection, setRowSelection] = useState({});
  const {
    columns,
    data,
    isLoading,
    isError,
    isSuccess,
    count,
    limit = 10,
    currentPage,
    setCurrentPage,
    setSortBy,
    setSort,
    isFetching,
    maxHeight = 560,
    minHeight = 512,
    isPagination = true,
  } = props;

  const handleSortBy = (column: any) => {
    setSortBy(column);
    setSort((previous: number) => (previous === 1 ? -1 : 1));
  };
  const table = useReactTable({
    data: data ?? emptyArray,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Grid container>
      <Grid xs={12} item>
        <Box sx={{ overflowX: 'auto' }}>
          {isLoading || isFetching ? (
            <TableLoader />
          ) : (
            <TableContainer
              sx={{
                borderRadius: '10px',
                border: '1px solid #E8E8EC',
                '&::-webkit-scrollbar': {
                  width: 5,
                  height: 6,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#19456A',
                  borderRadius: 2,
                },
                minHeight: minHeight,
                maxHeight: maxHeight,
              }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{
                  '& thead': {
                    position: 'sticky',
                    top: 0,
                  },
                  '& .MuiTableRow-root:hover': {
                    backgroundColor: 'transparent !important',
                  },
                }}
              >
                <TableHead sx={{ zIndex: 1 }}>
                  {table?.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={`headGroup-${headerGroup?.id}`}>
                      {headerGroup.headers.map((header: any) => (
                        <TableCell
                          key={`head-${header?.id}`}
                          sx={{
                            '&:first-of-type': {
                              display: 'flex',
                              alignItems: 'start',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              gap: '5px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'default',
                            }}
                          >
                            <Box
                              onClick={() =>
                                header.column.columnDef.sorticon === false ||
                                header.column.columnDef.id !== 'action'
                                  ? undefined
                                  : handleSortBy(header?.id)
                              }
                              sx={{
                                color: 'primary.light',
                                fontSize: '16px',
                                fontFamily: 'poppins',
                                fontWeight: 500,
                                gap: '5px',
                                cursor: 'pointer',
                                width: 'max-content',
                              }}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                              {header.column.columnDef.id === 'action' ||
                              header.column.columnDef.sorticon ===
                                false ? null : (
                                <Box sx={{ cursor: 'pointer' }}>
                                  {/* <img src={updown} alt="" /> */}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>

                {isSuccess && table.getRowModel().rows.length > 0 && (
                  <TableBody
                    sx={
                      {
                        // '& :hover': {
                        //   backgroundColor: 'transparent !important',
                        // },
                      }
                    }
                  >
                    {table.getRowModel().rows?.map((row: any) => (
                      <TableRow key={row?.id}>
                        {row.getVisibleCells().map((cell: any) => (
                          <TableCell
                            key={cell?.id}
                            align="center"
                            sx={{
                              color: 'primary.light',
                              '&:first-of-type': {
                                display: 'flex',
                                alignItems: 'start',
                              },
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
              {(isError || table.getRowModel().rows.length === 0) && (
                <Grid
                  container
                  alignItems={'center'}
                  justifyContent={'center'}
                  padding={5}
                >
                  <Grid item width={200}>
                    <NoContentFound />
                  </Grid>
                </Grid>
              )}
            </TableContainer>
          )}
        </Box>
        {isPagination && (
          <Grid container>
            <Grid xs={12} item>
              {isSuccess && Boolean(table?.getRowModel()?.rows?.length) && (
                <Box sx={{ display: 'flex', my: '15px' }}>
                  <Box>
                    <Typography
                      sx={{
                        color: '#625E66',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                      component={'span'}
                    >
                      Showing {(currentPage - 1) * limit + 1} of{' '}
                      {currentPage * limit} out of {count * limit}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: 'auto' }}>
                    <Pagination
                      sx={{
                        '.MuiButtonBase-root': {
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          height: '34px',
                          width: '34px',
                        },
                        '.Mui-selected': {
                          backgroundColor: '#645CAA !important',
                          color: '#FFFFFF',
                        },
                      }}
                      showFirstButton
                      showLastButton
                      hidePrevButton
                      hideNextButton
                      size="small"
                      variant="outlined"
                      shape="rounded"
                      count={count}
                      page={currentPage}
                      onChange={(e, page) => {
                        setCurrentPage(page);
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
