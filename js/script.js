"use strict";

/* =========================
   ELEMENTS
========================= */

const body = document.body;
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNavigation = document.getElementById("mobileNavigation");
const themeToggle = document.getElementById("themeToggle");

const desktopSectionLinks = document.querySelectorAll(
  '.desktop-nav .nav-link[href^="#"]'
);

const mobileSectionLinks = document.querySelectorAll(
  '.mobile-navigation .mobile-nav-link[href^="#"]'
);

const allSectionLinks = document.querySelectorAll(
  '.nav-link[href^="#"], .mobile-nav-link[href^="#"], .scroll-indicator[href^="#"], .primary-button[href^="#"]'
);

const pageSections = document.querySelectorAll("main section[id]");

/* =========================
   MOBILE MENU
========================= */

function openMobileMenu() {
  if (!mobileNavigation || !menuToggle) return;

  mobileNavigation.classList.add("is-open");
  menuToggle.classList.add("is-active");
  menuToggle.setAttribute("aria-expanded", "true");

  body.classList.add("menu-open");
}

function closeMobileMenu() {
  if (!mobileNavigation || !menuToggle) return;

  mobileNavigation.classList.remove("is-open");
  menuToggle.classList.remove("is-active");
  menuToggle.setAttribute("aria-expanded", "false");

  body.classList.remove("menu-open");
}

function toggleMobileMenu() {
  if (!mobileNavigation) return;

  const menuIsOpen =
    mobileNavigation.classList.contains("is-open");

  if (menuIsOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (menuToggle) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.addEventListener("click", toggleMobileMenu);
}

if (mobileNavigation) {
  mobileNavigation.addEventListener("click", (event) => {
    if (event.target === mobileNavigation) {
      closeMobileMenu();
    }
  });
}

document
  .querySelectorAll(".mobile-nav-link")
  .forEach((link) => {
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
  if (!siteHeader) return;

  if (window.scrollY > 40) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", updateHeaderOnScroll, {
  passive: true
});

updateHeaderOnScroll();

/* =========================
   SMOOTH SCROLLING
========================= */

function scrollToSection(event) {
  const link = event.currentTarget;
  const targetId = link.getAttribute("href");

  if (!targetId || targetId === "#") return;

  const targetSection = document.querySelector(targetId);

  if (!targetSection) return;

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
}

allSectionLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

/* =========================
   ACTIVE NAVIGATION
========================= */

function setActiveNavigation(sectionId) {
  desktopSectionLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("active", isActive);
  });

  mobileSectionLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("active", isActive);
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (firstEntry, secondEntry) =>
            secondEntry.intersectionRatio -
            firstEntry.intersectionRatio
        );

      if (visibleEntries.length > 0) {
        setActiveNavigation(
          visibleEntries[0].target.id
        );
      }
    },
    {
      root: null,
      rootMargin: "-25% 0px -60% 0px",
      threshold: [0.05, 0.2, 0.4, 0.6]
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* =========================
   DARK MODE
========================= */

const themeStorageKey = "oombam-theme";

function applySavedTheme() {
  if (!themeToggle) return;

  try {
    const savedTheme =
      localStorage.getItem(themeStorageKey);

    if (savedTheme === "dark") {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  } catch (error) {
    console.warn(
      "The saved theme could not be loaded.",
      error
    );
  }
}

function updateThemeButton() {
  if (!themeToggle) return;

  const darkThemeIsActive =
    body.classList.contains("dark-theme");

  themeToggle.setAttribute(
    "aria-label",
    darkThemeIsActive
      ? "Switch to light theme"
      : "Switch to dark theme"
  );

  themeToggle.setAttribute(
    "title",
    darkThemeIsActive
      ? "Switch to light theme"
      : "Switch to dark theme"
  );
}

function toggleTheme() {
  body.classList.toggle("dark-theme");

  const darkThemeIsActive =
    body.classList.contains("dark-theme");

  try {
    localStorage.setItem(
      themeStorageKey,
      darkThemeIsActive ? "dark" : "light"
    );
  } catch (error) {
    console.warn(
      "The theme preference could not be saved.",
      error
    );
  }

  updateThemeButton();
}

applySavedTheme();
updateThemeButton();

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

/* =========================
   CLOSE MENU ON RESIZE
========================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    closeMobileMenu();
  }
});

/* =========================
   IMAGE FALLBACKS
========================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    console.warn(
      `Image could not be loaded: ${image.src}`
    );
  });
});
