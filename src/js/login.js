import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import { login } from "../js/auth.mjs";

// 1. Load header and footer
loadHeaderFooter();

// 2. Check for redirect parameter
const redirect = getParam("redirect") || "/";

// 3. Add event listener to login form
document.querySelector("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // 4. Get username + password from form fields
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  // 5. Pass credentials + redirect to login()
  const result = await login(username, password, redirect);

  if (!result) {
    alert("Invalid login. Please try again.");
  }
});
