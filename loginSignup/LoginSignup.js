import { auth } from "../utils/firebaseConfig.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// LOGIN SIGNUP CODE AUTHENTICATION

document.addEventListener("DOMContentLoaded", function () {
    const signupButton = document.getElementById("signup-button");

    // if  maloom krta  hai ke signupButton variable main koi value hai y nhi.
    // agar hai tu yeh addeventlistener chal jayega 
    // otherwise it will show nulll

    if (signupButton) {
        signupButton.addEventListener("click", function (event) {
            event.preventDefault();

            let formisValid = true

            const email = document.getElementById("email").value;
            const username = document.getElementById("Username").value;
            const usernameError = document.getElementById("username-error");
            const password = document.getElementById("password").value;
            const emailError = document.getElementById("email-error");
            const passwordError = document.getElementById("password-error");


            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;


                    const toast1 = document.getElementById("signupToast");
                    const toastbody = document.getElementById("toast-body");
                    toastbody.innerText = "Signup sucessful";
                    const toast = new bootstrap.Toast(toast1);
                    toast.show();
                    // window.location.href = "../wrapper/Wrapper.html";
                    // alert("Signup sucessfull")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error signing up", errorCode, errorMessage)
                    const toastElement2 = document.getElementById("signupToast");
                    const toastBody = document.getElementById("toast-body");
                    const toast = new bootstrap.Toast(toastElement2);


                    if (error.code === "auth/email-already-in-use") {
                        emailError.innerText = "Email already in use";
                        formisValid = false
                    } else {
                        emailError.innerText = "";
                    }


                });
            if (username === "") {
                usernameError.innerText = "Name is required"
                formisValid = false
            }

            if (email === "") {
                emailError.innerText = "Please  Enter Email";
                formisValid = false
            }

            if (password === "") {
                passwordError.innerText = "Password must be atleast 6 characters long"

                formisValid = false

            }

            usernameError.innerText = "";
            emailError.innerText = ""
            passwordError.innerText = "";



        });
    } else {
        // console.error("Signup button not founf");
    }

})


const loginButton = document.getElementById("submit");

if (loginButton) {
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        let emailValid = true

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const toastElement = document.getElementById("loginToast");
                const toastBody = document.getElementById("toast-body");
                toastBody.innerHTML = `<i class="fa-solid fa-circle-check check-icon"></i>
                   Login sucessfull
                `;
                const toast = new bootstrap.Toast(toastElement);
                toast.show();

                toastElement.addEventListener("show.bs.toast", function () {
                    window.location.href = "../wrapper/Wrapper.html";
                })

                const user = userCredential.user;
                // console.log(user)


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("error signing in", errorCode, errorMessage)
            });


        if (email === "") {
            emailError.innerText = "Please Enter Email"
            emailValid = false
        }


        if (password === "") {
            passwordError.innerText = "Password must be atleast 6 characters long"
            emailValid = false
        }
    })
}


const signoutButton = document.getElementById("signout-button");

if (signoutButton) {
    signoutButton.addEventListener("click", function (event) {
        event.preventDefault();

        const signOutToast = document.getElementById("signoutToast");
        const toastBody = document.getElementById("signout-toast-body");

        toastBody.innerHTML = `
        <i class="fa-solid fa-circle-check check-icon"></i>
        Signout sucessfully
        `;
        const toast = new bootstrap.Toast(signOutToast);
        toast.show();

        signOutToast.addEventListener("show.bs.toast", function () {
            window.location.href = "../index.html";
        })


    });
};



