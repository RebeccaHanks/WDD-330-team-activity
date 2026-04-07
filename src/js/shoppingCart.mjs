import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
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

    // re-render cart
    shoppingCart();
  });
});
}

function displayCartTotal(total) {
  if (total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
    document.querySelector(".list-total").innerText += ` $${total}`;
  } else {
    document.querySelector(".list-footer").classList.add("hide");
  }
}
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
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

  return newItem;
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice * (item.quantity || 1));
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total;
}

