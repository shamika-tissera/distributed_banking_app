import { useEffect, useState, forwardRef } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import { AppConfig } from "../../utils/config";
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
import { Router } from "next/router";

export const SettingsEvents = (props) => {
    // Backend URLs
    const getScriptDetailsUrl = AppConfig.baseUrl + AppConfig.allScriptDetailsEndpoint;
    const uploadScriptUrl = AppConfig.baseUrl + AppConfig.uploadScriptEndpoint;
    const updateScriptUrl = AppConfig.baseUrl + AppConfig.updateScriptEndpoint;
    const addScriptDetailsUrl = AppConfig.baseUrl + AppConfig.addScriptDetailsEndpoint;
    const deleteScriptUrl = AppConfig.baseUrl + AppConfig.deleteScriptDetailsEndpoint;

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

    const [values, setValues] = useState({
        password: "",
        confirm: "",
    });

    const [rows, setRows] = useState([]);
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [callerFunction, setCallerFunction] = useState("");
    const [eventName, setEventName] = useState("");

    const columns = [
        { field: "id", title: "ID", hidden: true },
        { field: "description", title: "Description" },
        { field: "caller_functions", title: "Caller Function" },
        { field: "file_names", title: "File Name" },
        { field: "event", title: "Event Type" },
        { field: "isEnabled", title: "Is Enabled", type: "boolean" },
    ];

    const handleChange = (event) => {
        if (event.target.name === "file") {
            setFile(event.target.files[0]);
        } else if (event.target.name === "name") {
            setName(event.target.value);
        } else if (event.target.name === "description") {
            setDescription(event.target.value);
        } else if (event.target.name === "callerFunction") {
            setCallerFunction(event.target.value);
        } else if (event.target.name === "eventName") {
            setEventName(event.target.value);
        }
    };

    const validateInput = () => {
        if (file === null) {
            sweetAlert("Error", "Please upload a file", "error");
            return false;
        } else if (name === "" || !/^[a-zA-Z0-9_]+$/.test(name)) {
            sweetAlert("Error", "Please enter a valid name for the script", "error");
            return false;
        } else if (description === "") {
            sweetAlert("Error", "Please enter a valid description for the script", "error");
            return false;
        } else if (callerFunction === "" || !/\w+\(\w+,\s*\w+\)/i.test(callerFunction)) {
            sweetAlert("Error", "Please enter a valid caller function with only two arguments for the script", "error");
            return false;
        } else if (eventName === "") {
            sweetAlert("Error", "Please enter a valid event name for the script", "error");
            return false;
        } else {
            return true;
        }
    };

    const handleSubmit = (event) => {
        // upload only the file

        if (!validateInput()) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        fetch(uploadScriptUrl, {
            method: "POST",
            body: formData,
        })
        .catch((error) => {
            console.log(error);
            sweetAlert("Error", "Error uploading file", "error");
        })


        fetch(addScriptDetailsUrl, {
            method: "POST",
            //also include jwt token
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_token"),
            },


            body: JSON.stringify({
                file_names: file.name,
                caller_functions: callerFunction,
                description: description,
                event: eventName,
                isEnabled: 0
            })

        })
            .then((response) => {
                if (response.status === 200) {
                    sweetAlert("Success", "Script added successfully", "success");
                } else if (response.status === 401) {
                    sweetAlert("Error", "Please login again", "error");
                    Router
                        .push("/login")
                }
            })
            .then(() => {
                // refresh the table
                fetch(getScriptDetailsUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setRows(data);
                    })
            })
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        // update the row in the backend
        let dataToUpdate = newData;
        let data = JSON.stringify(dataToUpdate);
        fetch(updateScriptUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_token"),
            },
            body: data,
        }).then((data) => {
            const dataUpdate = [...rows];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setRows([...dataUpdate]);
        })
            .catch((error) => {
                console.log(error);
                resolve();
            });
    };

    const handleRowDelete = (oldData, resolve) => {
        // delete the row in the backend
        fetch(deleteScriptUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_token"),
            },
            body: JSON.stringify({
                id: oldData.id,
                file_names: oldData.file_names,
                event: oldData.event,
            }),
        }).then(() => {
            // refresh the table
            fetch(getScriptDetailsUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setRows(data);
                })

        })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetch(getScriptDetailsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setRows(data);
            });
    }, []);

    return (
        <form {...props}>
            <Card>
                <CardHeader
                    subheader="Manage custom scripts"
                    title="Custom Event Scripts"
                />
                <Divider />

                <CardContent>
                    {/* A file uploader with a submit button to upload a python file */}
                    <div>
                        <Typography variant="h6">Upload custom script</Typography>
                        <div className="p-3 mb-2 bg-primary bg-gradient text-white rounded-5">
                            Warning: Be careful when uploading custom scripts. Only upload if you trust the
                            source!
                        </div>
                        <br />
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleChange}
                            accept=".py"
                        />
                        {/* Text field to enter the name and description */}
                        <TextField
                            fullWidth
                            label="Name*"
                            margin="normal"
                            name="name"
                            onChange={handleChange}
                            type="text"
                            value={name}
                            variant="outlined"
                            error={/^[a-z][a-z '-.,]{0,31}$|^$/i.test(name) ? false : true}
                            helperText={!/^[a-z][a-z '-.,]{0,31}$|^$/i.test(name) ? "Please enter a valid name" : null}
                        />
                        <TextField
                            fullWidth
                            label="Description*"
                            margin="normal"
                            name="description"
                            onChange={handleChange}
                            type="text area"
                            value={description}
                            variant="outlined"
                            multiline
                            rows={2}
                            maxRows={Infinity}
                        />
                        <TextField
                            fullWidth
                            label="Caller Function*"
                            margin="normal"
                            name="callerFunction"
                            onChange={handleChange}
                            type="text"
                            value={callerFunction}
                            variant="outlined"
                            helperText={true ? "Please enter a valid Python function call with only two parameters" : null}
                        />
                        <TextField
                            fullWidth
                            label="Event Type*"
                            margin="normal"
                            name="eventName"
                            onChange={handleChange}
                            type="text"
                            value={eventName}
                            variant="outlined"
                            error={/^[a-z][a-z '-.,]{0,31}$|^$/i.test(eventName) ? false : true}
                            helperText={!/^[a-z][a-z '-.,]{0,31}$|^$/i.test(eventName) ? "Please enter a valid event name" : null}
                        />
                        <br />
                        {/* Submit button right aligned */}
                        <div style={{ textAlign: "right" }}>
                            <Button variant="contained" component="span" onClick={handleSubmit}>
                                Upload
                            </Button>
                        </div>
                    </div>
                    <br />
                    <br />

                    <MaterialTable
                        title="Custom Event Scripts"
                        columns={columns}
                        data={rows}
                        icons={tableIcons}
                        options={{
                            headerStyle: {
                                backgroundColor: "#f3f4f6",
                                color: "#000000",
                            },
                            actionsColumnIndex: -1,
                        }}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            handleRowUpdate(newData, oldData);
                                        }
                                    }, 600);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        handleRowDelete(oldData);
                                    }, 600);
                                }),
                        }}
                    />
                </CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                    }}
                ></Box>
            </Card>
            <Divider />
            <Divider />
        </form>
    );
};
