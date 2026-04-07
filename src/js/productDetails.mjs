import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();

  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cartContents = getLocalStorage("so-cart") || [];

  const existingItem = cartContents.find(item => item.Id === product.Id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartContents.push(product);
  }

  setLocalStorage("so-cart", cartContents);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;

  const img = document.querySelector("#productImage");
  img.src = product.Image.PrimaryMedium;
  img.srcset = `
    ${product.Image.PrimarySmall} 500w,
    ${product.Image.PrimaryMedium} 800w,
    ${product.Image.PrimaryLarge} 1200w
  `;
  img.sizes = "(max-width: 600px) 100vw, 800px";

  img.alt = product.Name;

  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector("#addToCart").dataset.id = product.Id;
}