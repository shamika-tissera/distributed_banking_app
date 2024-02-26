import Head from "next/head";
import { Box, Container } from "@mui/material";
import { AttendanceListToolbar } from "../components/attendance/attendance-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useEffect, useState, forwardRef } from "react";
import "react-day-picker/dist/style.css";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { AppConfig } from "../utils/config";

function Page() {

    // Backend URLs
    const getAttendanceByDate = AppConfig.baseUrl + AppConfig.attendanceDetailsByDateEndpoint;

    const [selected, setSelected] = useState(new Date());

    // Added icons manually since they were not added automatically.
    // Consulted this link: https://stackoverflow.com/a/64612071
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    };

    // Columns for the table
    const columns = [
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        { title: "Username", field: "name" },
        { title: "Date", field: "date", type: "date" },
        { title: "Time", field: "time", type: "time" },
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        if (selected === undefined) {
            return;
        }
        fetch(getAttendanceByDate + format(selected, "yyyy-MM-dd"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [selected]);

    useEffect(() => {
        if (selected === undefined) {
            return;
        }
    }, [selected]);

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = (
            <p>
                <b>
                    <i>Attendance records for: {format(selected, "PP")}.</i>
                </b>
            </p>
        );
    }
    return (
        <>
            <Head>
                <title>Attendance | Ask Sherlock</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <AttendanceListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        {/* EventsList Results */}
                        <MaterialTable
                            columns={columns}
                            title="Attendance List"
                            icons={tableIcons}
                            data={data.map((event) => {
                                return {
                                    date: event.date,
                                    time: event.time,
                                    name: event.name,
                                    first_name: event.first_name,
                                    last_name: event.last_name,
                                };
                            })}
                            options={{
                                searchAutoFocus: true,
                                exportButton: true
                            }}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
