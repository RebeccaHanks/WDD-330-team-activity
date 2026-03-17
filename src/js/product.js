import { getParam, getLocalStorage, setLocalStorage, qs, setClick} from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productId = getParam('id');
console.log('productId from URL:', productId);

if (!productId) {
  console.error('No productId found in URL');
} else {
  // load products (example: from localStorage or fetch)
  const products = getLocalStorage('products') || []; // or fetch('/api/products')
  // compare as string and number to be safe
  const product = products.find(p => String(p.id) === String(productId));

  if (!product) {
    console.error('Product not found for id:', productId);
  } else {
    // render product details...
    // wire up add to cart
    setClick('#addToCartBtn', () => {
      const cart = getLocalStorage('cart') || [];
      cart.push({ id: product.id, title: product.title, price: product.price });
      setLocalStorage('cart', cart);
      console.log('Added to cart:', product.id);
    });
  }
}
