import Head from 'next/head';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { AppConfig } from '../utils/config';

const Login = () => {

  // backend urls
  const loginUrl = AppConfig.baseUrl + AppConfig.loginEndpoint;

  const [token, setToken] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: 'shamika',
      password: '123'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .max(255)
        .required('Username is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: () => {

      let data = {
        username: formik.values.email,
        password: formik.values.password
      };

      axios.post(loginUrl, data)
        .then((response) => {
          if (response.status === 200) {
            setToken(response.data["token"]);
          }
          else {
            swal("Error", "Invalid credentials", "error");
          }
        })
        .catch((error) => {
          swal("Error", "Invalid credentials", "error");
        });

      // const data = new FormData();
      // data.append('username', formik.values.email);
      // data.append('password', formik.values.password);

      // axios.post(loginUrl, data)
      //   .then((response) => {
      //     if (response.status === 200) {
      //       setToken(response.data["access_token"]);
      //     }
      //     else {
      //       swal("Error", "Invalid credentials", "error");
      //     }
      //   })
      //   .catch((error) => {
      //     swal("Error", "Invalid credentials", "error");
      //   });
    }
  });

  useEffect(() => {
    if (token != undefined && token != null) {
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('username', formik.values.email);
      Router
        .push('/')
        .catch(console.error);
    }
  }, [token])

  return (
    <>
      <Head>
        <title>Login | Ask Sherlock</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Please enter your credentials
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >

              </Grid>
            </Grid>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Username"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
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
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
