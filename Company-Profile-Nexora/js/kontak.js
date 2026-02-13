// Hamburger menu for mobile
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");

function closeMobileNav() {
  hamburgerBtn.classList.remove("active");
  mobileNav.classList.remove("show");
  mobileNav.classList.add("hide");
  mobileNavOverlay.classList.remove("show");
  document.body.style.overflow = "";
  setTimeout(() => {
    mobileNav.classList.remove("hide");
    mobileNav.style.display = "";
    mobileNavOverlay.style.display = "";
  }, 350); // match animation duration
}

if (hamburgerBtn && mobileNav && mobileNavOverlay) {
  hamburgerBtn.addEventListener("click", function () {
    const isOpen = mobileNav.classList.contains("show");
    if (!isOpen) {
      mobileNav.classList.add("show");
      mobileNavOverlay.classList.add("show");
      hamburgerBtn.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      closeMobileNav();
    }
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  mobileNavOverlay.addEventListener("click", closeMobileNav);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileNav();
  });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});