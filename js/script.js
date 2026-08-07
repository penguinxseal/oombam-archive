"use strict";

/* =========================
   ELEMENTS
========================= */

const body = document.body;
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNavigation = document.getElementById(
  "mobileNavigation"
);
const themeToggle = document.getElementById("themeToggle");

const mobileLinks = document.querySelectorAll(
  ".mobile-nav-link"
);

const sectionLinks = document.querySelectorAll(
  '.nav-link[href^="#"], ' +
  '.mobile-nav-link[href^="#"], ' +
  '.primary-button[href^="#"], ' +
  '.scroll-indicator[href^="#"]'
);

const sections = document.querySelectorAll(
  "main section[id]"
);

/* =========================
   MOBILE MENU
========================= */

function openMobileMenu() {
  if (!mobileNavigation || !menuToggle) {
    return;
  }

  mobileNavigation.classList.add("is-open");
  mobileNavigation.setAttribute("aria-hidden", "false");

  menuToggle.classList.add("is-active");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute(
    "aria-label",
    "Close navigation menu"
  );

  body.classList.add("menu-open");
}

function closeMobileMenu() {
  if (!mobileNavigation || !menuToggle) {
    return;
  }

  mobileNavigation.classList.remove("is-open");
  mobileNavigation.setAttribute("aria-hidden", "true");

  menuToggle.classList.remove("is-active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

  body.classList.remove("menu-open");
}

function toggleMobileMenu() {
  if (!mobileNavigation) {
    return;
  }

  const menuIsOpen =
    mobileNavigation.classList.contains("is-open");

  if (menuIsOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (menuToggle) {
  menuToggle.addEventListener(
    "click",
    toggleMobileMenu
  );
}

if (mobileNavigation) {
  mobileNavigation.addEventListener(
    "click",
    (event) => {
      if (event.target === mobileNavigation) {
        closeMobileMenu();
      }
    }
  );
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

/* =========================
   STICKY HEADER
========================= */

function updateHeaderOnScroll() {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle(
    "is-scrolled",
    window.scrollY > 50
  );
}

window.addEventListener(
  "scroll",
  updateHeaderOnScroll,
  { passive: true }
);

updateHeaderOnScroll();

/* =========================
   SMOOTH SCROLLING
========================= */

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetSection =
      document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();

    const headerHeight = siteHeader
      ? siteHeader.offsetHeight
      : 0;

    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    closeMobileMenu();
  });
});

/* =========================
   ACTIVE NAVIGATION
========================= */

function setActiveNavigation(sectionId) {
  document
    .querySelectorAll(
      '.nav-link[href^="#"], ' +
      '.mobile-nav-link[href^="#"]'
    )
    .forEach((link) => {
      const linkTarget =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        linkTarget === `#${sectionId}`
      );
    });
}

if ("IntersectionObserver" in window) {
  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveNavigation(
            visibleSections[0].target.id
          );
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.2, 0.4, 0.6]
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* =========================
   DARK MODE
========================= */

const themeStorageKey = "oombam-theme";

function loadSavedTheme() {
  try {
    const savedTheme =
      localStorage.getItem(themeStorageKey);

    if (savedTheme === "dark") {
      body.classList.add("dark-theme");
    }
  } catch (error) {
    console.warn(
      "Theme preference could not be loaded.",
      error
    );
  }
}

function updateThemeButtonLabel() {
  if (!themeToggle) {
    return;
  }

  const darkModeActive =
    body.classList.contains("dark-theme");

  themeToggle.setAttribute(
    "aria-label",
    darkModeActive
      ? "Switch to light theme"
      : "Switch to dark theme"
  );
}

function toggleTheme() {
  body.classList.toggle("dark-theme");

  const darkModeActive =
    body.classList.contains("dark-theme");

  try {
    localStorage.setItem(
      themeStorageKey,
      darkModeActive ? "dark" : "light"
    );
  } catch (error) {
    console.warn(
      "Theme preference could not be saved.",
      error
    );
  }

  updateThemeButtonLabel();
}

loadSavedTheme();
updateThemeButtonLabel();

if (themeToggle) {
  themeToggle.addEventListener(
    "click",
    toggleTheme
  );
}

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 1100) {
    closeMobileMenu();
  }
});
