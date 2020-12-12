const detailsContainer = document.querySelector(".details_container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flight_number = params.get("flight_number");
const detailsMission =
  "https://api.spacexdata.com/v3/launches/" + flight_number;

const getDetails = async () => {
  try {
    const response = await fetch(detailsMission);
    const details = await response.json();

    createDetailsHtml(details);
  } catch (error) {
    detailsContainer.innerHTML = displayError(
      "An error occured when calling API"
    );
  }
};
getDetails();

function createDetailsHtml(details) {
  const launchDateUtc = new Date(details.launch_date_utc);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    launchDateUtc
  );
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(
    launchDateUtc
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    launchDateUtc
  );
  const dateLaunched = `${month} ${day}, ${year}`;
  const missionName = details.mission_name;
  const image = details.links.flickr_images;
  const launchSite = details.launch_site.site_name_long;
  const flightNumber = details.flight_number;
  const detailsText = details.details;
  const rocketName = details.rocket.rocket_name;
  const rocketType = details.rocket.rocket_type;
  const payloadType = details.rocket.second_stage.payloads[0].payload_type;
  const payloadMass = details.rocket.second_stage.payloads[0].payload_mass_kg;
  const nationality = details.rocket.second_stage.payloads[0].nationality;
  const videoLink = details.links.video_link;

  const launchSuccess = details.launch_success;
  function successFactor() {
    return launchSuccess
      ? `<span class="details__successMessage">SUCCESSFUL</span>`
      : `<span class="details__failedMessage">UNSUCCESSFUL</span>`;
  }

  detailsContainer.innerHTML = `
  <h2 class="details__missionName">Mission: ${missionName}</h2>
  <div class="details_card">
      <img src="${image}" alt="${missionName}">
      <div class="details__textsContainer">
      <p class="details_description">${detailsText}</p>
      <p><b>This mission was:</b> ${successFactor()}</p>
      <p><b>Date Launched:</b> ${dateLaunched}</p>
      <p><b>Flight Number:</b> ${flightNumber}</p>
      <h2 class="details__subHeader">Mission details:</h2>
        <li>Launch Site: ${launchSite}</li>
        <li>Rocket Name: ${rocketName}</li>
        <li>Rocket Type: ${rocketType}</li>
        <li>Payload Type: ${payloadType}</li>
        <li>Payload Mass: ${payloadMass} kg</li>
        <li>Nationality: ${nationality} </li>
      <div class="details__links">
      <a class="backLink" href="../../index.html">BACK</a>
        <a target="_blank" href="${videoLink}">WATCH VIDEO</a>
      </div>
      </div>
    </div>`;
}
