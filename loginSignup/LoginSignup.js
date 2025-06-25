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
                    window.location.href = "../wrapper/Wrapper.html";
                    alert("Signup sucessfull")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error signing up", errorCode, errorMessage)
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
                const user = userCredential.user;
                // console.log(user)

                const toastBody = document.getElementById("toast-body");
                toastBody.innerText = "Login sucessfull"
                const toastelement = document.getElementById("mytoast");
                const toast = new bootstrap.Toast(toastelement);
                toast.show();

              
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

