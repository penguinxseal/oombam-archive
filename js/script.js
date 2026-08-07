"use strict";


/* =========================================================
   OOMBAM FANSITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL ELEMENTS
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

  const shouldStick =
    window.scrollY > 40;

  siteHeader.classList.toggle(
    "is-scrolled",
    shouldStick
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
    Close when user clicks
    outside the menu panel.
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
    Close after selecting
    a mobile navigation link.
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
   ESC KEY CLOSE
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
          Ignore placeholder links.
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


        const headerHeight =
          siteHeader
            ? siteHeader.offsetHeight
            : 0;


        const destination =
          targetSection
            .getBoundingClientRect()
            .top
          +
          window.scrollY
          -
          headerHeight;


        window.scrollTo({

          top: destination,

          behavior: "smooth"

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


    if (
      savedTheme === "light"
    ) {

      body.classList.remove(
        "dark-theme"
      );

    }

  } catch (error) {

    console.warn(
      "Unable to load saved theme.",
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
      "Unable to save theme.",
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
   UPCOMING PHOTO POSITION FIX
========================================================= */

const upcomingPhoto =
  document.querySelector(
    ".upcoming-photo"
  );

const upcomingPhotoWrap =
  document.querySelector(
    ".upcoming-photo-wrap"
  );


function updateUpcomingPhotoLayout() {

  if (
    !upcomingPhoto ||
    !upcomingPhotoWrap
  ) {
    return;
  }


  /*
    Always use cover so the
    photo fills the card.
  */

  upcomingPhoto.style.objectFit =
    "cover";


  /*
    Position the photo higher
    so Oom and Bam's faces stay
    visible instead of being
    cropped off.
  */

  if (
    window.innerWidth <= 430
  ) {

    upcomingPhoto.style.objectPosition =
      "center 12%";

    upcomingPhotoWrap.style.height =
      "235px";

  } else if (
    window.innerWidth <= 768
  ) {

    upcomingPhoto.style.objectPosition =
      "center 14%";

    upcomingPhotoWrap.style.height =
      "270px";

  } else if (
    window.innerWidth <= 1180
  ) {

    upcomingPhoto.style.objectPosition =
      "center 16%";

    upcomingPhotoWrap.style.height =
      "320px";

  } else {

    upcomingPhoto.style.objectPosition =
      "center 18%";

    upcomingPhotoWrap.style.height =
      "290px";

  }

}


updateUpcomingPhotoLayout();


/* =========================================================
   RESPONSIVE HANDLING
========================================================= */

window.addEventListener(
  "resize",
  () => {

    /*
      Reset mobile navigation
      when returning to desktop.
    */

    if (
      window.innerWidth > 1100
    ) {

      closeMenu();

    }


    /*
      Recalculate upcoming
      image framing.
    */

    updateUpcomingPhotoLayout();

  }
);


/* =========================================================
   OOMBAM WEIBO GALA 2026
========================================================= */

/*

  EVENT:

  OOMBAM
  Weibo Gala 2026
  Weibo Cultural Communication Night

  DATE:
  Saturday, August 8, 2026

  MAIN SHOW:
  6:00 PM Thailand local time

  TIMEZONE:
  UTC +07:00

*/


/* =========================================================
   COUNTDOWN ELEMENTS
========================================================= */

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


/* =========================================================
   AUTHORITATIVE EVENT TIME
========================================================= */

/*

  IMPORTANT:

  We deliberately define the
  correct target here instead
  of relying only on HTML.

  This prevents an old cached
  data-event-date value from
  accidentally counting down
  to midnight.

*/


const WEIBO_GALA_TARGET =
  "2026-08-08T18:00:00+07:00";


const WEIBO_GALA_TIME =
  new Date(
    WEIBO_GALA_TARGET
  ).getTime();


let countdownInterval =
  null;


/* =========================================================
   FORCE HTML TO CORRECT DATE
========================================================= */

if (eventCountdown) {

  eventCountdown.setAttribute(
    "data-event-date",
    WEIBO_GALA_TARGET
  );

}


/* =========================================================
   FORMAT COUNTDOWN NUMBER
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
   UPDATE COUNTDOWN VALUES
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
   COUNTDOWN CALCULATION
========================================================= */

function updateEventCountdown() {

  if (
    !eventCountdown ||
    !countdownDays ||
    !countdownHours ||
    !countdownMinutes ||
    !countdownSeconds
  ) {

    return;

  }


  /*
    Validate target.
  */

  if (
    Number.isNaN(
      WEIBO_GALA_TIME
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
        "Event time unavailable";

    }


    return;

  }


  const now =
    Date.now();


  const remaining =
    WEIBO_GALA_TIME -
    now;


  /* =======================================================
     EVENT HAS ARRIVED
  ======================================================= */

  if (
    remaining <= 0
  ) {

    displayCountdown(
      0,
      0,
      0,
      0
    );


    if (countdownStatus) {

      countdownStatus.textContent =
        "OOMBAM • Weibo Gala 2026 ✨";

    }


    if (countdownInterval) {

      window.clearInterval(
        countdownInterval
      );


      countdownInterval =
        null;

    }


    return;

  }


  /* =======================================================
     TIME CONSTANTS
  ======================================================= */

  const SECOND =
    1000;


  const MINUTE =
    SECOND * 60;


  const HOUR =
    MINUTE * 60;


  const DAY =
    HOUR * 24;


  /* =======================================================
     CALCULATE DAYS
  ======================================================= */

  const days =
    Math.floor(
      remaining /
      DAY
    );


  /* =======================================================
     CALCULATE HOURS
  ======================================================= */

  const hours =
    Math.floor(
      (
        remaining %
        DAY
      )
      /
      HOUR
    );


  /* =======================================================
     CALCULATE MINUTES
  ======================================================= */

  const minutes =
    Math.floor(
      (
        remaining %
        HOUR
      )
      /
      MINUTE
    );


  /* =======================================================
     CALCULATE SECONDS
  ======================================================= */

  const seconds =
    Math.floor(
      (
        remaining %
        MINUTE
      )
      /
      SECOND
    );


  /* =======================================================
     DISPLAY
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
   START LIVE COUNTDOWN
========================================================= */

if (eventCountdown) {

  /*
    Calculate immediately.

    This replaces the -- values
    as soon as JS loads.
  */

  updateEventCountdown();


  /*
    Recalculate every second.
  */

  countdownInterval =
    window.setInterval(
      updateEventCountdown,
      1000
    );

}
