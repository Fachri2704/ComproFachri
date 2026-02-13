const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

const themeToggle = document.getElementById("themeToggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const applyTheme = (mode) => {
  if (mode === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

// const calcForm = document.getElementById("calcForm");
// const calcResult = document.getElementById("calcResult");

// if (calcForm) {
//   calcForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const bill = Number(document.getElementById("bill").value || 0);
//     if (bill <= 0) {
//       calcResult.textContent = "Masukkan nilai tagihan yang valid.";
//       return;
//     }
//     const savings = Math.round(bill * 0.32);
//     const yearly = savings * 12;
//     calcResult.textContent = `Estimasi penghematan sekitar Rp ${savings.toLocaleString("id-ID")} per bulan atau Rp ${yearly.toLocaleString("id-ID")} per tahun.`;
//   });
// }

const revealItems = document.querySelectorAll("section, .panel-card, .service-card, .project-card, .testimonial-grid article");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});
