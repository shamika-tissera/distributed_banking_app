import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { AppConfig } from "../../utils/config";
import swal from "sweetalert";

export const SettingsFaceDetectionAndRecognition = (props) => {

    // Backend URLs
    const getFaceConfigUrl = AppConfig.baseUrl + AppConfig.allFaceDetectionAndRecognitionConfigEndpoint;
    const updateFaceConfigUrl = AppConfig.baseUrl + AppConfig.updateFaceDetectionAndRecognitionConfigEndpoint;

    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(getFaceConfigUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setValues({
                    ...values,
                    "confidence": data.confidence,
                    "enabled": data.enabled
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleChange = (event) => {
        if (event.target.name === "enabled") {
            setValues({
                ...values,
                [event.target.name]: event.target.checked,
            });
        }
        else {
            setValues({
                ...values,
                [event.target.name]: parseFloat(event.target.value),
            });
        }
    };

    const handleSubmit = (event) => {
        setValues({
            ...values,
            "confidence": values.confidence
        });
        if (values.confidence < 10 || values.confidence > 100 || isNaN(values.confidence)) {
            swal("Error", "Face detection & recognition confidence must be between 10 and 100", "error");
            return;
        }
        fetch(updateFaceConfigUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
            .then(() => {
                swal("Success", "Face detection & recognition settings updated", "success");
            })
            .catch(() => {
                swal("Error", "Face detection & recognition settings failed to update", "error");
            })
    }

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }
    else {
        return (
            <form>
                <Card>
                    <CardHeader subheader="Set confidence levels for each"
                        title="Face Detection & Recognition"
                    />
                    <Divider />
                    <CardContent>
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    color="primary"
                                    defaultChecked={values.enabled}
                                    onChange={handleChange}
                                    name="enabled"
                                />
                            )}
                            label="Enable face detection & recognition"
                        />
                        <TextField
                            fullWidth
                            label="Face Detection Confidence (%)*"
                            margin="normal"
                            name="confidence"
                            onChange={handleChange}
                            type="number"
                            value={values.confidence}
                            disabled={!values.enabled}
                            error={values.confidence < 10 || values.confidence > 100 || isNaN(values.confidence)}
                            helperText={values.confidence < 10 || values.confidence > 100 || isNaN(values.confidence) ? "Confidence must be between 10 and 100" : ""}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
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
