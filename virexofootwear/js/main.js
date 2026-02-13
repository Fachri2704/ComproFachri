(function () {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuClose = document.querySelector("[data-menu-close]");
  const mobileNav = document.getElementById("mobileNav");
  const menuOverlay = document.querySelector("[data-menu-overlay]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  function closeMenu() {
    if (!mobileNav || !menuToggle || !menuOverlay) return;
    mobileNav.classList.remove("open");
    menuOverlay.classList.remove("show");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!mobileNav || !menuToggle || !menuOverlay) return;
    mobileNav.classList.add("open");
    menuOverlay.classList.add("show");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      closeModal();
    }
  });

  window.addEventListener("scroll", setHeaderState);
  setHeaderState();

  if (window.AOS) {
    AOS.init({
      duration: 650,
      once: true,
      easing: "ease-out",
      disable: prefersReducedMotion
    });
  }

  const tabs = document.querySelectorAll("[data-filter-tabs] .tab");
  const cards = document.querySelectorAll(".product-card");

  if (tabs.length && cards.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const filter = tab.dataset.filter;

        tabs.forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-pressed", "true");

        cards.forEach((card) => {
          const category = card.dataset.category;
          const shouldShow = filter === "all" || filter === category;
          card.style.display = shouldShow ? "block" : "none";
        });
      });
    });
  }

  const modal = document.querySelector("[data-modal]");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.querySelector("[data-modal-content]");
  const modalSize = document.querySelector("[data-modal-size]");
  const modalCare = document.querySelector("[data-modal-care]");
  const detailButtons = document.querySelectorAll(".product-detail-btn");
  const modalCloseElements = document.querySelectorAll("[data-modal-close]");

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openModal(title, content, sizeTips, careTips) {
    if (!modal || !modalTitle || !modalContent) return;
    modalTitle.textContent = title;
    modalContent.textContent = content;
    if (modalSize) {
      modalSize.textContent = sizeTips || "Hubungi admin untuk rekomendasi ukuran yang paling sesuai.";
    }
    if (modalCare) {
      modalCare.textContent = careTips || "Simpan di tempat kering dan bersihkan rutin sesuai jenis material.";
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  if (detailButtons.length) {
    detailButtons.forEach((button) => {
      button.addEventListener("click", function () {
        openModal(
          button.dataset.product || "Detail Produk",
          button.dataset.desc || "",
          button.dataset.size || "",
          button.dataset.care || ""
        );
      });
    });
  }

  if (modalCloseElements.length) {
    modalCloseElements.forEach((element) => {
      element.addEventListener("click", closeModal);
    });
  }

  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = (document.getElementById("name") || {}).value?.trim() || "";
      const email = (document.getElementById("email") || {}).value?.trim() || "";
      const message = (document.getElementById("message") || {}).value?.trim() || "";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let errorMessage = "";

      if (!name || name.length < 2) {
        errorMessage = "Nama minimal 2 karakter.";
      } else if (!emailRegex.test(email)) {
        errorMessage = "Format email belum valid.";
      } else if (!message || message.length < 10) {
        errorMessage = "Pesan minimal 10 karakter.";
      }

      if (errorMessage) {
        formFeedback.textContent = errorMessage;
        formFeedback.classList.add("error");
        formFeedback.classList.remove("success");
        return;
      }

      formFeedback.textContent = "Pesan berhasil dikirim. Tim Virexo akan menghubungi Anda segera.";
      formFeedback.classList.add("success");
      formFeedback.classList.remove("error");
      contactForm.reset();
    });
  }
})();

