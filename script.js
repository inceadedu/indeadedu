



const menuBtn = document.querySelector(".menu-btn");
const authMenu = document.getElementById("authMenu");

// SAFETY CHECK
if (menuBtn && authMenu) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    // toggle menu
    const Open = authMenu.style.display === "flex";
    authMenu.style.display = Open ? "none" : "flex";

    if (!Open) {
      renderMenu(); // 👈 YAHI MISSING THA
    }
  });
}

function renderMenu() {
  const loggedIn = localStorage.getItem("isLoggedIn");

  if (loggedIn === "true") {
    authMenu.innerHTML = `
      <a href="dashboard.html">Dashboard</a>
      <a href="offer.html">Offer Letter</a>
      <a href="idcard.html">ID Card</a>
      <a href="#" onclick="logout()">Logout</a>
    `;
  } else {
    authMenu.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
    `;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    renderMenu();
  }
});

function logout() {
  localStorage.clear();
  window.location.reload();
}

// click outside → close
document.addEventListener("click", () => {
  if (authMenu) authMenu.style.display = "none";
});


const searchBtn = document.querySelector(".search-btn");
const searchBox = document.getElementById("searchBox");

if (searchBtn && searchBox) {
  searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
      searchBox.querySelector("input").focus();
    }
  });
}

// click outside → close
document.addEventListener("click", () => {
  if (searchBox) searchBox.classList.remove("active");
});


// ===== Mobile bottom bar actions =====
document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
  alert("Mobile menu open (yahan drawer aayega)");
});

document.getElementById("mobileSearchBtn")?.addEventListener("click", () => {
  alert("Mobile search open");
});


// ===== MOBILE → DESKTOP TRIGGER =====

document.querySelectorAll(".mobile-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (action === "menu") {
      document.querySelector(".menu-btn")?.click();
    }

    if (action === "search") {
      document.querySelector(".search-btn")?.click();
    }
  });
});





document.querySelectorAll(".mobile-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // ⛔ very important

    const action = btn.dataset.action;

    if (action === "menu") {
      document.querySelector(".menu-btn")?.click();
    }

    if (action === "search") {
      document.querySelector(".search-btn")?.click();
    }
  }, true); // ⛔ capture phase
});
