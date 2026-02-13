const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");

  const revealEls = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in-view"));
  }

  document.querySelectorAll(".accordion-button").forEach(button => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      const panel = button.parentElement.querySelector(".accordion-panel");
      if (panel) {
        panel.hidden = expanded;
      }
    });
  });

  const filterForm = document.querySelector("[data-filter-form]");
  if (filterForm) {
    const cards = Array.from(document.querySelectorAll("[data-paket-card]"));
    const applyFilters = () => {
      const destination = filterForm.querySelector("[name='destinasi']").value;
      const duration = filterForm.querySelector("[name='durasi']").value;
      const type = filterForm.querySelector("[name='tipe']").value;
      const budget = filterForm.querySelector("[name='budget']").value;

      cards.forEach(card => {
        const match =
          (destination === "" || card.dataset.destinasi === destination) &&
          (duration === "" || card.dataset.durasi === duration) &&
          (type === "" || card.dataset.tipe === type) &&
          (budget === "" || card.dataset.budget === budget);
        card.style.display = match ? "block" : "none";
      });
    };

    filterForm.addEventListener("change", applyFilters);
    applyFilters();
  }

  document.querySelectorAll("[data-comment-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      showToast("Komentar berhasil dikirim (dummy).");
    });
  });

  document.querySelectorAll("img[data-fade]").forEach(img => {
    if (img.complete) {
      img.classList.add("is-loaded");
      return;
    }
    img.addEventListener("load", () => img.classList.add("is-loaded"));
  });

  initMobileMenu();
});

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".menu-overlay");
  if (!toggle || !menu || !overlay) return;

  const focusableSelectors = "a, button, input, textarea, select, [tabindex='0']";
  let lastFocused = null;

  const openMenu = () => {
    lastFocused = document.activeElement;
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    const focusable = menu.querySelectorAll(focusableSelectors);
    if (focusable.length) focusable[0].focus();
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);

  menu.querySelectorAll("[data-menu-close]").forEach(btn => {
    btn.addEventListener("click", closeMenu);
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
    if (event.key !== "Tab") return;
    if (!menu.classList.contains("open")) return;

    const focusable = Array.from(menu.querySelectorAll(focusableSelectors));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
