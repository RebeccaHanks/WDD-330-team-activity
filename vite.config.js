import { resolve } from "path";

import { defineConfig } from "vite";
 
import dns from "dns";
import ProductListing from "./src/js/ProductList.mjs";

export default defineConfig({

  root: "src/",

  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
 
  build: {

    outDir: "../dist",

    rollupOptions: {

      input: {

        main: resolve(__dirname, "src/index.html"),

        cart: resolve(__dirname, "src/cart/index.html"),

        checkout: resolve(__dirname, "src/checkout/index.html"),

        product: resolve(__dirname, "src/product_pages/index.html"),

        ProductListing: resolve(__dirname, "src/product-listing/index.html"),

        product_list: resolve(__dirname, "src/product-list/index.html"),

        login: resolve(__dirname, "src/login/index.html"),

        orders: resolve(__dirname, "src/orders/index.html"),

      },

    },

  },

});
 