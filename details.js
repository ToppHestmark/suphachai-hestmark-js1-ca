const detailsContainer = document.querySelector(".details_container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flight_number = params.get("flight_number");
const url = "https://api.spacexdata.com/v3/launches/" + flight_number;

async function getDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    createDetailsHtml(details);
  }
  catch(error) {
    detailsContainer.innerHTML = displayError("An error occured when calling API");
  }
}
getDetails()


function createDetailsHtml(details) {
    const launchDateUtc = new Date(details.launch_date_utc);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(launchDateUtc)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(launchDateUtc)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(launchDateUtc)
    const dateLaunched = `${mo} ${da}, ${ye}`;
    const missionName = details.mission_name;
    const image = details.links.flickr_images;
    const launchSite = details.launch_site.site_name_long;
    const detailsText = details.details;
    const rocketName = details.rocket.rocket_name;
    const rocketType = details.rocket.rocket_type;
    const payloadType = details.rocket.second_stage.payloads[0].payload_type;
    const payloadMass = details.rocket.second_stage.payloads[0].payload_mass_kg;
    const nationality = details.rocket.second_stage.payloads[0].nationality;
    const videoLink = details.links.video_link;

    const launchSuccess = details.launch_success;
    function successFactor() {
      return launchSuccess ? `<span class="successful_message">SUCCESSFUL</span>` : `<span class="unsuccessful_message">UNSUCCESSFUL</span>`;
    }
    
    detailsContainer.innerHTML = `<div class="details_result">
      <h2 class="mission_name">Mission: ${missionName}</h2>
      <img src="${image}" alt="${missionName}">
      <p class="image_text">Photo: SpaceX</p>
      <div class="text_content_container">
      <p class="details_description">${detailsText}</p>
      <p><b>This mission was:</b> ${successFactor()}</p>
      <p><b>Date Launched:</b> ${dateLaunched}</p>
      <h2 class="mission_subheader">Mission details:</h2>
        <li>Launch Site: ${launchSite}</li>
        <li>Rocket Name: ${rocketName}</li>
        <li>Rocket Type: ${rocketType}</li>
        <li>Payload Type: ${payloadType}</li>
        <li>Payload Mass: ${payloadMass} kg</li>
        <li>Nationality: ${nationality} </li>
      <div class="links">
        <a href="${videoLink}">WATCH VIDEO</a>
        <a href="index.html">BACK</a>
      </div>
      </div>
    </div>`
}