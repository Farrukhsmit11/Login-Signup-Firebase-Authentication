
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js"
import { getFirestore, getDocs, deleteDoc, addDoc, updateDoc, serverTimestamp, collection, doc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";


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
export const db = getFirestore(app);


let isEditMode = false;
let editDocId = null;


function clearfields() {
    document.getElementById("name-input").value = "";
    document.getElementById("description-input").value = "";

    submit.textContent = "Add Product"

    isEditMode = false
    editDocId = null
}


const modalElement = document.getElementById("category-modal")
modalElement.addEventListener("hidden.bs.modal", function () {
    clearfields();
});

// CATEGORY PAGE JAVASCRIPT CODE

const submit = document.getElementById("submit-btn");
submit.addEventListener("click", async function (event) {
    event.preventDefault();

    let isValidate = true

    const nameInput = document.getElementById("name-input")
    const descriptionInput = document.getElementById("description-input");

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();

    const nameEror = document.getElementById("name-input-error");
    const descriptionError = document.getElementById("description-input-error");


    if (name === "") {
        nameEror.innerText = "Please Enter Category Name"
        isValidate = false
    } else {
        nameEror.innerText = "";
    }

    if (description === "") {
        descriptionError.innerText = "Category Description should be atleast 20 characters long"
        isValidate = false
    } else {
        descriptionError.innerText = "";
    }
    if (!isValidate) return;
    console.log("Form is valid. Submitting...");




    try {
        if (isEditMode && editDocId) {
            const docSnap = doc(db, "categories", editDocId);
            await updateDoc(docSnap, {
                name,
                description,
                updatedAt: new Date()
            });

            console.log("Task updated sucessfully");


            submit.textContent = "Add Task";

            const modalElement = document.getElementById("products-modal");
            const modalinstance = bootstrap.Modal.getInstance(modalElement);
            if (modalinstance) {
                modalinstance.hide();
            }

            console.log("Task updated sucessfully");

        } else {
            const docRef = await addDoc(collection(db, "categories"), {
                name,

                createdAt: serverTimestamp(),
                description,
            });
            console.log("Document written with ID: ", docRef.id);

            const modalElement = document.getElementById("products-modal")
            const modalinstance = bootstrap.Modal.getInstance(modalElement)
            if (modalinstance) {
                modalinstance.hide()

            }
        }

        await rendertasks();

    } catch (error) {
        console.error("Errror adding docuent", error)
    }
});


rendertasks()


async function rendertasks() {
    const formlist = document.getElementById("form-list");
    formlist.innerHTML = "";

    // get function

    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((docSnap) => {
        const taskData = docSnap.data();
        const { name, description } = taskData
        const taskId = docSnap.id;
        const newRow = document.createElement("tr");
        newRow.innerHTML = `

        <td class = "border px-4 py-2 ">${name}</td>
        <td class = "border px-4 py-2">${description}</td>
        <td  class = "border px-4 py-2">
        <div id = "icons" class = "flex  items-center justify-center">
         <span class="edit-button" data-id="${taskId}">
         <i class="fa-solid fa-pen-to-square"></i>
         </span>
           <span class="delete-button" data-id="${taskId}">
           <i class="fa-solid fa-trash"></i>
           </span>
        </div>
        </td>
   `;

        formlist.appendChild(newRow)


        // delete function

        const deleteButton = newRow.querySelector(".delete-button");
        deleteButton.addEventListener("click", async function () {
            try {
                await deleteDoc(doc(db, "categories", taskId));
                await rendertasks();

            } catch (error) {
                console.error("Error deleting task", error);
            }
        })


        // edit  method


        const editButton = newRow.querySelector(".edit-button");
        editButton.addEventListener("click", function () {

            // yeh existing data leke ata ha
            document.getElementById("name-input").value = name;
            document.getElementById("description-input").value = description;

            submit.textContent = "Update Fields"

            isEditMode = true
            editDocId = taskId

            const modal = new bootstrap.Modal(document.getElementById('category-modal'))

            modal.show();

        })
    });
}

