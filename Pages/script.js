function loadContent(page) {
    const main = document.getElementById("main-content");
    const category = document.getElementById("category-content")

    if (page === "Dashboard") {
        main.innerHTML = `Example Dashboard Content`;
    } else if (page === "Products") {
        main.innerHTML = `
           <main class="main-content">
            <div class="content-wrapper">
                <header class="main-header">
                    <div class="header-title">
                        <h1 class="products-h1">Products</h1>
                        <button id="add-products-button" type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#products-modal">
                            <i class="fa-solid fa-plus add-icon"></i> Add Products
                        </button>
                    </div>
                </header>
                <div class="modal fade" id="products-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>

                            <div class="modal-body">
                                <form id="product-form">
                                    <div class="mb-3">
                                        <label id="product-name-heading" for="Product-Name"
                                            class="col-form-label">Product
                                            Name</label>
                                        <input type="text" class="form-control" id="product-name-input" required>
                                        <span id="name-error" class="text-danger"></span>
                                    </div>

                                    <div class="mb-3">
                                        <label for="product-category-input" class="col-form-label category-label">
                                            Product Category
                                        </label>
                                        <select id="product-category-input" class="form-select" required>
                                            <option value="">Select Category</option>
                                        </select>
                                        <span id="category-error" class="text-danger"></span>
                                    </div>

                                    <div class="mb-3">
                                        <label id="product-detail-heading" for="Product-Detail"
                                            class="col-form-label">Product
                                            Detail</label>
                                        <input type="text" class="form-control" id="product-detail-input" required>
                                        <span id="detail-error" class="text-danger"></span>
                                    </div>



                                    <div class="mb-3">
                                        <label id="product-price-heading" for="product-price" class="col-form-label">
                                            Product
                                            Price</label>
                                        <input type="number" class="form-control" id="product-price-input" required />
                                        <span id="price-error" class="text-danger"></span>
                                    </div>


                                    <div class="mb-3">
                                        <label id="product-description-heading" for="product-description"
                                            class="col-form-label">Product Description</label>
                                        <textarea class="form-control" id="product-description-input"></textarea>
                                        <span id="description-error" class="text-danger"></span>
                                    </div>
                                    <button onclick="" id="submit-button" type="submit"
                                        class="btn btn-primary btn-block">
                                        Submit
                                    </button>
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <section class=" product-content">
                <div class="add-product">
                </div>
                <div class="product-table-container">
                    <table class="product-table">
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Product Detail</th>
                                <th>Product Description</th>
                                <th>Product Category</th>
                                <th>Product Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="product-list">
                            <tr>
                                <td class="border px-4 py-2">Mobile</td>
                                <td class="border px-4 py-2">Laptop</td>
                                <td class="border px-4 py-2">Car</td>
                                <td class="border px-4 py-2">Moten</td>
                                <td class="border px-4 py-2">ii</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
        `;



    } if (page === "Category") {
        category.innerHTML = `
        
        
    <main class="category-content">
        <header class="main-header">
            <div class="header-title">
                <h1 class="category-heading">Category</h1>
                <button id="add-category-button" type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#category-modal">
                    <i class="fa-solid fa-plus add-icon"></i> Add Category
                </button>
            </div>
        </header>
        <div class="modal fade" id="category-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="category-title" id="exampleModalLabel">Add Category</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="modal-form">
                            <div class="form-floating mb-3">
                                <input type="text" id="name-input" class="form-control" required />
                                <label class="form-label" for="name2">Name</label>
                                <span id="name-input-error"></span>
                            </div>
                            <div class="form-floating mb-3">
                                <textarea name="description" id="description-input" class="form-control"></textarea>
                                <label class="form-label" for="email2">Description</label>
                                <span id="description-input-error"></span>
                            </div>
                            <button id="submit-btn" type="submit" class="btn btn-primary btn-block">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="category-table-container">
            <table class="category-table">
                <thead>
                    <tr>
                        <th class="px-4 py-2 border font-size: 13px"> Name</th>
                        <th class="px-4 py-2 border"> Description</th>
                        <th id="action-heading" class="px-4 py-2">Actions</th>
                    </tr>

                </thead>
                <tbody id="form-list">
                    <tr>
                        <td>
                            <div class="category-icons flex gap-2 justify-center">
                                <i class="fa-solid fa-trash delete-icon"></i>
                                <i class="fa-solid fa-pen-to-square edit-icon"></i>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </main>
    </div>
        `;
    }

}