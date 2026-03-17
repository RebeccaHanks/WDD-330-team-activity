// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("getLocalStorage parse error for key:", key, e);
    return null;
  }
}

// save data to local storage (defensive)
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("setLocalStorage error for key:", key, e);
  }
}

// set a listener for both touchend and click (defensive)
export function setClick(selector, callback) {
  const el = qs(selector);
  if (!el) {
    console.warn("setClick: element not found for selector:", selector);
    return;
  }

  el.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });

  el.addEventListener("click", callback);
}

// get URL parameter value
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a list (array) using a template function into a parent element
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list = [],
  position = "afterbegin",
  clear = true
) {
  if (!parentElement) {
    console.error("renderListWithTemplate: parentElement is null");
    return;
  }

  if (!Array.isArray(list)) {
    list = [];
  }

  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// Render an array of data with a template function
export async function renderWithTemplate(
  templateFn,
  parentElement,
  data = [],
  position = "afterbegin",
  clear = true,
  callback = null
) {
  if (!parentElement) {
    console.error("renderWithTemplate: parentElement is null");
    return;
  }

  if (!Array.isArray(data)) {
    data = [];
  }
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = data.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));

  if (typeof callback === "function") {
    callback(data);
  }
}

// loadTemplate returns an async function that fetches the HTML string when called
function loadTemplate(path) {
  return async function () {
    try {
      const res = await fetch(path);
      if (res.ok) {
        const html = await res.text();
        return html;
      } else {
        console.error("loadTemplate: failed to fetch", path, res.status);
        return "";
      }
    } catch (e) {
      console.error("loadTemplate fetch error for", path, e);
      return "";
    }
  };
}

// Load header and footer HTML and insert them into the page.
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  if (headerEl) {
    try {
      const headerHtml = await headerTemplateFn();
      headerEl.innerHTML = headerHtml;
    } catch (e) {
      console.error("Error loading header template:", e);
    }
  } else {
    console.warn("loadHeaderFooter: #main-header not found");
  }

  if (footerEl) {
    try {
      const footerHtml = await footerTemplateFn();
      footerEl.innerHTML = footerHtml;
    } catch (e) {
      console.error("Error loading footer template:", e);
    }
  } else {
    console.warn("loadHeaderFooter: #main-footer not found");
  }
}
