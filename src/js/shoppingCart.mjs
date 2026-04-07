import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const outputEl = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    outputEl.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    displayCartTotal(0);
    return;
  }

  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);

  document.querySelectorAll(".cart-qty").forEach(input => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      const newQty = parseInt(e.target.value);

      let cartItems = getLocalStorage("so-cart");

      const item = cartItems.find(i => i.Id == id);
      if (item) {
        item.quantity = newQty;
      }

      setLocalStorage("so-cart", cartItems);
      shoppingCart();
    });
  });
}

function displayCartTotal(total) {
  const footer = document.querySelector(".cart-footer");
  const totalEl = document.querySelector(".cart-total");

  if (total > 0) {
    footer.classList.remove("hide");
    totalEl.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <input 
      type="number" 
      min="1" 
      value="${item.quantity || 1}" 
      data-id="${item.Id}" 
      class="cart-qty"
    />
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function calculateListTotal(list) {
  return list.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );
}