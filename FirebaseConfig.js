import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyDyPsgWePL-K1nWB5Pv3oD07Sk2vFmXEfQ",
    authDomain: "login-signup-authenticat-abda5.firebaseapp.com",
    projectId: "login-signup-authenticat-abda5",
    storageBucket: "login-signup-authenticat-abda5.firebasestorage.app",
    messagingSenderId: "847526541668",
    appId: "1:847526541668:web:93411ea12d81043b032271",
    measurementId: "G-R13N1JRJRC"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


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
                    window.location.href = "login.html";
                    alert("Signup sucessfull")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error signing up", errorCode, errorMessage)
                    // ..
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

        if (!email || !password) {
            alert("Email and password cannot be empty.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                window.location.href = "Dashboard.html"
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.error("error signing in" , errorCode , errorMessage)
            });

    })
} else {
    // console.error("login button not found");
}