"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

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


/* =========================================================
   STICKY HEADER
========================================================= */

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
  {
    passive: true
  }
);


updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {

  if (
    !mobileMenu ||
    !menuToggle
  ) {
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


  menuToggle.setAttribute(
    "aria-label",
    "Close navigation menu"
  );


  body.classList.add(
    "menu-open"
  );

}


function closeMenu() {

  if (
    !mobileMenu ||
    !menuToggle
  ) {
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


  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );


  body.classList.remove(
    "menu-open"
  );

}


function toggleMenu() {

  if (!mobileMenu) {
    return;
  }


  const menuIsOpen =
    mobileMenu.classList.contains(
      "is-open"
    );


  if (menuIsOpen) {

    closeMenu();

  } else {

    openMenu();

  }

}


if (menuToggle) {

  menuToggle.addEventListener(
    "click",
    toggleMenu
  );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

if (mobileMenu) {

  /*
    Close when clicking outside
    the navigation panel.
  */

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


  /*
    Close when a navigation
    link is selected.
  */

  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });

}


/* =========================================================
   ESCAPE KEY
========================================================= */

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


/* =========================================================
   SMOOTH SCROLL
========================================================= */

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


        /*
          Ignore empty links.
        */

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const targetSection =
          document.querySelector(
            targetId
          );


        if (!targetSection) {
          return;
        }


        event.preventDefault();


        /*
          Compensate for the
          fixed navigation header.
        */

        const headerHeight =
          siteHeader
            ? siteHeader.offsetHeight
            : 0;


        const targetPosition =
          targetSection
            .getBoundingClientRect()
            .top
          +
          window.scrollY
          -
          headerHeight;


        window.scrollTo({

          top:
            targetPosition,

          behavior:
            "smooth"

        });


        closeMenu();

      }

    );

  });


/* =========================================================
   DARK MODE
========================================================= */

const themeStorageKey =
  "oombam-theme";


function updateThemeButton() {

  if (!themeToggle) {
    return;
  }


  const darkMode =
    body.classList.contains(
      "dark-theme"
    );


  themeToggle.setAttribute(
    "aria-label",
    darkMode
      ? "Switch to light theme"
      : "Switch to dark theme"
  );

}


function loadTheme() {

  try {

    const savedTheme =
      localStorage.getItem(
        themeStorageKey
      );


    if (
      savedTheme === "dark"
    ) {

      body.classList.add(
        "dark-theme"
      );

    }

  } catch (error) {

    console.warn(
      "Unable to load theme preference.",
      error
    );

  }


  updateThemeButton();

}


function toggleTheme() {

  body.classList.toggle(
    "dark-theme"
  );


  const darkMode =
    body.classList.contains(
      "dark-theme"
    );


  try {

    localStorage.setItem(
      themeStorageKey,
      darkMode
        ? "dark"
        : "light"
    );

  } catch (error) {

    console.warn(
      "Unable to save theme preference.",
      error
    );

  }


  updateThemeButton();

}


if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    toggleTheme
  );

}


loadTheme();


/* =========================================================
   RESPONSIVE MENU RESET
========================================================= */

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


/* =========================================================
   WEIBO GALA 2026
   LIVE EVENT COUNTDOWN
========================================================= */

/*
  EVENT

  OOMBAM
  Weibo Gala 2026
  Weibo Cultural Communication Night

  Saturday, August 8, 2026
  Main Show: 6:00 PM Thailand Time

  Thailand timezone:
  UTC +07:00
*/


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


let countdownInterval = null;


/* =========================================================
   NUMBER FORMAT
========================================================= */

function formatCountdownNumber(
  number
) {

  return String(
    number
  ).padStart(
    2,
    "0"
  );

}


/* =========================================================
   DISPLAY VALUES
========================================================= */

function displayCountdown(
  days,
  hours,
  minutes,
  seconds
) {

  if (countdownDays) {

    countdownDays.textContent =
      formatCountdownNumber(
        days
      );

  }


  if (countdownHours) {

    countdownHours.textContent =
      formatCountdownNumber(
        hours
      );

  }


  if (countdownMinutes) {

    countdownMinutes.textContent =
      formatCountdownNumber(
        minutes
      );

  }


  if (countdownSeconds) {

    countdownSeconds.textContent =
      formatCountdownNumber(
        seconds
      );

  }

}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateEventCountdown() {

  if (!eventCountdown) {
    return;
  }


  /*
    Read target date from HTML.

    Required value:

    2026-08-08T18:00:00+07:00
  */

  const eventDateString =
    eventCountdown.getAttribute(
      "data-event-date"
    );


  if (!eventDateString) {

    displayCountdown(
      0,
      0,
      0,
      0
    );


    if (countdownStatus) {

      countdownStatus.textContent =
        "Event date unavailable";

    }


    return;

  }


  const eventTime =
    new Date(
      eventDateString
    ).getTime();


  /*
    Validate date.
  */

  if (
    Number.isNaN(
      eventTime
    )
  ) {

    displayCountdown(
      0,
      0,
      0,
      0
    );


    if (countdownStatus) {

      countdownStatus.textContent =
        "Event date unavailable";

    }


    return;

  }


  const currentTime =
    Date.now();


  const remainingTime =
    eventTime -
    currentTime;


  /* =======================================================
     EVENT HAS STARTED
  ======================================================= */

  if (
    remainingTime <= 0
  ) {

    displayCountdown(
      0,
      0,
      0,
      0
    );


    if (countdownStatus) {

      countdownStatus.textContent =
        "OOMBAM • Weibo Gala 2026 is happening now ✨";

    }


    if (
      countdownInterval
    ) {

      clearInterval(
        countdownInterval
      );


      countdownInterval =
        null;

    }


    return;

  }


  /* =======================================================
     TIME UNITS
  ======================================================= */

  const second =
    1000;


  const minute =
    second * 60;


  const hour =
    minute * 60;


  const day =
    hour * 24;


  /* =======================================================
     CALCULATE REMAINING TIME
  ======================================================= */

  const days =
    Math.floor(
      remainingTime /
      day
    );


  const hours =
    Math.floor(
      (
        remainingTime %
        day
      )
      /
      hour
    );


  const minutes =
    Math.floor(
      (
        remainingTime %
        hour
      )
      /
      minute
    );


  const seconds =
    Math.floor(
      (
        remainingTime %
        minute
      )
      /
      second
    );


  /* =======================================================
     UPDATE PAGE
  ======================================================= */

  displayCountdown(
    days,
    hours,
    minutes,
    seconds
  );


  if (countdownStatus) {

    countdownStatus.textContent =
      "Main show • August 8, 2026 • 6:00 PM Thailand Time";

  }

}


/* =========================================================
   START COUNTDOWN
========================================================= */

if (eventCountdown) {

  /*
    Render immediately so the
    user does not briefly see
    00 00 00 00.
  */

  updateEventCountdown();


  /*
    Then update once every
    second.
  */

  countdownInterval =
    window.setInterval(

      updateEventCountdown,

      1000

    );

}
