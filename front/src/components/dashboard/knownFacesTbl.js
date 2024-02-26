import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { useEffect, useState } from 'react';
import { AppConfig } from '../../utils/config';
import NextLink from 'next/link';

export const LatestDetections = () => {

  // Backend URLs
  const getInAndOutByDateUrl = AppConfig.baseUrl + AppConfig.inAndOutByDateEndpoint;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    fetch(getInAndOutByDateUrl + date)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        console.error("Failed to fetch in and out details");
      });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [data])


  if (loading) {
    return (
      <p>Loading...</p>
    );
  }
  else {
    return (
      <Card>
        <CardHeader title="Known Faces Recorded Today" />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    NAME
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        TIME
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    CAMERA IN (ID)
                  </TableCell>
                  <TableCell>
                    CAMERA OUT (ID)
                  </TableCell>
                  <TableCell>
                    Time Spent (Hrs)
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((order) => (
                  <TableRow
                    hover
                    key={order.username}
                  >
                    <TableCell>
                      {order.username}
                    </TableCell>
                    <TableCell>
                      {order.time}
                    </TableCell>
                    <TableCell>
                      {order.camera_in}
                    </TableCell>
                    <TableCell>
                      {order.camera_out}
                    </TableCell>
                    <TableCell>
                      {order.time_diff}
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={(order.status === 'out' && 'success')
                          || (order.status === 'in' && 'error')
                          || 'warning'}
                      >
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <NextLink href="/inAndOutMore"
            passHref
          >
            <Button
              color="primary"
              endIcon={<ArrowRightIcon fontSize="small" />}
              size="small"
              variant="text"
            >
              View all
            </Button>
          </NextLink>
        </Box>
      </Card>
    );
  }
}