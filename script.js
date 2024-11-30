document.getElementById("fetch-btn").addEventListener("click", () => {
  const spinner = document.getElementById("spinner");
  const productsList = document.getElementById("products-list");

  // Show spinner and clear product list
  spinner.classList.remove("d-none");
  productsList.innerHTML = "";

  // Fetch products from API
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then((data) => {
      spinner.classList.add("d-none");

      // Generate product cards
      if (data.length === 0) {
        productsList.innerHTML = `<p class="text-warning text-center">No products available at the moment.</p>`;
      } else {
        data.forEach((product) => {
          const productCard = `
                      <div class="col-md-4">
                          <div class="card h-100 shadow-sm">
                              <img src="${product.image}" class="card-img-top" alt="${product.title}">
                              <div class="card-body">
                                  <h5 class="card-title">${product.title}</h5>
                                  <p class="card-text">${product.description.substring(0, 100)}...</p>
                                  <p class="card-text"><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                              </div>
                          </div>
                      </div>
                  `;
          productsList.innerHTML += productCard;
        });
      }
    })
    .catch((error) => {
      spinner.classList.add("d-none");
      productsList.innerHTML = `
              <p class="text-danger text-center">
                  <strong>Error:</strong> ${error.message}. Please try again later.
              </p>`;
    });
});
