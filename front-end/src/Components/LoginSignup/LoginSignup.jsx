import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./LoginSignup.css";
import { AppConfig } from '../../utils/config';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import * as Yup from 'yup';
import Router from 'next/router';
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginSignup = () => {

    // backend urls
    const loginUrl = AppConfig.baseUrl + AppConfig.loginEndpoint;
    const [token, setToken] = useState(null);

  const [action, setAction] = useState("Sign Up");
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
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="text" placeholder="User Name" />
        </div>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="error-username">
            <span>error</span>
          </div>
        )}

        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="email" placeholder="Email" />
          </div>
        )}
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot Password? <span>Click Here!</span>
            <div className="error-password">
              <span>error</span>
            </div>
          </div>
        )}

        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
