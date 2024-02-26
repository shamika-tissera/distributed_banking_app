import Router from 'next/router';
import swal from "sweetalert";
import { AppConfig } from '../utils/config';

export const AuthTester = () => {

    // Backend URLs
    const authTestUrl = AppConfig.baseUrl + AppConfig.authTestEndpoint;

    fetch(authTestUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwt_token"),
        },
    }).then((response) => {
        if (response.status === 401 || response.status === 422) {
            let cookie = localStorage.getItem("jwt_token");
            if (cookie === null) {
                swal("You haven't signed in", "Please sign in!", "error");
            }
            else {
                swal("Session Expired", "Please sign in again!", "error");
            }
            Router.push("/login");
        } else {
            console.log("Authorized User");
            return true;
        }
    });
};
