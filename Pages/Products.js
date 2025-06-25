import { db } from "../utils/firebaseConfig.js";;
import { getFirestore, addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";


async function loadCategoryDropdown() {
    const dropdown = document.getElementById("product-category-input");
    dropdown.innerHTML = `<option value="">Select Category</option>`;

    const querySnapshot = await getDocs(collection(db, "categories"))
    querySnapshot.forEach((docSnap) => {
        const category = docSnap.data()
        const option = document.createElement("option");
        option.value = category.name

        option.textContent = category.name
        // jo user dekega woh yeh text hoga
        dropdown.appendChild(option)
    });
}


let isEdit = false
let editid = null

const submit1 = document.getElementById("submit-button");
submit1.addEventListener("click", async function (event) {
    event.preventDefault();

    let isValid = true

    const productname = document.getElementById("product-name-input");
    const productdetail = document.getElementById("product-detail-input");
    const productdescription = document.getElementById("product-description-input");
    const productprice = document.getElementById("product-price-input");
    const productcategory = document.getElementById("product-category-input");

    const name = productname.value.trim();
    const detail = productdetail.value.trim();
    const description = productdescription.value.trim()
    const category = productcategory.value.trim();
    const price = productprice.value.trim();

    const nameError = document.getElementById("name-error");
    const descriptionError = document.getElementById("description-error");
    const detailError = document.getElementById("detail-error");
    const categoryError = document.getElementById("category-error")
    const priceError = document.getElementById("price-error");


    if (name === "") {
        nameError.innerText = "Name is required";
        isValid = false
    } else {
        nameError.innerText = "";
    }

    if (description === "") {
        descriptionError.innerText = "At least 10 Characters"
        isValid = false
    } else {
        descriptionError.innerText = "";
    }

    if (detail === "") {
        detailError.innerText = "Please fill the field"
        isValid = false
    } else {
        detailError.innerText = "";
    }


    if (category === "") {
        categoryError.innerText = "Please sleect category"
        isValid = false
    }

    if (price === "") {
        priceError.innerText = "Please Enter the Product Price";
        isValid = false
    } else {
        priceError.innerText = "";
    }
    if (!isValid) return;
    console.log("Form is valid. Submitting...");

    try {
        if (isEdit && editid) {
            const washingtonRef = doc(db, "products", editid);
            await updateDoc(washingtonRef, {
                name,
                detail,
                description,
                category,
                price,
            });
            console.log("Task updated sucessfully");

            await renderTasks();

            isEdit = false
            editid = null
            submit1.textContent = "Add Product"

            // After editing data to modal it should be hide

            const modalElement = document.getElementById("products-modal");
            const modalinstance = bootstrap.Modal.getInstance(modalElement)
            if (modalinstance) {
                modalinstance.hide();
            }

        } else {
            const docRef = await addDoc(collection(db, "products"), {
                name,
                detail,
                description,
                category,
                createdAt: serverTimestamp(),
                price,
            });

            console.log("Document written with ID: ", docRef.id);

            isEdit = false
            editid = null

            clearFormfields();

            submit1.textContent = "Add Product"

            // after adding data to modal it should be hide

            const modalElement = document.getElementById("products-modal")
            const modalinstance = bootstrap.Modal.getInstance(modalElement);
            if (modalinstance) {
                modalinstance.hide();
            }

            await renderTasks();

        }
    } catch (error) {

        console.error("Error editing task", error)
    }
})



renderTasks();



async function renderTasks() {
    const productlist = document.getElementById("product-list");
    productlist.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((docSnap) => {
        const taskData = docSnap.data();
        const { name, detail, description, category, price } = taskData
        const taskId = docSnap.id;
        const newRow1 = document.createElement("tr")
        newRow1.innerHTML = `
        <td>${name} </td>
        <td>${detail}</td>
        <td>${description}</td>
        <td>${category}</td>
        <td>${price}</td>
        <td>
        <div class = "social-icons">
        <span class = "delete-button" data-id= "${taskId}">
        <i class="fa-solid fa-trash-can-arrow-up delete-icon"></i>
        </span>       
        <span class = "edit-button" data-id = "${taskId}">
        <i class="fa-solid fa-pen-to-square edit-icon"></i> 
        </span>
        </div>
        </td>
        </tr>
    `;

        productlist.appendChild(newRow1)


        // delete

        const deleteButton = newRow1.querySelector(".delete-button")
        deleteButton.addEventListener("click", async function () {
            try {
                await deleteDoc(doc(db, "products", taskId));

                console.log("Deleted Data Sucessfully");

                await renderTasks();

            } catch (error) {
                console.error("error editing task", error)
            }
        });

        // Edit 

        const editButton = newRow1.querySelector(".edit-button");
        editButton.addEventListener("click", async function () {
            // await loadCategoryDropdown();
            // console.log('category', document.getElementById("product-category-input"), category)

            document.getElementById("product-name-input").value = name;
            // document.getElementById("product-category-input").value = category;
            document.getElementById("product-detail-input").value = detail;
            document.getElementById("product-description-input").value = description;

            document.getElementById("product-price-input").value = price;

            submit1.textContent = "Update fields"

            isEdit = true
            editid = taskId


            const modal = new bootstrap.Modal(document.getElementById("products-modal"))
            modal.show()
        })
    });
}


// this is function to prevent existing data to be shown on add modal after edit.

function clearFormfields() {
    document.getElementById("product-name-input").value = "";
    document.getElementById("product-detail-input").value = "";
    document.getElementById("product-description-input").value = "";
    document.getElementById("product-category-input").value = "";
    document.getElementById("product-price-input").value = "";

    submit1.textContent = "Add Product";
    isEdit = false
    editid = null
}



// yeh modal ke liye hai clear fiedls.
// add main existing data  na ajyen
// edit ke bad
const modalElement = document.getElementById("products-modal");
modalElement.addEventListener("hidden.bs.modal", function () {
    clearFormfields();

});

const modalElement1 = document.getElementById("products-modal");
modalElement1.addEventListener("show.bs.modal", async function () {
    loadCategoryDropdown();
});
