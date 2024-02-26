import Head from "next/head";
import { Box, Container, Link, Grid } from "@mui/material";
import { EventsListToolbar } from "../components/events/events-list-toolbar";
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
import { Chart } from "react-google-charts";



function Page() {

    // Backend URLs
    const getEventDetailsByDateUrl = AppConfig.baseUrl + AppConfig.eventDetailsByDateEndpoint;

    const [selected, setSelected] = useState(new Date());
    const [pieData, setPieData] = useState([]);

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
    const columns = [
        { title: "Date", field: "date", type: "date", grouping: true, draggable: true },
        { title: "Time", field: "time", type: "time" },
        //link to new page
        {
            title: "Event Type",
            field: "event_type",
            lookup: { Intruder: "Intruder", Motion: "Motion", Fire: "Fire" },
            render: (rowData) => {
                switch (rowData.event_type) {
                    case "Intruder":
                        return (
                            <Link href={`/intruder?${rowData.id}`}>{rowData.event_type}</Link>
                        );
                    case "Motion":
                        return (
                            <Link href={`/motion?${rowData.id}`}>{rowData.event_type}</Link>
                        );
                    default:
                        return <text>{rowData.event_type}</text>;
                }
            },
        },
    ];

    const options = {
        title: "Event Types",
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        if (selected === undefined) {
            return;
        }
        fetch(getEventDetailsByDateUrl + format(selected, "yyyy-MM-dd"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);

                // get the number of each event type in array data
                let eventTypes = [];
                let eventCounts = [];
                for (let i = 0; i < data.length; i++) {
                    if (!eventTypes.includes(data[i].event_type)) {
                        eventTypes.push(data[i].event_type);
                        eventCounts.push(1);
                    } else {
                        eventCounts[eventTypes.indexOf(data[i].event_type)]++;
                    }
                }

                // create the data for the pie chart
                let pieData = [["Event Type", "Count"]];
                for (let i = 0; i < eventTypes.length; i++) {
                    pieData.push([eventTypes[i], eventCounts[i]]);
                }
                setPieData(pieData);


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
                    <i>Showing events for: {format(selected, "PP")}.</i>
                </b>
            </p>
        );
    }

    return (
        <>
            <Head>
                <title>Events | Ask Sherlock</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <EventsListToolbar />
                    {/* Two boxes horizontally*/}
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
                            <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={6}
                            xs={12}
                        >
                            <Chart
                                chartType="PieChart"
                                data={pieData}
                                options={options}
                                width={"100%"}
                                height={"350px"}
                                backgroundColor={"#ffffff"}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        {/* EventsList Results */}
                        <MaterialTable
                            columns={columns}
                            title="Recorded Events"
                            icons={tableIcons}
                            data={data.map((event) => {
                                return {
                                    date: event.date,
                                    time: event.time,
                                    event_type: event.event_type,
                                    id: event.id,
                                };
                            })}
                            options={{
                                searchAutoFocus: true,
                                grouping: true,
                                exportButton: true,
                                exportAllData: true
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
