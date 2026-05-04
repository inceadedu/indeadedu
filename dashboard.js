document.addEventListener("DOMContentLoaded", () => {

  // ========= USER DATA LOAD =========
  const user = JSON.parse(localStorage.getItem("studentData"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // ========= PROFILE AUTO FILL =========
  document.getElementById("profileName").innerText = user.name || "-";
  document.getElementById("profileEmail").innerText = user.email || "-";
  document.getElementById("profileDob").innerText = user.dob || "-";
  document.getElementById("profilePassport").innerText = user.passport || "-";
  document.getElementById("profileProgram").innerText = user.program || "-";
  document.getElementById("profileCourse").innerText = user.course || "-";
  document.getElementById("profileDuration").innerText = user.duration || "-";

  if (user.image) {
    const profileImg = document.getElementById("profileImage");
    if (profileImg) profileImg.src = user.image;

    const headerImg = document.getElementById("headerProfileImg");
    if (headerImg) {
      headerImg.src = user.image;
      headerImg.style.display = "block";
    }
  }

  // ========= NAVIGATION =========
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");

  links.forEach(link => {
    link.addEventListener("click", function (e) {

      if (this.getAttribute("href") === "index.html") return;

      e.preventDefault();

      const page = this.dataset.page;

      sections.forEach(sec => sec.classList.remove("active"));

      const target = document.getElementById(page);
      if (target) target.classList.add("active");
    });
  });

  // ========= MENU TOGGLE =========
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav-dropdown");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // ========= DROPDOWN =========
  const enrolledBtn = document.querySelector(".enrolled-toggle");
  const dropdown = document.querySelector(".dropdown");

  if (enrolledBtn && dropdown) {
    enrolledBtn.addEventListener("click", function (e) {
      e.preventDefault();
      dropdown.classList.toggle("open");
    });
  }

  // ========= CALENDAR =========
  const calendarGrid = document.querySelector(".calendar-grid");
  const monthTitle = document.querySelector(".calendar-header h2");

  if (calendarGrid && monthTitle) {

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    monthTitle.textContent = monthNames[month] + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    calendarGrid.innerHTML = "";

    days.forEach(day => {
      calendarGrid.innerHTML += `<div class="day-name">${day}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
      calendarGrid.innerHTML += `<div class="day-cell empty"></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {

      let cls = "day-cell";

      if (
        d === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
      ) {
        cls += " today";
      }

      calendarGrid.innerHTML += `<div class="${cls}">${d}</div>`;
    }
  }

});