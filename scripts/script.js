document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".display");
    const loadingDiv = document.createElement("div");
    const allProducts = document.querySelector(".pro");
    const category = document.querySelector(".cat-items");
    const list = document.createElement("ul");
    category.append(list);
    display.append(loadingDiv);
    loadingDiv.classList.add("loading");
  
    let sumProducts = 0;
    let productsCart = JSON.parse(localStorage.getItem("productStorage")) || [];
    let productId = 0;
  
    function displayProducts(product) {
      let containerProducts = "";
      product.products.forEach((item) => {
        const brand = item.brand || "Brand Unknown";
        containerProducts += `
          <div class="card">
            <div class="select" id="${item.id}">
              <img src="${item.thumbnail}" alt="">
              <div class="info-product">
                <span>${brand}</span>
                <h3>${item.title}</h3>
                <div class="price">
                  <span>${item.price}$</span>
                  <span>-${item.discountPercentage}%</span>
                </div>
                <div class="add">
                  <p>rating <span>${item.rating}</span></p>
                </div>
              </div>
            </div>
            <button value="${item.id}"><i class="fa-solid fa-plus"></i> Add to Cart</button>
          </div>
        `;
      });
      display.innerHTML = containerProducts;
      addEventListeners(product);
    }
  
    function addEventListeners(product) {
      document.querySelectorAll(".select").forEach((productCard) => {
        productCard.addEventListener("click", function () {
          const productId = this.getAttribute("id");
          const selectedProduct = product.products.find((p) => p.id == productId);
          localStorage.setItem("selectedProductId", selectedProduct.id);
          localStorage.setItem(`selectedProduct-${selectedProduct.id}`, JSON.stringify(selectedProduct));
          window.location.href = "singleProductPage.html";
        });
      });
  
      document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("value");
          const selectedProduct = product.products.find((p) => p.id == productId);
          addToCart(selectedProduct);
        });
      });
    }
  
    function addToCart(product) {
    const existingProduct = productsCart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1; 
      productsCart.push(product);
    }

    localStorage.setItem("productStorage", JSON.stringify(productsCart));
  
    sumProducts += 1;
  
    
  }

    function displayCategories(categoriesList) {
      let containerCategory = "";
      categoriesList.forEach((category) => {
        containerCategory += `<li value="${category}">${category}</li>`;
      });
      list.innerHTML = containerCategory;
      addCategoryEventListeners();
    }
  
    function addCategoryEventListeners() {
      document.querySelectorAll("li").forEach((item) => {
        item.addEventListener("click", function () {
          const categoryItem = this.getAttribute("value");
          getProducts(`https://dummyjson.com/products/category/${categoryItem}`);
        });
      });
    }
  
    function getProducts(link) {
      fetch(link)
        .then((resp) => resp.json())
        .then((data) => displayProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  
    function getCategories() {
      fetch("https://dummyjson.com/products/category-list")
        .then((resp) => resp.json())
        .then((data) => displayCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
    }
  
    allProducts.addEventListener("click", () => getProducts("https://dummyjson.com/products?limit=0&skip=0"));
  
    document.querySelector(".cat").addEventListener("mouseenter", () => {
      document.querySelector(".cat").classList.add("hover");
      getCategories();
      category.classList.remove("block");
    });
  
    document.querySelector(".container-list").addEventListener("mouseleave", () => {
      category.classList.add("block");
    });
  
    getProducts("https://dummyjson.com/products?limit=0&skip=0");
  });