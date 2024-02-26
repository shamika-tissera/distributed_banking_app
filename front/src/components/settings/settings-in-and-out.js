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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppConfig } from "../../utils/config";
import { videoSources } from "../../__mocks__/videoSources";
import swal from "sweetalert";

export const SettingsInAndOut = (props) => {

    // backend urls
    const inAndOutSettingsUrl = AppConfig.baseUrl + AppConfig.allInAndOutEndpoint;
    const updateInAndOutSettingsUrl = AppConfig.baseUrl + AppConfig.updateInAndOutEndpoint;

    const [values, setValues] = useState({
        enabled: false,
        sensitivity: 0,
        min_area: 0,
        enabled_camera_ids: [],
        event_gap: 0,
    });

    const [motionSettings, setMotionSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [cameraNum, setCameraNum] = useState(0);
    const [cameraIds, setCameraIds] = useState([]);

    const [defaultChecked, setDefaultChecked] = useState(false);

    const [oriInCameras, setOriInCameras] = useState([]);
    const [oriOutCameras, setOriOutCameras] = useState([]);

    const [enabled, setEnabled] = useState(false);

    const [inCam1, setInCam1] = useState(0);
    const [inCam2, setInCam2] = useState(0);
    const [inCam3, setInCam3] = useState(0);
    const [inCam4, setInCam4] = useState(0);
    const [inCam5, setInCam5] = useState(0);
    const [inCam6, setInCam6] = useState(0);
    const [inCam7, setInCam7] = useState(0);
    const [inCam8, setInCam8] = useState(0);
    const [inCam9, setInCam9] = useState(0);
    const [inCam10, setInCam10] = useState(0);

    const [outCam1, setOutCam1] = useState(0);
    const [outCam2, setOutCam2] = useState(0);
    const [outCam3, setOutCam3] = useState(0);
    const [outCam4, setOutCam4] = useState(0);
    const [outCam5, setOutCam5] = useState(0);
    const [outCam6, setOutCam6] = useState(0);
    const [outCam7, setOutCam7] = useState(0);
    const [outCam8, setOutCam8] = useState(0);
    const [outCam9, setOutCam9] = useState(0);
    const [outCam10, setOutCam10] = useState(0);

    useEffect(() => {
        // get the count of all cameras in the array
        setCameraNum(videoSources.length);

        // get all camera ids
        let ids = [];
        videoSources.forEach((camera) => {
            let firstDigit = camera.cameraId.toString().charAt(0);
            ids.push(parseInt(firstDigit));
        });

        setCameraIds(ids);
    }, []);

    const handleCameraChange = (event) => {
        let selectedComboBoxId = event.target.name.split("_")[1];
        if (event.target.name.includes("in")) {
            switch (selectedComboBoxId) {
                case "1":
                    if (event.target.value === "-") {
                        setInCam1(0);
                        break;
                    }
                    setInCam1(event.target.value);
                    break;
                case "2":
                    if (event.target.value === "-") {
                        setInCam2(0);
                        break;
                    }
                    setInCam2(event.target.value);
                    break;
                case "3":
                    if (event.target.value === "-") {
                        setInCam3(0);
                        break;
                    }
                    setInCam3(event.target.value);
                    break;
                case "4":
                    if (event.target.value === "-") {
                        setInCam4(0);
                        break;
                    }
                    setInCam4(event.target.value);
                    break;
                case "5":
                    if (event.target.value === "-") {
                        setInCam5(0);
                        break;
                    }
                    setInCam5(event.target.value);
                    break;
                case "6":
                    if (event.target.value === "-") {
                        setInCam6(0);
                        break;
                    }
                    setInCam6(event.target.value);
                    break;
                case "7":
                    if (event.target.value === "-") {
                        setInCam7(0);
                        break;
                    }
                    setInCam7(event.target.value);
                    break;
                case "8":
                    if (event.target.value === "-") {
                        setInCam8(0);
                        break;
                    }
                    setInCam8(event.target.value);
                    break;
                case "9":
                    if (event.target.value === "-") {
                        setInCam9(0);
                        break;
                    }
                    setInCam9(event.target.value);
                    break;
                case "10":
                    if (event.target.value === "-") {
                        setInCam10(0);
                        break;
                    }
                    setInCam10(event.target.value);
                default:
                    break;
            }
        } else {
            switch (selectedComboBoxId) {
                case "1":
                    if (event.target.value === "-") {
                        setOutCam1(0);
                        break;
                    }
                    setOutCam1(event.target.value);
                    break;
                case "2":
                    if (event.target.value === "-") {
                        setOutCam2(0);
                        break;
                    }
                    setOutCam2(event.target.value);
                    break;
                case "3":
                    if (event.target.value === "-") {
                        setOutCam3(0);
                        break;
                    }
                    setOutCam3(event.target.value);
                    break;
                case "4":
                    if (event.target.value === "-") {
                        setOutCam4(0);
                        break;
                    }
                    setOutCam4(event.target.value);
                    break;
                case "5":
                    if (event.target.value === "-") {
                        setOutCam5(0);
                        break;
                    }
                    setOutCam5(event.target.value);
                    break;
                case "6":
                    if (event.target.value === "-") {
                        setOutCam6(0);
                        break;
                    }
                    setOutCam6(event.target.value);
                    break;
                case "7":
                    if (event.target.value === "-") {
                        setOutCam7(0);
                        break;
                    }
                    setOutCam7(event.target.value);
                    break;
                case "8":
                    if (event.target.value === "-") {
                        setOutCam8(0);
                        break;
                    }
                    setOutCam8(event.target.value);
                    break;
                case "9":
                    if (event.target.value === "-") {
                        setOutCam9(0);
                        break;
                    }
                    setOutCam9(event.target.value);
                    break;
                case "10":
                    if (event.target.value === "-") {
                        setOutCam10(0);
                        break;
                    }
                    setOutCam10(event.target.value);
                    break;
                default:
                    break;
            }
        }
        console.log(event);
    };

    const handleEnabledChange = (event) => {
        setEnabled(event.target.checked);
    };

    const handleChange = (event) => {
        if (event.target.name === "sensitivity" || event.target.name === "min_area" || event.target.name === "event_gap") {
            setValues({
                ...values,
                [event.target.name]: parseInt(event.target.value),
            });
        }
        else {
            if (event.target.name === "enabled") {
                if (isDisabled) {
                    setIsDisabled(false);
                }
                else {
                    setIsDisabled(true);
                }
            }
            setValues({
                ...values,
                [event.target.name]: event.target.value,
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
        fetch(inAndOutSettingsUrl)
            .then((res) => res.json())
            .then((data) => {
                setEnabled(data[0].enabled);
                setDefaultChecked(data[0].enabled);
                setOriInCameras(data[0].in_cameras);
                setOriOutCameras(data[0].out_cameras);

                for (let i = 0; i < data[0].in_cameras.length; i++) {
                    switch (i) {
                        case 0:
                            setInCam1(data[0].in_cameras[i]);
                            setOutCam1(data[0].out_cameras[i]);
                            break;
                        case 1:
                            setInCam2(data[0].in_cameras[i]);
                            setOutCam2(data[0].out_cameras[i]);
                            break;
                        case 2:
                            setInCam3(data[0].in_cameras[i]);
                            setOutCam3(data[0].out_cameras[i]);
                            break;
                        case 3:
                            setInCam4(data[0].in_cameras[i]);
                            setOutCam4(data[0].out_cameras[i]);
                            break;
                        case 4:
                            setInCam5(data[0].in_cameras[i]);
                            setOutCam5(data[0].out_cameras[i]);
                            break;
                        case 5:
                            setInCam6(data[0].in_cameras[i]);
                            setOutCam6(data[0].out_cameras[i]);
                            break;
                        case 6:
                            setInCam7(data[0].in_cameras[i]);
                            setOutCam7(data[0].out_cameras[i]);
                            break;
                        case 7:
                            setInCam8(data[0].in_cameras[i]);
                            setOutCam8(data[0].out_cameras[i]);
                            break;
                        case 8:
                            setInCam9(data[0].in_cameras[i]);
                            setOutCam9(data[0].out_cameras[i]);
                            break;
                        case 9:
                            setInCam10(data[0].in_cameras[i]);
                            setOutCam10(data[0].out_cameras[i]);
                            break;
                        default:
                            break;
                    }
                }
            });
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [values]);

    const validateCameraSelection = () => {
        // The condition is that if an out camera is selected, then the in camera must be selected as well and vice versa

        if ((inCam1 === 0 && outCam1 !== 0) || (inCam1 !== 0 && outCam1 === 0)) {
            return false;
        }
        if ((inCam2 === 0 && outCam2 !== 0) || (inCam2 !== 0 && outCam2 === 0)) {
            return false;
        }
        if ((inCam3 === 0 && outCam3 !== 0) || (inCam3 !== 0 && outCam3 === 0)) {
            return false;
        }
        if ((inCam4 === 0 && outCam4 !== 0) || (inCam4 !== 0 && outCam4 === 0)) {
            return false;
        }
        if ((inCam5 === 0 && outCam5 !== 0) || (inCam5 !== 0 && outCam5 === 0)) {
            return false;
        }
        if ((inCam6 === 0 && outCam6 !== 0) || (inCam6 !== 0 && outCam6 === 0)) {
            return false;
        }
        if ((inCam7 === 0 && outCam7 !== 0) || (inCam7 !== 0 && outCam7 === 0)) {
            return false;
        }
        if ((inCam8 === 0 && outCam8 !== 0) || (inCam8 !== 0 && outCam8 === 0)) {
            return false;
        }
        if ((inCam9 === 0 && outCam9 !== 0) || (inCam9 !== 0 && outCam9 === 0)) {
            return false;
        }
        if ((inCam10 === 0 && outCam10 !== 0) || (inCam10 !== 0 && outCam10 === 0)) {
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {

        if (enabled) {
            let isValid = validateCameraSelection();
            if (!isValid) {
                swal("Error", "Please select a pair of cameras.", "error");
                return;
            }
            let inCameras = [];
            let outCameras = [];
            if (inCam1 !== 0) {
                inCameras.push(inCam1);
                outCameras.push(outCam1);
            }
            if (inCam2 !== 0) {
                inCameras.push(inCam2);
                outCameras.push(outCam2);
            }
            if (inCam3 !== 0) {
                inCameras.push(inCam3);
                outCameras.push(outCam3);
            }
            if (inCam4 !== 0) {
                inCameras.push(inCam4);
                outCameras.push(outCam4);
            }
            if (inCam5 !== 0) {
                inCameras.push(inCam5);
                outCameras.push(outCam5);
            }
            if (inCam6 !== 0) {
                inCameras.push(inCam6);
                outCameras.push(outCam6);
            }
            if (inCam7 !== 0) {
                inCameras.push(inCam7);
                outCameras.push(outCam7);
            }
            if (inCam8 !== 0) {
                inCameras.push(inCam8);
                outCameras.push(outCam8);
            }
            if (inCam9 !== 0) {
                inCameras.push(inCam9);
                outCameras.push(outCam9);
            }
            if (inCam10 !== 0) {
                inCameras.push(inCam10);
                outCameras.push(outCam10);
            }
            let data = {
                enabled: enabled,
                in_cameras: inCameras,
                out_cameras: outCameras,
            };

            fetch(updateInAndOutSettingsUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((data) => {
                    swal("Success", "Settings updated successfully.", "success");
                });
        }
        else {
            let data = {
                enabled: enabled,
                in_cameras: oriInCameras,
                out_cameras: oriOutCameras,
            };
            fetch(updateInAndOutSettingsUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((data) => {
                    swal("Success", "Settings updated successfully.", "success");
                });
        }

    }

    if (loading) {
        return <CircularProgress />;
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader
                        subheader="Fine-tune values for each"
                        title="In and Out"
                    />
                    <Divider />
                    <CardContent>


                        <FormControlLabel
                            control={(
                                <Checkbox
                                    color="primary"
                                    defaultChecked={defaultChecked}
                                    checked={enabled}
                                    onChange={handleEnabledChange}
                                    name="enabled"
                                />
                            )}
                            label="Enable face detection & recognition"
                        />

                        <CardContent>
                            <Grid
                                container
                                spacing={6}
                                wrap="wrap"
                            >
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
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                    >
                                        In Camera
                                    </Typography>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_1"}
                                            value={inCam1 == 0 ? '-' : inCam1}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_2"}
                                            value={inCam2 == 0 ? '-' : inCam2}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_3"}
                                            value={inCam3 == 0 ? '-' : inCam3}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_4"}
                                            value={inCam4 == 0 ? '-' : inCam4}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_5"}
                                            value={inCam5 == 0 ? '-' : inCam5}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_6"}
                                            value={inCam6 == 0 ? '-' : inCam6}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_7"}
                                            value={inCam7 == 0 ? '-' : inCam7}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_8"}
                                            value={inCam8 == 0 ? '-' : inCam8}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_9"}
                                            value={inCam9 == 0 ? '-' : inCam9}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"inCamera_10"}
                                            value={inCam10 == 0 ? '-' : inCam10}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

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
                                >
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                    >
                                        Out Camera
                                    </Typography>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_1"}
                                            value={outCam1 == 0 ? '-' : outCam1}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_2"}
                                            value={outCam2 == 0 ? '-' : outCam2}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_3"}
                                            value={outCam3 == 0 ? '-' : outCam3}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_4"}
                                            value={outCam4 == 0 ? '-' : outCam4}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_5"}
                                            value={outCam5 == 0 ? '-' : outCam5}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_6"}
                                            value={outCam6 == 0 ? '-' : outCam6}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_7"}
                                            value={outCam7 == 0 ? '-' : outCam7}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_8"}
                                            value={outCam8 == 0 ? '-' : outCam8}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_9"}
                                            value={outCam9 == 0 ? '-' : outCam9}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={"outCamera_10"}
                                            value={outCam10 == 0 ? '-' : outCam10}
                                            onChange={handleCameraChange}
                                            disabled={!enabled}
                                        >
                                            <MenuItem value={'-'}>-</MenuItem>
                                            {cameraIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                    </FormControl>

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
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
};
