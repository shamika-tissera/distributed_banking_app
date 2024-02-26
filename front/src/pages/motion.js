import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AppConfig } from "../utils/config";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function Page() {
    // Backend URLs
    const getMotionDetailsById = AppConfig.baseUrl + AppConfig.motionDetailsByIdEndpoint;

    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [picList, setPicList] = useState({});
    useEffect(() => {
        function createData(name, property) {
            return { name, property };
        }


        fetch(getMotionDetailsById + window.location.href.split("?")[1])
            .then((res) => res.json())
            .then(
                (result) => {
                    let arr = [
                        createData("Event ID", result[0].id),
                        createData("Camera ID", result[0].camera_id),
                        createData("Date", result[0].date),
                        createData("Time", result[0].time),
                    ];
                    setRows(arr);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    if (!isLoaded) {
        return (
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
                <CircularProgress />
            </Grid>
        );
    } else
        return (
            <>
                <Head>
                    <title>Motion Detection Details | Ask Sherlock</title>
                </Head>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 10,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography sx={{ mb: 3 }} variant="h4">
                            Motion Detection
                        </Typography>
                        <Grid container spacing={60}>
                            <Grid item lg={12} md={12} xs={12}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableBody>
                                            {rows.map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{row.property}</StyledTableCell>

                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </>
        );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
