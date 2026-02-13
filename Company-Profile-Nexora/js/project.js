// Stat number count up animation
function animateCountUp(el, target, duration = 1200) {
  let start = 0;
  let startTime = null;
  target = parseInt(target);
  function updateCount(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    el.textContent = value + "+";
    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target + "+";
    }
  }
  requestAnimationFrame(updateCount);
}

window.addEventListener("DOMContentLoaded", function () {
  // ...existing code...

  // Stat number count up on summary section visible
  let countStarted = false;
  const aboutSection = document.querySelector(".about");
  const statNumbers = document.querySelectorAll(".stat-number");
  if (aboutSection && statNumbers.length) {
    const observer = new window.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !countStarted) {
            countStarted = true;
            statNumbers.forEach(function (el) {
              const target = el.getAttribute("data-target");
              if (target) animateCountUp(el, target);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(aboutSection);
  }
});
// Hero fade-in animation on page load
window.addEventListener("DOMContentLoaded", function () {
  var heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.classList.add("fade-in-up");
  }
});
// Navbar scroll effect
window.addEventListener("scroll", function () {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
// Scroll to Top Button
document.getElementById("scrollTopBtn").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger menu logic
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
