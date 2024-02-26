import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { KnownFacesListResults } from '../components/known_faces/known_faces-list-results';
import { KnownFacesListToolbar } from '../components/known_faces/known_faces-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Transactions | Bank Inc.
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
        <KnownFacesListToolbar />
        <Box sx={{ mt: 3 }}>
          <KnownFacesListResults />
        </Box>
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
