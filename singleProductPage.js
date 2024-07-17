 // get selected object from search html
 let itemId = localStorage.getItem("selectedProductId");
 let itemDetails = localStorage.getItem(`selectedProduct-${itemId}`);

 let product = JSON.parse(itemDetails);
 renderProductPage(product);

 function renderProductPage(product) {
   let imageRender = `<img src="${product.thumbnail}" class="pageImages">`;
   let reviews = "";

   product.reviews.forEach(function (review) {
     reviews += `<div><label class="label">Customer:</label><span>${review.reviewerName}</span></div>`;
     reviews += `<div><label class="label">Review:</label><span>${review.rating}</span></div>`;
     reviews += `<div><label class="label">Comment:</label><span>${review.comment}</span></div><br>`;
   });
   
   const html = `
     <div id="singleProductDiv2">
       <div id="productDescriptionAndImage">
         ${imageRender}
         <span id="productDescription">${product.description}</span>
       </div>
       <div id="priceAndCart">
         <span>${product.price}$</span>
         <img src="cart.png" id="cartButton">
       </div>
       <hr><br>
       <div class="divText">
         <div id="priceAndTitle">
           <div>${product.title}</div>
           <br>
           <div><label class="label">Brand:</label><span>${product.brand}</span></div><br>
           <div><label class="label">Rating:</label><span>${product.rating} &#x2B50</span></div><br>
           <div><label class="label">Warranty:</label><span>${product.shippingInformation}</span></div><br>
           <div><label class="label">Availability:</label><span>${product.availabilityStatus}</span></div><br>
           <div id="reviewsDiv">${reviews}</div>
         </div>
       </div>
     </div>`;

   document.getElementById("productPage").innerHTML = html;

   // Add event listener to cartButton
   document.getElementById("cartButton").addEventListener("click", function() {
     addToCart(product);
   });
 }

 function addToCart(product) {
   let productsCart = JSON.parse(localStorage.getItem("productStorage")) || [];
   const existingProduct = productsCart.find((p) => p.id === product.id);
   if (existingProduct) {
     existingProduct.quantity += 1;
   } else {
     product.quantity = 1;
     productsCart.push(product);
   }

   localStorage.setItem("productStorage", JSON.stringify(productsCart));

 }
