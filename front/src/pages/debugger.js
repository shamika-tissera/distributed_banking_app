import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { DebuggerListToolbar } from "../components/debugger/debugger-list-toolbar";
import { DebuggerCard } from "../components/debugger/debugger-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { demoVideoSources } from "../__mocks__/demoVideoSources";


const sources = demoVideoSources;

const Page = () => (
    <>
        <Head>
            <title>Debugger | Ask Sherlock</title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <DebuggerListToolbar />
                <Box sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {sources.map((source) => (
                            <Grid item key={source.id} lg={4} md={6} xs={12}>
                                <DebuggerCard videoSource={source} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 3,
                    }}
                >
                </Box>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
