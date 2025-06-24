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

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

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
        });
    } else {
        // console.error("Signup button not founf");
    }

})


const loginButton = document.getElementById("submit");

if (loginButton) {
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                window.location.href = "../wrapper/Wrapper.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("error signing in", errorCode, errorMessage)
            });
    })
}

// ../pages/Products.html
