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

export const CashWithdraw = (props) => {

    // Backend URLs
    const withdrawUrl = AppConfig.baseUrl + AppConfig.withdrawEndpoint;
    // const updateDvrConfigUrl = AppConfig.baseUrl + AppConfig.updateDvrConfigEndpoint;

    const [values, setValues] = useState({
        withdraw_amount: 0
    });

    const [fetchedSettings, setFetchedSettings] = useState({});
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            withdraw_amount: 0
        },

        validationSchema: Yup.object({
          withdraw_amount: Yup.number()
          .min(1, "Withdraw amount must be positive") // minimum value is 1
          .required("Withdraw amount is required"),
        }),

        onSubmit: () => {
            handleSubmit();
        },
    });


    const handleChange = (event) => {
        if (event.target.name === "withdraw_amount") {
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
          amount: formik.values.withdraw_amount
        }

        fetch(withdrawUrl, {
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
                        subheader="Enter the amount you wish to withdraw"
                        title="Cash Withdraw"
                    />
                    <Divider />
                    <CardContent>
                        <TextField
                            fullWidth
                            error={formik.touched.withdraw_amount && Boolean(formik.errors.withdraw_amount)}
                            helperText={formik.touched.withdraw_amount && formik.errors.withdraw_amount}
                            onBlur={formik.handleBlur}
                            label="Withdraw Amount*"
                            margin="normal"
                            name="withdraw_amount"
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
                            Withdraw
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
};
