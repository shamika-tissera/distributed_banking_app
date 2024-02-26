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

export const CashDeposit = (props) => {

    // Backend URLs
    const depositUrl = AppConfig.baseUrl + AppConfig.depositEndpoint;
    const updateDvrConfigUrl = AppConfig.baseUrl + AppConfig.updateDvrConfigEndpoint;

    const [values, setValues] = useState({
        deposit_amount: 0
    });

    const [fetchedSettings, setFetchedSettings] = useState({});
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            deposit_amount: 0
        },

        validationSchema: Yup.object({
            deposit_amount: Yup.number().required("Deposit amount is required"),
        }),

        onSubmit: () => {
            handleSubmit();
        },
    });


    const handleChange = (event) => {
        if (event.target.name === "deposit_amount") {
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

    const handleSubmit = () => {

        // create a new object to send to backend using formik values
        const newValues = {
          amount: formik.values.deposit_amount
        }

        fetch(depositUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("jwt_token"),
            },
            body: JSON.stringify(newValues),
        })
            .then((res) => console.log(res))
            .then((data) => {
                swal(
                    "Success!",
                    "Your money has been deposited successfully!",
                    "success"
                );
            });
    };

    if (false) {
        return <CircularProgress />;
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader
                        subheader="Enter the amount you wish to deposit"
                        title="Cash Deposit"
                    />
                    <Divider />
                    <CardContent>
                        <TextField
                            fullWidth
                            error={formik.touched.deposit_amount && Boolean(formik.errors.deposit_amount)}
                            helperText={formik.touched.deposit_amount && formik.errors.deposit_amount}
                            onBlur={formik.handleBlur}
                            label="Deposit Amount*"
                            margin="normal"
                            name="deposit_amount"
                            onChange={formik.handleChange}
                            type="number"
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
                            Deposit
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
};
