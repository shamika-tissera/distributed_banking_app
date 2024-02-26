import { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import swal from 'sweetalert';

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
import { Link } from "@mui/material";
import { LoginRedirect } from "../../auth/loginRedirect";
import { AppConfig } from "../../utils/config";

export const EventsListResults = ({ faces, ...rest }, test) => {

  // Backend URLs
  const getAllEventsUrl = AppConfig.baseUrl + AppConfig.allEventsEndpoint

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

    { title: "Date", field: "date", type: "date" },
    { title: "Time", field: "time", type: "time" },
    //link to new page
    {
      title: "Event Type", field: "event_type", render: rowData =>
        <Link
          href={`/intruder?${rowData.id}`}
        >
          {rowData.event_type}
        </Link>
    },
  ];

  useEffect(() => {
    console.log(test);
  }, [test]);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(getAllEventsUrl)
      .then((res) => {
        res.json();
        LoginRedirect(res)
      })
      .then((data) => setData(data))
      .catch((err) => swal("Oops!!!", "Please check whether the backend API is up and running!", "error"));
  }, []);
  return (
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
      options={{ searchAutoFocus: true }}
    />
  );
};
