document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 12) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.AOS && !prefersReduced) {
    AOS.init({
      once: true,
      duration: 650,
      easing: "ease-out",
      offset: 60,
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const productItems = document.querySelectorAll(".product-item");

  if (filterButtons.length && productItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        productItems.forEach((card) => {
          const category = card.dataset.category;
          if (filter === "all" || category === filter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  document.querySelectorAll(".detail-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("aria-controls");
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const isOpen = panel.classList.contains("open");
      panel.classList.toggle("open");
      button.setAttribute("aria-expanded", String(!isOpen));
      button.textContent = isOpen ? "Detail" : "Tutup";
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("nama");
      const email = document.getElementById("email");
      const message = document.getElementById("pesan");

      const nameError = document.getElementById("namaError");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("pesanError");
      const status = document.getElementById("formStatus");

      let valid = true;

      if (!name.value.trim()) {
        nameError.textContent = "Nama wajib diisi.";
        valid = false;
      } else {
        nameError.textContent = "";
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Masukkan email yang valid.";
        valid = false;
      } else {
        emailError.textContent = "";
      }

      if (message.value.trim().length < 10) {
        messageError.textContent = "Pesan minimal 10 karakter.";
        valid = false;
      } else {
        messageError.textContent = "";
      }

      if (!valid) {
        status.textContent = "Mohon periksa kembali formulir Anda.";
        status.style.color = "#8d1f1f";
        return;
      }

      status.textContent = "Terima kasih. Tim kami akan menghubungi Anda segera.";
      status.style.color = "#1f5d2f";
      contactForm.reset();
    });
  }
});
