document.addEventListener('DOMContentLoaded', () => {
    let products = [];

    const cartData = localStorage.getItem('productStorage');
    if (cartData) {
      products = JSON.parse(cartData);
    }

    products.forEach(product => {
      if (!product.quantity) {
        product.quantity = 1;
      }
    });

    display(products);

    function display(products) {
      const cartElement = document.getElementById("cart");

      if (products.length === 0) {
        cartElement.innerHTML =
          "<tr><td colspan='5'>No items in cart</td></tr>";
      } else {
        cartElement.innerHTML = products
          .map((product, index) => {
            return `
              <tr>
                <td width="150" class="head-img">
                  <img src="${product.thumbnail}" alt="${product.title}">
                </td>
                <td width="360" class="name">${product.title}</td>
                <td width="200" class="quantity">
                  <button class="sub" data-index="${index}">-</button>
                  <span class="quantity-display">${product.quantity}</span>
                  <button class="add" data-index="${index}">+</button>
                </td>
                <td width="150" class="price">$${(product.price * product.quantity).toFixed(2)}</td>
                <td width="70" class="delete">
                  <ion-icon class="trash" name="trash-outline" data-index="${index}"></ion-icon>
                </td>
              </tr>
            `;
          })
          .join("");

        document.querySelectorAll('.sub').forEach(button => {
          button.addEventListener('click', decreaseQuantity);
        });
        document.querySelectorAll('.add').forEach(button => {
          button.addEventListener('click', increaseQuantity);
        });
        document.querySelectorAll('.trash').forEach(icon => {
          icon.addEventListener('click', deleteItem);
        });

        updateTotalPrice(products);
      }

      document.getElementById("itemNo").textContent = `${products.length} Items`;
    }

    function deleteItem(event) {
      const index = event.target.getAttribute('data-index');
      products.splice(index, 1);
      updateCart();
    }

    function decreaseQuantity(event) {
      const index = event.target.getAttribute('data-index');
      if (products[index].quantity > 1) {
        products[index].quantity--;
      } 
      updateCart();
    }

    function increaseQuantity(event) {
      const index = event.target.getAttribute('data-index');
      products[index].quantity++;
      updateCart();
    }

    function updateCart() {
      localStorage.setItem('productStorage', JSON.stringify(products));
      display(products);
    }

    function updateTotalPrice(products) {
      const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);
      document.getElementById("Total2").textContent = `$${totalPrice.toFixed(2)}`;
    }
  });