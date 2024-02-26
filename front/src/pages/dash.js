import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CamActive } from '../components/dashboard/camActive';
import { LatestDetections } from '../components/dashboard/knownFacesTbl';
import { CumulativeFaceCount } from '../components/dashboard/cumulativeFaceCount';
import { UnfamiliarFaces } from '../components/dashboard/total-profit';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Dashboard | Ask Sherlock
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={6}
            xs={12}
          >
            <CamActive />
          </Grid>
          <Grid
            item
            xl={6}
            lg={3}
            sm={6}
            xs={12}
          >
            <UnfamiliarFaces sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={12}
            xs={12}
          >
            <CumulativeFaceCount />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestDetections />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
