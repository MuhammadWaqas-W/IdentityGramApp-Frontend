import { apisTableLoaderSX } from '@constants';
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const ApisTableLoader = () => {
  return (
    <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
      <Table sx={apisTableLoaderSX} aria-label="simple table">
        <TableHead>
          <TableRow>
            {[1, 2, 3].map((item) => (
              <TableCell key={item}>
                <Skeleton animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((item) => (
            <TableRow
              key={item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {[1, 2, 3].map((item) => (
                <TableCell key={item}>
                  <Skeleton animation="wave" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
