document.getElementById("fetch-btn").addEventListener("click", () => {
    const spinner = document.getElementById("spinner");
    const productsList = document.getElementById("products-list");

    spinner.style.display = "block";
    productsList.innerHTML = "";


    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {

            spinner.style.display = "none";

            data.forEach((product) => {
                const productCard = `
            <div class="col-md-4 my-3">
              <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description.substring(0, 100)}...</p>
                  <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                </div>
              </div>
            </div>
          `;
                productsList.innerHTML += productCard;
            });
        })
        .catch((error) => {
            spinner.style.display = "none";
            productsList.innerHTML = `<p class="text-danger text-center">Error fetching data: ${error.message}</p>`;
        });
});