// /**	STYLE SWITCHER
// *************************************************** **/
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const hideSwitcher = document.getElementById("hideSwitcher");
  const showSwitcher = document.getElementById("showSwitcher");
  const switcher = document.getElementById("switcher");

  const animateHide = (el, callback) => {
    el.style.transition = "margin-left 0.5s";
    el.style.marginLeft = "-500px";
    setTimeout(() => {
      el.style.display = "none";
      if (callback) callback();
    }, 500);
  };

  const animateShow = (el) => {
    el.style.display = "block";
    el.style.transition = "margin-left 0.5s";
    el.style.marginLeft = "0px";
  };

  [hideSwitcher, showSwitcher].map((button) => {
    if (button) {
      button.addEventListener("click", () => {
        if (showSwitcher && showSwitcher.style.display !== "none") {
          animateShow(switcher);
          createCookie("switcher_visible", "true", 365);
          animateHide(showSwitcher);
        } else {
          animateShow(showSwitcher);
          createCookie("switcher_visible", "false", 365);
          animateHide(switcher);
        }
      });
    }
  });

  document.querySelectorAll("a[href='#']").map((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
});

function setActiveStyleSheet(title) {
  const links = document.getElementsByTagName("link");
  for (let link of links) {
    if (link.rel.includes("style") && link.title) {
      link.disabled = true;
      if (link.title === title) {
        link.disabled = false;
      }
    }
  }

  const color_skin = readCookie("color_skin");
  if (color_skin === "dark") {
    const existing = document.getElementById("css_dark_skin");
    if (existing) existing.remove();

    const link = document.createElement("link");
    link.id = "css_dark_skin";
    link.href = "assets/css/layout-dark.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.title = "dark";
    document.head.appendChild(link);

    document.getElementById("is_dark")?.click();
    const logo = document.querySelector("a.logo img");
    if (logo) logo.src = "assets/images/logo_dark.png";
  }
}

function getActiveStyleSheet() {
  const links = document.getElementsByTagName("link");
  for (let link of links) {
    if (link.rel.includes("style") && link.title && !link.disabled) {
      return link.title;
    }
  }
  return null;
}

function getPreferredStyleSheet() {
  const links = document.getElementsByTagName("link");
  for (let link of links) {
    if (link.rel.includes("style") && !link.rel.includes("alt") && link.title) {
      return link.title;
    }
  }
  return null;
}

function createCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 86400000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

function readCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

// ========== ON LOAD ==========
let switcher_visible = "";
window.onload = () => {
  const cookie = readCookie("style");
  const title = cookie || getPreferredStyleSheet();
  setActiveStyleSheet(title);

  if (switcher_visible !== "false") {
    document.getElementById("showSwitcher")?.click();
  }

  const is_dark = readCookie("is_light");
  if (readCookie("is_boxed") === "true") {
    document.body.classList.remove("light");
    document.body.classList.add("light");
    document.getElementById("is_light")?.click();
  }
};

// ========== DARK/LIGHT MODE ==========
document.querySelectorAll("input.dark_switch").map((input) => {
  input.addEventListener("click", () => {
    const val = input.value;
    document.body.classList.remove("dark", "light");
    document.body.classList.add(val);
  });
});

// ========== BOXED MODE ==========
document.querySelectorAll("input.boxed_switch").map((input) => {
  input.addEventListener("click", () => {
    const val = input.value;
    if (val === "boxed") {
      document.body.classList.add("boxed");
      createCookie("is_boxed", "true", 365);
    } else {
      document.body.classList.remove("boxed", "transparent");
      createCookie("is_boxed", "", -1);
    }
  });
});

// ========== SEPARATOR STYLE ==========
document.querySelectorAll("input.separator_switch").map((input) => {
  input.addEventListener("click", () => {
    const val = input.value;
    const classList = [
      "skew",
      "reversed-skew",
      "double-diagonal",
      "big-triangle",
    ];
    document.body.classList.remove(...classList);

    switch (val) {
      case "skew":
        document.body.classList.add("skew");
        createCookie("is_skew", "true", 365);
        break;
      case "reversed-skew":
        document.body.classList.add("reversed-skew");
        createCookie("is_reversed_skew", "true", 365);
        break;
      case "double-diagonal":
        document.body.classList.add("double-diagonal");
        createCookie("is_double_diagonal", "true", 365);
        break;
      case "big-triangle":
        document.body.classList.add("big-triangle");
        createCookie("is_big_triangle", "true", 365);
        break;
      default:
        createCookie("is_normal", "", -1);
    }
  });
});
