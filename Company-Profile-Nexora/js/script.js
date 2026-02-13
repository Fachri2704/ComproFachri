// Fade-in-up animation for section
function fadeInUpOnScroll() {
  document.querySelectorAll(".fade-in-up").forEach(function (section) {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", fadeInUpOnScroll);
window.addEventListener("DOMContentLoaded", fadeInUpOnScroll);
// ...hero hide on scroll removed...
// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Form submission with custom popup
const contactForm = document.querySelector(".contact-form");
const popupInfo = document.getElementById("popupInfo");
const popupInfoClose = document.getElementById("popupInfoClose");
const popupInfoBtn = document.getElementById("popupInfoBtn");
if (contactForm && popupInfo && popupInfoClose && popupInfoBtn) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    popupInfo.classList.add("show");
    this.reset();
  });
  function closePopupInfo() {
    popupInfo.classList.remove("show");
  }
  popupInfoClose.addEventListener("click", closePopupInfo);
  popupInfoBtn.addEventListener("click", closePopupInfo);
  // Close popup on outside click
  popupInfo.addEventListener("click", function (e) {
    if (e.target === popupInfo) closePopupInfo();
  });
}

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

function animateCount(el, target, duration = 1200) {
  let start = 0;
  let startTime = null;
  const isPlus = String(target).endsWith("+");
  const pureTarget = isPlus ? parseInt(target) : parseInt(target);

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * pureTarget);
    el.textContent = value + (isPlus ? "+" : "");
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = pureTarget + (isPlus ? "+" : "");
    }
  }
  requestAnimationFrame(step);
}

// Trigger counting when about-stats is visible
const aboutStats = document.querySelector(".about-stats");
let statsAnimated = false;
if (aboutStats) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          aboutStats.querySelectorAll(".stat-number").forEach((el) => {
            animateCount(
              el,
              el.textContent.replace(/\D/g, "") +
                (el.textContent.trim().endsWith("+") ? "+" : "")
            );
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(aboutStats);
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

// FAQ Accordion Toggle
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});