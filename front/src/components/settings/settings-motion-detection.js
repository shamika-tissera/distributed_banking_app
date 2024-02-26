import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Grid,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppConfig } from "../../utils/config";

export const SettingsMotionDetection = (props) => {

    // backend urls
    const motionSettingsUrl = AppConfig.baseUrl + AppConfig.motionSettingsEndpoint;

    const [values, setValues] = useState({
        enabled: false,
        sensitivity: 0,
        min_area: 0,
        enabled_camera_ids: [],
        event_gap: 0,
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
        if (parseInt(event.target.name) in values.enabled_camera_ids) {
            let cameras = values.enabled_camera_ids;
            let index = cameras.indexOf(parseInt(event.target.name));

            while (cameras.indexOf(parseInt(event.target.name)) > -1) {
                index = cameras.indexOf(parseInt(event.target.name));
                cameras.splice(index, 1);

                setValues({
                    ...values,
                    enabled_camera_ids: [...new Set(cameras)],
                });
            }


        }
        else {
            // since the camera id is not in the list, add it
            setValues({
                ...values,
                enabled_camera_ids: [...values.enabled_camera_ids, parseInt(event.target.name)],
            });


        }
    };

    useEffect(() => {
        fetch(motionSettingsUrl)
            .then((res) => res.json())
            .then((data) => {
                setIsDisabled(data.enabled);
                setValues(data);
            });
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [values]);

    const validateInput = () => {
        if (values.sensitivity < 5000 || values.sensitivity > 10000 || isNaN(values.sensitivity)) {
            return false;
        }
        else if (values.min_area < 1000 || values.min_area > 10000 || isNaN(values.min_area)) {
            return false;
        }
        else if (values.event_gap < 1 || values.event_gap > 60 || isNaN(values.event_gap)) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = (event) => {

        if (!validateInput()) {
            sweetAlert("Error", "Please check your inputs", "error");
            return;
        }

        values.enabled = values.enabled;
        JSON.stringify(values)
        fetch(motionSettingsUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then(
                sweetAlert("Success", "Motion detection settings updated", "success")
            )
    }

    if (loading) {
        return <CircularProgress />;
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader subheader="Fine-tune values for each" title="Motion Detection" />
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
                            label="Enable motion detection*"
                        />

                        <TextField
                            fullWidth
                            label="Sensitivity*"
                            margin="normal"
                            name="sensitivity"
                            onChange={handleChange}
                            type="number"
                            value={values.sensitivity}
                            error={values.sensitivity < 5000 || values.sensitivity > 10000 || isNaN(values.sensitivity)}
                            helperText={values.sensitivity < 5000 || values.sensitivity > 10000 || isNaN(values.sensitivity) ? "Sensitivity must be between 5000 and 10000" : ""}
                            variant="outlined"
                            min={5000}
                            disabled={!values.enabled}
                        />

                        <TextField
                            fullWidth
                            label="Minimum Area*"
                            margin="normal"
                            name="min_area"
                            onChange={handleChange}
                            type="number"
                            value={values.min_area}
                            error={values.min_area < 1000 || values.min_area > 10000 || isNaN(values.min_area)}
                            helperText={values.min_area < 1000 || values.min_area > 10000 || isNaN(values.min_area) ? "Minimum area must be between 1000 and 10000" : ""}
                            variant="outlined"
                            disabled={!values.enabled}
                        />
                        <TextField
                            fullWidth
                            label="Event Gap (mins)*"
                            margin="normal"
                            name="event_gap"
                            onChange={handleChange}
                            type="number"
                            value={values.event_gap}
                            error={values.event_gap < 1 || values.event_gap > 60 || isNaN(values.event_gap)}
                            helperText={values.event_gap < 1 || values.event_gap > 60 || isNaN(values.event_gap) ? "Event gap must be between 1 and 60" : ""}
                            variant="outlined"
                            disabled={!values.enabled}
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
                                        Select cameras to enable motion detection
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
