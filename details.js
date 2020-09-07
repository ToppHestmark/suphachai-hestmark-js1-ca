const detailsContainer = document.querySelector(".details_container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flightNumber = params.get("flight_number");
// const url = "https://api.spacexdata.com/v3/launches/100";
console.log(flightNumber)

async function getDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    // createDetailsHtml(details);
  }
  catch(error) {
    detailsContainer.innerHTML = displayError("An error occured when calling API");
  }
}
getDetails()


// function createDetailsHtml(details) {
//     const launchDateUtc = new Date(details.launch_date_utc);
//     const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(launchDateUtc)
//     const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(launchDateUtc)
//     const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(launchDateUtc)
//     const dateReleased = `${mo} ${da}, ${ye}`;

//     detailsContainer.innerHTML = `<div class="details_result">
//     <a class="going_back_link" href="index.html">Back to Past Missions</a>
//     <h2 class="game_name">${details.name}</h2>
//     <img class="background-image" src="${details.background_image}" alt="${details.name}">
//     <div class="details_description">${details.description}</div>
//     <p><strong>Date released:</strong> <time class="details-date">${dateReleased}</time></p>
//     </div>`
// }