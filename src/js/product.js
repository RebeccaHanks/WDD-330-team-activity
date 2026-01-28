import { getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
 
 
const productId = getParam("product");
findProductById(productid);
