"use strict";

/* =========================
   ELEMENTS
========================= */

const body =
  document.body;

const siteHeader =
  document.getElementById("siteHeader");

const menuToggle =
  document.getElementById("menuToggle");

const mobileMenu =
  document.getElementById("mobileMenu");

const themeToggle =
  document.getElementById("themeToggle");


/* =========================
   HEADER
========================= */

function updateHeader() {

  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle(
    "is-scrolled",
    window.scrollY > 40
  );
}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================
   MOBILE MENU
========================= */

function openMenu() {

  if (!mobileMenu || !menuToggle) {
    return;
  }

  mobileMenu.classList.add("is-open");

  mobileMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  menuToggle.classList.add("is-active");

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  body.classList.add("menu-open");
}


function closeMenu() {

  if (!mobileMenu || !menuToggle) {
    return;
  }

  mobileMenu.classList.remove("is-open");

  mobileMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  menuToggle.classList.remove("is-active");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  body.classList.remove("menu-open");
}


if (menuToggle) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        mobileMenu.classList.contains(
          "is-open"
        );

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    }
  );
}


if (mobileMenu) {

  mobileMenu.addEventListener(
    "click",
    (event) => {

      if (event.target === mobileMenu) {
        closeMenu();
      }

    }
  );

  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });
}


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  }
);


/* =========================
   SMOOTH SCROLL
========================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetId
          );

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================
   DARK MODE
========================= */

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      body.classList.toggle(
        "dark-theme"
      );

    }
  );

}


/* =========================
   RESIZE
========================= */

window.addEventListener(
  "resize",
  () => {

    if (window.innerWidth > 1050) {
      closeMenu();
    }

  }
);
