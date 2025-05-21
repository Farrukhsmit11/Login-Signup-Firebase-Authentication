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

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });


    })
}










// Signup function

// signupButton.addEventListener("click", (event) => {
//     event.preventDefault()
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;



//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed up
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });

//     // console.log(signupButton);

// })











// Login function//



// const submit = document.getElementById("submt");
// submit.addEventListener("click", function (e) {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("Error editing");

//         });
// })