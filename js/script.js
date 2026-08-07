const body = document.body;
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNavigation = document.getElementById("mobileNavigation");
const themeToggle = document.getElementById("themeToggle");

const desktopLinks = document.querySelectorAll(".nav-link");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
const sectionLinks = document.querySelectorAll(
  '.nav-link[href^="#"], .mobile-nav-link[href^="#"]'
);

/* =========================
   MOBILE MENU
========================= */

function openMobileMenu() {
  mobileNavigation.classList.add("is-open");
  menuToggle.classList.add("is-active");
  menuToggle.setAttribute("aria-expanded", "true");
  body.classList.add("menu-open");
}

function closeMobileMenu() {
  mobileNavigation.classList.remove("is-open");
  menuToggle.classList.remove("is-active");
  menuToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNavigation.classList.contains("is-open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileNavigation.addEventListener("click", (event) => {
  if (event.target === mobileNavigation) {
    closeMobileMenu();
  }
});

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

function updateHeader() {
  if (window.scrollY > 40) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = Array.from(
  document.querySelectorAll("main section[id]")
);

function setActiveLink(sectionId) {
  desktopLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${sectionId}`
    );
  });

  mobileLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${sectionId}`
    );
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (first, second) =>
          second.intersectionRatio - first.intersectionRatio
      );

    if (visibleSections.length > 0) {
      setActiveLink(visibleSections[0].target.id);
    }
  },
  {
    root: null,
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.05, 0.2, 0.4, 0.6]
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* =========================
   SMOOTH SECTION SCROLLING
========================= */

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* =========================
   DARK MODE
========================= */

const savedTheme = localStorage.getItem("oombam-theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
}

function updateThemeButtonLabel() {
  const darkModeActive = body.classList.contains("dark-theme");

  themeToggle.setAttribute(
    "aria-label",
    darkModeActive
      ? "Switch to light theme"
      : "Switch to dark theme"
  );
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  const darkModeActive = body.classList.contains("dark-theme");

  localStorage.setItem(
    "oombam-theme",
    darkModeActive ? "dark" : "light"
  );

  updateThemeButtonLabel();
});

updateThemeButtonLabel();

/* =========================
   CLOSE MENU ON RESIZE
========================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    closeMobileMenu();
  }
});
