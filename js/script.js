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

  upcomingPhoto.style.objectFit =
    "cover";


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
