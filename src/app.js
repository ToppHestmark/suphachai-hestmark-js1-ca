const url = "https://api.spacexdata.com/v3/launches/past";
const pastLaunchContainer = document.querySelector(
  ".index__pastLaunchContainer"
);

const getPastLaunches = async () => {
  try {
    const response = await fetch(url);
    const pastLaunchesResults = await response.json();

    createPastLaunchesHtml(pastLaunchesResults);
  } catch (error) {
    pastLaunchContainer.innerHTML = displayError(
      "An error occured when calling API"
    );
  }
};
getPastLaunches();

function createPastLaunchesHtml(pastLaunchesResults) {
  function sortByFlightNumber(property) {
    return function (a, b) {
      if (a[property] > b[property]) {
        return -1;
      } else if (a[property] < b[property]) {
        return +1;
      }

      return 0;
    };
  }
  pastLaunchesResults.sort(sortByFlightNumber("flight_number"));

  pastLaunchContainer.innerHTML = "";

  pastLaunchesResults.map((mission) => {
    const launchDate = mission.launch_date_utc;
    const getDate = new Date(launchDate);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      getDate
    );
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(
      getDate
    );
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
      getDate
    );

    const rocketBadge = mission.links.mission_patch_small;
    const missionName = mission.mission_name;
    const flightNumber = mission.flight_number;
    const date = `${month} ${day}, ${year}`;
    const launchSite = mission.launch_site.site_name_long;
    const rocketName = mission.rocket.rocket_name;
    const launchSuccess = mission.launch_success;
    function successFactor() {
      return launchSuccess
        ? `<p class="index__successMessage">SUCCESSFUL</p>`
        : `<p class="index__failedMessage">UNSUCCESSFUL</p>`;
    }

    pastLaunchContainer.innerHTML += `<a href="./src/pages/details.html?flight_number=${flightNumber}" class="index__pastLaunchesResult">
    <img class="badge" src="${rocketBadge}" alt="">
    <h2 class="mission__name">${missionName}</h2>
    <p><b>Flight#:</b> ${flightNumber}</p>
    <p><b>Date:</b> ${date}</p>
    <p><b>Site:</b> ${launchSite}</p>
    <p><b>Rocket:</b> ${rocketName}</p>
    ${successFactor()}
  </a>`;
  });
}

// ------------- Navbar ---------------

const body = document.querySelector("body");
const nav = document.querySelector("nav");

const navbarSlideFromTheSide = () => {
  const burger = document.querySelector(".nav__burger");
  const navLinksList = document.querySelector(".nav__links");
  const navLinks = document.querySelectorAll(".nav__links li");

  burger.addEventListener("click", () => {
    body.classList.toggle("body--preventScrolling");
    navLinksList.classList.toggle("nav--active");

    navLinks.forEach((link, index) => {
      const easeSpeed = index / 7 + 0.2;

      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `nav--linksFade 0.5s ease forwards ${easeSpeed}s`;
      }
    });

    burger.classList.toggle("nav--burgerToggle");
  });
};
navbarSlideFromTheSide();

window.onscroll = () => {
  const scrollingPosition = Math.ceil(window.scrollY);

  if (scrollingPosition > 100) {
    nav.classList.add("nav--fill");
  } else {
    nav.classList.remove("nav--fill");
  }
};
