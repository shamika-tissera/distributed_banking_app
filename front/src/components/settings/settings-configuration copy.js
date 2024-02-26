import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import swal from "sweetalert";
import { AppConfig } from "../../utils/config";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SettingsConfiguration = (props) => {

    // Backend URLs
    const getAllDvrConfigUrl = AppConfig.baseUrl + AppConfig.allDvrConfigEndpoint;
    const updateDvrConfigUrl = AppConfig.baseUrl + AppConfig.updateDvrConfigEndpoint;

    const [values, setValues] = useState({
        dvr_ip: "",
        dvr_port: 0,
        dvr_username: "",
        dvr_password: "",
        dvr_auto_scan_enabled: true
    });

    const [fetchedSettings, setFetchedSettings] = useState({});
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            dvr_ip: "",
            dvr_port: 0,
            dvr_username: "",
            dvr_password: "",
            dvr_auto_scan_enabled: false
        },

        validationSchema: Yup.object({
            dvr_username: Yup.string().max(255).required("Username is required"),
            dvr_password: Yup.string().max(255).required("Password is required"),
            dvr_ip: Yup.string().max(255).required("IP is required"),
            dvr_ip: Yup.string().matches(
                /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                "Please enter a valid IP address"
            ),
            dvr_port: Yup.number().required("Port is required"),
        }),

        onSubmit: () => {
            handleSubmit();
        },
    });


    const handleChange = (event) => {
        if (event.target.name === "dvr_port") {
            setValues({
                ...values,
                [event.target.name]: parseInt(event.target.value),
            });
        }
        else if (event.target.name === "dvr_auto_scan_enabled") {
            setValues({
                ...values,
                [event.target.name]: event.target.checked,
            });

            // provide user a warning if they are disabling auto scan
            if (!event.target.checked) {
                swal({
                    title: "Warning!",
                    text: "Disabling auto scan will require you to manually configure DVR settings.\nIf settings are not set properly, main functionality of the system will be affected.\nProceed with caution!",
                    icon: "warning",
                    dangerMode: true,
                })

            }

        }
        else {
            setValues({
                ...values,
                [event.target.name]: event.target.value,
            });
        }
    };

    useEffect(() => {
        fetch(getAllDvrConfigUrl)
            .then((res) => res.json())
            .then((data) => {
                setValues(data);

                // set formik values
                formik.setFieldValue("dvr_ip", data.dvr_ip);
                formik.setFieldValue("dvr_port", data.dvr_port);
                formik.setFieldValue("dvr_username", data.dvr_username);
                formik.setFieldValue("dvr_password", data.dvr_password);
                formik.setFieldValue("dvr_auto_scan_enabled", data.dvr_auto_scan_enabled);

                setFetchedSettings(data);
            });
    }, []);

    useEffect(() => {
        console.log(fetchedSettings);
        if (Object.keys(fetchedSettings).length > 0) {
            console.log('stopped');
            setLoading(false);
        }
    }, [fetchedSettings]);

    const handleSubmit = () => {

        // create a new object to send to backend using formik values
        const newValues = {
            dvr_ip: formik.values.dvr_ip,
            dvr_port: formik.values.dvr_port,
            dvr_username: formik.values.dvr_username,
            dvr_password: formik.values.dvr_password,
            dvr_auto_scan_enabled: formik.values.dvr_auto_scan_enabled
        }

        fetch(updateDvrConfigUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newValues),
        })
            .then((res) => console.log(res))
            .then((data) => {
                swal(
                    "Success!",
                    "DVR configuration settings have been updated!",
                    "success"
                );
            });
    };

    if (loading) {
        return <CircularProgress />;
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader
                        subheader="Configure DVR connection settings"
                        title="DVR Connection Settings"
                    />
                    <Divider />
                    <CardContent>

                        <FormControlLabel
                            control={<Checkbox
                                color="primary"
                                defaultChecked={formik.values.dvr_auto_scan_enabled}
                            />}
                            label="Manage by system"
                            name="dvr_auto_scan_enabled"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            error={formik.touched.dvr_ip && Boolean(formik.errors.dvr_ip)}
                            helperText={formik.touched.dvr_ip && formik.errors.dvr_ip}
                            onBlur={formik.handleBlur}
                            label="DVR IP*"
                            margin="normal"
                            name="dvr_ip"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.dvr_ip}
                            variant="outlined"
                            disabled={formik.values.dvr_auto_scan_enabled}
                        />

                        <TextField
                            fullWidth
                            error={formik.touched.dvr_port && Boolean(formik.errors.dvr_port)}
                            helperText={formik.touched.dvr_port && formik.errors.dvr_port}
                            onBlur={formik.handleBlur}
                            label="RTSP Port*"
                            margin="normal"
                            name="dvr_port"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.dvr_port}
                            variant="outlined"
                            disabled={formik.values.dvr_auto_scan_enabled}
                        />
                        <TextField
                            error={formik.touched.dvr_username && Boolean(formik.errors.dvr_username)}
                            helperText={formik.touched.dvr_username && formik.errors.dvr_username}
                            fullWidth
                            label="DVR Username*"
                            margin="normal"
                            name="dvr_username"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.dvr_username}
                            variant="outlined"
                        />
                        <TextField
                            error={formik.touched.dvr_password && Boolean(formik.errors.dvr_password)}
                            helperText={formik.touched.dvr_password && formik.errors.dvr_password}
                            onBlur={formik.handleBlur}
                            fullWidth
                            label="DVR Password*"
                            margin="normal"
                            name="dvr_password"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.dvr_password}
                            variant="outlined"
                        />
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            p: 2,
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={formik.handleSubmit}
                        >
                            Update
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
};
