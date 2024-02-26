import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppConfig } from "../../utils/config";

export const SettingsAttendance = (props) => {

    // backend urls
    const attendanceSettingsUrl = AppConfig.baseUrl + AppConfig.attendanceSettingsEndpoint;

    const [values, setValues] = useState({
        enabled: false,
        enabled_camera_ids: [],
    });

    const [loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleChange = (event) => {
        if (event.target.name === "sensitivity" || event.target.name === "min_area" || event.target.name === "event_gap") {
            setValues({
                ...values,
                [event.target.name]: parseInt(event.target.value),
            });
        }
        else {
            if (event.target.name === "enabled") {
            }
            setValues({
                ...values,
                [event.target.name]: event.target.checked,
            });
        }
    };

    const handleCameraIdSelected = (event) => {
        if (event.target.name in values.enabled_camera_ids) {
            let cameras = values.enabled_camera_ids;
            let index = cameras.indexOf(parseInt(event.target.name));

            cameras.splice(index, 1);

            setValues({
                ...values,
                enabled_camera_ids: cameras,
            });
        }
        else {
            setValues({
                ...values,
                enabled_camera_ids: [...values.enabled_camera_ids, parseInt(event.target.name)],
            });
        }
    };

    useEffect(() => {
        fetch(attendanceSettingsUrl)
            .then((res) => res.json())
            .then((data) => {
                setIsDisabled(data.enabled);
                setValues(data);
            });
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [values]);

    const handleSubmit = (event) => {
        values.enabled = values.enabled;
        JSON.stringify(values)
        fetch(attendanceSettingsUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then(
                sweetAlert("Success", "Attendance settings updated", "success")
            )
    }

    if (loading) {
        return <CircularProgress />;
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader subheader="Select which cameras to enable attendance tracking" title="Attendance Settings" />
                    <Divider />
                    <CardContent>
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    color="primary"
                                    defaultChecked={!isDisabled}
                                    checked={values.enabled}
                                    onChange={handleChange}
                                    name="enabled"
                                />
                            )}
                            label="Enable attendance recording*"
                        />

                        <CardContent>
                            <Grid container spacing={6} wrap="wrap">
                                <Grid
                                    item
                                    md={4}
                                    sm={6}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                    xs={12}
                                >
                                    <Typography color="textPrimary" gutterBottom variant="h6">
                                        Select cameras to enable attendance recording
                                    </Typography>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(1)} onChange={handleCameraIdSelected} name={1} disabled={!values.enabled} />}
                                        label="Camera 1"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(2)} onChange={handleCameraIdSelected} name={2} disabled={!values.enabled} />}
                                        label="Camera 2"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(3)} onChange={handleCameraIdSelected} name={3} disabled={!values.enabled} />}
                                        label="Camera 3"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(4)} onChange={handleCameraIdSelected} name={4} disabled={!values.enabled} />}
                                        label="Camera 4"
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={4}
                                    sm={6}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                    xs={12}
                                ><br />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(5)} onChange={handleCameraIdSelected} name={5} disabled={!values.enabled} />}
                                        label="Camera 5"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(6)} onChange={handleCameraIdSelected} name={6} disabled={!values.enabled} />}
                                        label="Camera 6"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(7)} onChange={handleCameraIdSelected} name={7} disabled={!values.enabled} />}
                                        label="Camera 7"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={values.enabled_camera_ids.includes(8)} onChange={handleCameraIdSelected} name={8} disabled={!values.enabled} />}
                                        label="Camera 8"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            p: 2,
                        }}
                    >
                        <Button color="primary" variant="contained" onClick={handleSubmit}>
                            Update
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
};
