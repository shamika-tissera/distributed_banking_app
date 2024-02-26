import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { AppConfig } from "../utils/config";

export function Page() {

    // Backend URLs
    const getEventsById = AppConfig.baseUrl + AppConfig.eventDetailsByIdEndpoint;
    const getAllPicNamesInDetectionFolder = AppConfig.baseUrl + AppConfig.allPicNamesInDetectionFolderEndpoint;

    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [picList, setPicList] = useState({});
    useEffect(() => {
        fetch(getEventsById + window.location.href.split("?")[1])
            .then((res) => res.json())
            .then(
                (result) => {
                    setData(result[0]);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);


    useEffect(() => {
        if (data['pic_file_names'] != undefined) {
            fetch(getAllPicNamesInDetectionFolder + data['pic_file_names'])
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        let list = [];
                        result.forEach(element => {
                            list.push(data['pic_file_names'] + '+' + element);
                        });
                        setPicList(list);
                    }
                )

        }
    }, [data]);

    if (!isLoaded) {
        return (

            <Grid container
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100vh" }}>
                <CircularProgress />
            </Grid>
        );
    }
    else
        return (
            <>
                <Head>
                    <title>Event Details | Ask Sherlock</title>
                </Head>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 10,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography sx={{ mb: 3 }}
                            variant="h4">
                            Intruder Detection
                        </Typography>
                        <Grid container
                            spacing={60}>
                            <Grid item
                                lg={4}
                                md={6}
                                xs={12}>
                                <AccountProfile
                                    pic_file_names={picList}
                                />
                            </Grid>
                            <Grid item
                                lg={8}
                                md={6}
                                xs={12}>
                                <AccountProfileDetails
                                    event_type={data?.event_type}
                                    date={data?.date}
                                    time={data?.time}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </>
        );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
