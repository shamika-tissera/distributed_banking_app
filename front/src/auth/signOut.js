import Router from "next/router";

export const SignOut = () => {
    localStorage.removeItem("jwt_token");
    Router
        .push('/login')
} 