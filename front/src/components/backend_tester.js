import React, { useEffect } from 'react'
import swal from 'sweetalert';

function BackendTester() {
    useEffect(() => {
        fetch("http://localhost:5000/test", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((error) => {
                swal("Oops!!!", "Please check whether the backend API is up and running!", "error");
            })
    }, []);
}

export default BackendTester