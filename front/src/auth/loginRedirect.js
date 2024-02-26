import Router from "next/router";
import swal from "sweetalert";

export const LoginRedirect = (response) => {
    if (response.status === 401 || response.status === 422) {
        let cookie = localStorage.getItem("jwt_token");
        if (cookie === null) {
            swal("You haven't signed in", "Please sign in!", "error");
        }
        else {
            swal("Session Expired", "Please sign in again!", "error");
        }
        Router.push("/login");
        return false;
    } else {
        console.log("Authorized User");
        return true;
    }
}