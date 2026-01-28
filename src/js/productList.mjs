import { getData } from "./productData.mjs";
 
export default function productList(selector, category) {
  const element = document.querySelector(selector);
  const products = getData(category);
  element.innerHTML = products.map(product => 
    <li class="product-card">
        <a href="#">
              <img
                src="${product.Image}"
                alt="${product.Alternative}"
              />
              <h3 class="card__brand">${product.Brand}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">${product.Price}</p></a
            >
    </li>

 )

}