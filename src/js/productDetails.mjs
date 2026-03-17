import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  if (!productId) {
    console.error("No product ID provided to productDetails");
    return;
  }

  try {
    product = await findProductById(productId);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return;
  }

  renderProductDetails();

// Use a single, consistent id. Update HTML to match this id if needed.
  const btn = document.getElementById("addToCartBtn");
  if (!btn) {
    console.error("Add to Cart button not found (expected id='addToCartBtn')");
    return;
  }
  btn.addEventListener("click", addToCart);
}




function addToCart() {
  const cartContents = getLocalStorage("so-cart") || [];

  const normalized = normalizeProductForCart(product);

  cartContents.push(normalized);
  setLocalStorage("so-cart", cartContents);

  animateCartIcon();
  console.log("Product added to cart:", normalized);
}

function normalizeProductForCart(p) {
  return {
    Id: p.Id ?? "",
    Name: p.Name ?? p.NameWithoutBrand ?? "Unknown",
    FinalPrice: Number(p.FinalPrice ?? p.Price ?? 0),
    Images: p.Images ?? (p.Image ? { PrimaryMedium: p.Image.PrimaryLarge } : {}),
    Colors: p.Colors ?? (p.ColorsList ? p.ColorsList : []),
    DescriptionHtmlSimple: p.DescriptionHtmlSimple ?? "",
  };
}

function animateCartIcon() {
  const icon = document.querySelector("#cart-icon");
  if (!icon) return;
  icon.classList.add("animate");
  icon.addEventListener(
    "animationend",
    () => icon.classList.remove("animate"),
    { once: true }
  );
}

function renderProductDetails() {
  const brandName = product.Brand?.Name ?? "";
  const nameWithoutBrand = product.NameWithoutBrand ?? product.Name ?? "";
  const imageSrc = product.Image?.PrimaryLarge ?? product.Images?.PrimaryMedium ?? "";
  const altText = product.Name ?? "";
  const price = product.FinalPrice ?? product.Price ?? 0;
  const colorName = product.Colors?.[0]?.ColorName ?? "";

  const el = (selector) => document.querySelector(selector);

  if (el("#productName")) el("#productName").innerText = brandName;
  if (el("#productNameWithoutBrand")) el("#productNameWithoutBrand").innerText = nameWithoutBrand;
  if (el("#productImage")) {
    el("#productImage").src = imageSrc;
    el("#productImage").alt = altText;
  }
  if (el("#productFinalPrice")) el("#productFinalPrice").innerText = `$${Number(price).toFixed(2)}`;
  if (el("#productColorName")) el("#productColorName").innerText = colorName;
  if (el("#productDescriptionHtmlSimple")) el("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple ?? "";
  if (el("#addToCartBtn")) el("#addToCartBtn").dataset.id = product.Id ?? "";
}