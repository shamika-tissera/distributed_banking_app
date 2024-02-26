import { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import swal from 'sweetalert';

import * as React from "react";

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
import { Avatar } from "@mui/material";
import { AuthTester } from "../../auth/authTester";
import { AppConfig } from "../../utils/config"

import { Backdrop, CircularProgress } from "@mui/material";
// import { LineChart } from '@mui/x-charts/LineChart';
import { Chart } from "react-google-charts";


export const KnownFacesListResults = ({ faces, ...rest }) => {

  // Backend URLs
  const getTransactionsListUrl = AppConfig.baseUrl + AppConfig.getTransactionsListEndpoint;
  const deleteFaceUrl = AppConfig.baseUrl + AppConfig.deleteFaceEndpoint;
  const updateFaceUrl = AppConfig.baseUrl + AppConfig.updateFaceDetailsEndpoint;
  const profilePictureUrl = AppConfig.baseUrl + AppConfig.profilePictureEndpoint;

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
    { title: "Transaction Type", field: "transaction_type", editable: false },
    { title: "Amount", field: "amount", editable: false },
    { title: "Date", field: "date", editable: false },
    { title: "Time", field: "time", editable: false },
    { title: "Status", field: "status" },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [chartData, setChartData] = useState([]);

  const data1 = [
    ["Date", "Cumulative Cash Flow"],
    ["2004", 1000],
    ["2004", 1170],
    ["2004", 660],
    ["2004", 1030],
  ];

  const options = {
    title: "Portfolio Changes for the Last Six Months",
    curveType: "function",
    legend: { position: "bottom" },
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let l = AuthTester()
    console.log(l);
  }, [])

  useEffect(() => {
    fetch(getTransactionsListUrl + "/" + localStorage.getItem('username'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data["transactions"]);

        let temp = [];
        let sum = 0;
        // transactions = data["transactions"]

        for (const rec of data["transactions"]) {
          sum += rec["amount"];
          let date = String(rec["date"]);
          temp.push([date, sum]);

        }
        console.log('====================================');
        console.log(temp);
        console.log('====================================');
        setChartData([["Date", "Cumulative Amount"], ...temp]);



      })

      .then(() => setIsLoading(false))

      // .catch((err) => console.log(err));
  }, []);



  if (!isLoading) {
    return (
      <>

      <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={chartData}
            options={options}
          />

      <MaterialTable
        columns={columns}
        title="Recorded Data"
        icons={tableIcons}
        data={data.map((record) => {
          return {
            transaction_type: Math.sign(record.amount) === -1 ? "Debit" : "Credit",
            amount: Math.sign(record.amount) === -1 ? "(" + (record.amount * -1) + ")" : record.amount,
            status: record.status,
            date: record.date,
            time: record.time,
          };
        })}
        options={{
          searchAutoFocus: true,
          exportButton: true,
          exportAllData: true,
          actionsColumnIndex: -1,
        }}
      />
      </>
    );
  }
  else {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
};
