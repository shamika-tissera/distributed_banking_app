import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { AppConfig } from "../../utils/config";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SettingsNotifications = (props) => {
    // Backend URLs
    const getAllNotificationsUrl = AppConfig.baseUrl + AppConfig.allNotificationsEndpoint;
    const updateFaceConfigUrl =
        AppConfig.baseUrl + AppConfig.updateFaceDetectionAndRecognitionConfigEndpoint;

    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true);


    const [templates, setTemplates] = useState({});

    const formik = useFormik({
        initialValues: {
            optionEnabled: false,
            bearerToken: "",
            version: "",
            phoneNum1: "-",
            phoneNum2: "-",
            phoneNum3: "-",
            phoneNum1Id: "-",
            phoneNum2Id: "-",
            phoneNum3Id: "-",
        },

        validationSchema: Yup.object({
            bearerToken: Yup.string().max(255).required("Bearer Token is required"),
            version: Yup.string().max(255).required("Version is required"),
            phoneNum1: Yup.string().max(255).required("Phone Number 1 is required"),
            phoneNum1Id: Yup.string().max(255).required("Phone Number 1 ID is required"),
        }),

        onSubmit: () => {
            handleSubmit();
        },
    });

    useEffect(() => {
        fetch(getAllNotificationsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {

                // set formik values
                formik.setFieldValue("optionEnabled", data[0].enabled);
                formik.setFieldValue("bearerToken", data[0].bearer_token);
                formik.setFieldValue("version", data[0].version);
                formik.setFieldValue("phoneNum1", data[0].phone_numbers[0]);
                formik.setFieldValue("phoneNum2", data[0].phone_numbers[1]);
                formik.setFieldValue("phoneNum3", data[0].phone_numbers[2]);
                formik.setFieldValue("phoneNum1Id", data[0].phone_number_ids[0]);
                formik.setFieldValue("phoneNum2Id", data[0].phone_number_ids[1]);
                formik.setFieldValue("phoneNum3Id", data[0].phone_number_ids[2]);

                setTemplates(data[0].templates);

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmit = () => {
        let phoneNumbersTemp = [
            formik.values.phoneNum1,
            formik.values.phoneNum2,
            formik.values.phoneNum3,
        ];
        let phoneNumberIdsTemp = [
            formik.values.phoneNum1Id,
            formik.values.phoneNum2Id,
            formik.values.phoneNum3Id,
        ];

        // remove all undefined values from phone numbers array
        phoneNumbersTemp = phoneNumbersTemp.filter(function (el) {
            return el != null;
        });

        // remove all undefined values from phone number ids array
        phoneNumberIdsTemp = phoneNumberIdsTemp.filter(function (el) {
            return el != null;
        });

        // create object using formik values
        const body = {
            enabled: formik.values.optionEnabled,
            bearer_token: formik.values.bearerToken,
            version: formik.values.version,
            phone_numbers: phoneNumbersTemp,
            phone_number_ids: phoneNumberIdsTemp,
            templates: templates,
        };

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
    };

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <form>
                <Card>
                    <CardHeader subheader="Configure WhatsApp notification settings" title="Notifications" />
                    <Divider />
                    <CardContent>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    defaultChecked={formik.values.optionEnabled}
                                    onChange={formik.handleChange}
                                    name="optionEnabled"
                                />
                            }
                            label="Enable real-time notifications"
                        />
                        <TextField
                            fullWidth
                            label="Bearer Token*"
                            margin="normal"
                            name="bearerToken"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.bearerToken}
                            variant="outlined"
                            inputProps={{ min: 10, max: 1000 }}
                            disabled={!formik.values.optionEnabled}
                            error={formik.touched.bearerToken && Boolean(formik.errors.bearerToken)}
                            helperText={formik.touched.bearerToken && formik.errors.bearerToken}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            label="Version*"
                            margin="normal"
                            name="version"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.version}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
                            disabled={!formik.values.optionEnabled}
                            error={formik.touched.version && Boolean(formik.errors.version)}
                            helperText={formik.touched.version && formik.errors.version}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number 1*"
                            margin="normal"
                            name="phoneNum1"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phoneNum1}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
                            disabled={!formik.values.optionEnabled}
                            error={formik.touched.phoneNum1 && Boolean(formik.errors.phoneNum1)}
                            helperText={formik.touched.phoneNum1 && formik.errors.phoneNum1}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number 1 ID*"
                            margin="normal"
                            name="phoneNum1Id"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phoneNum1Id}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
                            disabled={!formik.values.optionEnabled}
                            error={formik.touched.phoneNum1Id && Boolean(formik.errors.phoneNum1Id)}
                            helperText={formik.touched.phoneNum1Id && formik.errors.phoneNum1Id}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number 2"
                            margin="normal"
                            name="phoneNum2"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phoneNum2}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
                            disabled={!formik.values.optionEnabled}
                            error={formik.touched.phoneNum2 && Boolean(formik.errors.phoneNum2)}
                            helperText={formik.touched.phoneNum2 && formik.errors.phoneNum2}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number 2 ID"
                            margin="normal"
                            name="phoneNum2Id"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phoneNum2Id}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
                            disabled={!formik.values.optionEnabled}
                            error={formik.touched.phoneNum2Id && Boolean(formik.errors.phoneNum2Id)}
                            helperText={formik.touched.phoneNum2Id && formik.errors.phoneNum2Id}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number 3"
                            margin="normal"
                            name="phoneNum3"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phoneNum3}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
                            disabled={!formik.values.optionEnabled}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number 3 ID"
                            margin="normal"
                            name="phoneNum3Id"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phoneNum3Id}
                            variant="outlined"
                            inputProps={{ min: 10, max: 100 }}
                            disabled={!formik.values.optionEnabled}
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
                        <Button color="primary" variant="contained" onClick={handleSubmit}>
                            Update
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
};
