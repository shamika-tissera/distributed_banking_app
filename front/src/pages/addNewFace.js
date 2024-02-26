import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from 'sweetalert';
import FormData from 'form-data';
import { AuthTester } from "../auth/authTester";
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    Box,
    Button,
    Checkbox,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileUpload from "../components/fileUploader/file-upload.component";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppConfig } from "../utils/config";

const Register = () => {

    // Backend URLs
    const registerFaceUrl = AppConfig.baseUrl + AppConfig.registerFaceEndpoint;
    const countFacesInUploadedPictureUrl = AppConfig.baseUrl + AppConfig.countFacesInUploadedPictureEndpoint;
    const uploadImageToServerUrl = AppConfig.baseUrl + AppConfig.uploadFacePictureEndpoint;


    let picturesAcceptable = true;
    let picturesUploaded = false;
    const uploadImages = () => {
        for (let index = 0; index < facesArr.length; index++) {
            var d = new FormData();
            d.append("faces", facesArr[index]);
            fetch(uploadImageToServerUrl, {
                method: "POST",
                body: d,
            }).then((response) => {
                response.json().then((body) => {
                    //this.setState({ imageURL: `http://localhost:5000/${body.file}` });
                });
            });
        }
    };

    useEffect(() => {
        AuthTester();
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            username: "",
            notify: false,
            trackMovements: false
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
            firstName: Yup.string().max(255).required("First name is required"),
            lastName: Yup.string().max(255).required("Last name is required"),
            username: Yup.string().max(255).required("Username is required"),
            faces: Yup.array().min(1, "Must have at least one image"),
        }),
        onSubmit: () => {
            const data = new FormData();
            data.append("email", formik.values.email);
            data.append("firstName", formik.values.firstName);
            data.append("lastName", formik.values.lastName);
            data.append("uname", formik.values.username);
            data.append("notify", formik.values.notify);
            data.append("trackMovements", formik.values.trackMovements);
            if (picturesAcceptable && true) {
                axios.post(registerFaceUrl, data).then((res) => {
                    if (res.status == 200) {
                        let response = swal("Success", "User has been registered successfully!", "success");
                        if (response) {
                            Router.push("/knownFaces");
                        }
                    }
                }).catch((err) => {
                    swal("Username taken", "Please select another username.", "error");
                });
                uploadImages();
            }
            else {
                let response = swal("Error", "Please upload images that are of the same size", "error");
                if (response) {
                    Router.push("/addNewFace");
                }
            }
        },
    });

    const validateFaces = (files) => {
        let isValid = true;
        let numFaces = 0;
        let file = files[files.length - 1];
        let d = new FormData();
        d.append("faces", file);
        fetch(countFacesInUploadedPictureUrl, {
            method: "POST",
            body: d,
        }).then((response) => {
            //extract data from response
            response.json().then((body) => {
                body = parseInt(body);
                numFaces = body;
                if (body != 1) {
                    isValid = false;
                    picturesAcceptable = false; // This way we can ensure that if at least one picture is not acceptable, the user cannot submit the form
                }
            }).then(() => {
                if (!isValid) {
                    if (numFaces == 0) {
                        swal("No faces detected in image!", "Please select an image with exactly one face.", "error");
                    } else {
                        swal("Multiple faced detected in image!", "Please select an image with exactly one face.", "error");
                    }
                }
            }).catch((err) => {
                swal("Username Taken", "Please select another username", "error");
            });
        });
    };

    const [facesArr, setFacesArr] = useState([]);
    const updateUploadedFiles = (files) => {
        if (facesArr.length > 0) {
            validateFaces(files);
            let allFaces = facesArr;
            allFaces.push(files);
            setFacesArr(allFaces);
        }
        else {
            validateFaces(files);
            setFacesArr(files);
        }
        picturesUploaded = true;
    }

    return (
        <>
            <Head>
                <title>Add New Record</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    minHeight: "100%",
                }}
            >
                <Container maxWidth="sm">
                    <NextLink href="/knownFaces" passHref>
                        <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
                            Back
                        </Button>
                    </NextLink>
                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">
                                Add New Record
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Fill in the details below to add a new record
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            fullWidth
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            label="First Name"
                            margin="normal"
                            name="firstName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                            fullWidth
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            label="Last Name"
                            margin="normal"
                            name="lastName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            fullWidth
                            helperText={formik.touched.username && formik.errors.username}
                            label="Username"
                            margin="normal"
                            name="username"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            variant="outlined"
                        />
                        <FileUpload
                            accept=".jpg,.png,.jpeg"
                            label="Faces"
                            multiple
                            updateFilesCb={updateUploadedFiles}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Notify as soon as detected"
                            name="notify"
                            onChange={formik.handleChange}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Track movements"
                            name="trackMovements"
                            onChange={formik.handleChange}
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Add Record
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
