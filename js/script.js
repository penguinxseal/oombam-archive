"use strict";

/* =========================
   ELEMENTS
========================= */

const body = document.body;

const siteHeader =
  document.getElementById("siteHeader");

const menuToggle =
  document.getElementById("menuToggle");

const mobileMenu =
  document.getElementById("mobileMenu");

const themeToggle =
  document.getElementById("themeToggle");


/* =========================
   STICKY HEADER
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

  mobileMenu.classList.add(
    "is-open"
  );

  menuToggle.classList.add(
    "is-active"
  );

  mobileMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  body.classList.add(
    "menu-open"
  );
}


function closeMenu() {

  if (!mobileMenu || !menuToggle) {
    return;
  }

  mobileMenu.classList.remove(
    "is-open"
  );

  menuToggle.classList.remove(
    "is-active"
  );

  mobileMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  body.classList.remove(
    "menu-open"
  );
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


/* =========================
   CLOSE MENU
========================= */

if (mobileMenu) {

  mobileMenu.addEventListener(
    "click",
    (event) => {

      if (
        event.target === mobileMenu
      ) {
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


/* =========================
   ESC TO CLOSE MENU
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {
      closeMenu();
    }

  }
);


/* =========================
   SMOOTH SCROLL
========================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute(
            "href"
          );

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
   CLOSE MENU ON RESIZE
========================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 1100
    ) {
      closeMenu();
    }

  }
);


/* =========================
   WEIBO GALA COUNTDOWN
========================= */

const eventCountdown =
  document.getElementById(
    "eventCountdown"
  );

const countdownDays =
  document.getElementById(
    "countdownDays"
  );

const countdownHours =
  document.getElementById(
    "countdownHours"
  );

const countdownMinutes =
  document.getElementById(
    "countdownMinutes"
  );

const countdownSeconds =
  document.getElementById(
    "countdownSeconds"
  );

const countdownStatus =
  document.getElementById(
    "countdownStatus"
  );


function padNumber(number) {

  return String(number).padStart(
    2,
    "0"
  );

}


function updateCountdown() {

  if (!eventCountdown) {
    return;
  }

  const targetDate =
    new Date(
      eventCountdown.dataset.eventDate
    ).getTime();

  const now =
    new Date().getTime();

  const difference =
    targetDate - now;


  /* Event started */

  if (difference <= 0) {

    countdownDays.textContent =
      "00";

    countdownHours.textContent =
      "00";

    countdownMinutes.textContent =
      "00";

    countdownSeconds.textContent =
      "00";

    countdownStatus.textContent =
      "OOMBAM is now at Weibo Gala 2026 ✨";

    return;
  }


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );

  const hours =
    Math.floor(
      (
        difference %
        (1000 * 60 * 60 * 24)
      ) /
      (1000 * 60 * 60)
    );

  const minutes =
    Math.floor(
      (
        difference %
        (1000 * 60 * 60)
      ) /
      (1000 * 60)
    );

  const seconds =
    Math.floor(
      (
        difference %
        (1000 * 60)
      ) /
      1000
    );


  countdownDays.textContent =
    padNumber(days);

  countdownHours.textContent =
    padNumber(hours);

  countdownMinutes.textContent =
    padNumber(minutes);

  countdownSeconds.textContent =
    padNumber(seconds);


  countdownStatus.textContent =
    "Counting down to Weibo Cultural Communication Night";

}


/* Initial render */

updateCountdown();


/* Update every second */

setInterval(
  updateCountdown,
  1000
);
