const url = "https://api.spacexdata.com/v3/launches/past";
const resultsContainer = document.querySelector(".results");

async function getPastLaunches() {

  try {
    const response = await fetch(url);
    const results = await response.json();

    createPastFlightHtml(results)
  }
  catch(error) {
    resultsContainer.innerHTML = displayError("An error occured when calling API")
  }
}

getPastLaunches();


function createPastFlightHtml(results) {

  function sortByFlightNumber(property){ 
  
    return function(a, b){  
      
       if(a[property] > b[property])  
       {return -1;  }
       else if(a[property] < b[property])  
         {return +1;}   
   
       return 0;  
    };  
  }
  results.sort(sortByFlightNumber("flight_number"));

  resultsContainer.innerHTML = "";

  results.forEach(object => {
  
  const launchDate = object.launch_date_utc;
  const getDate = new Date(launchDate);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(getDate);
  const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(getDate);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(getDate);

  const rocketBadge = object.links.mission_patch_small;
  const missionName = object.mission_name
  const flightNumber = object.flight_number;
  const date = `${mo} ${da}, ${ye}`;
  const launchSite = object.launch_site.site_name_long;
  const rocketName = object.rocket.rocket_name;
  const launchSuccess = object.launch_success;
  function successFactor() {
    return launchSuccess ? `<p class="successful_message">SUCCESSFUL</p>` : `<p class="unsuccessful_message">UNSUCCESSFUL</p>`;
  }

  resultsContainer.innerHTML +=  `<a href="./details.html?flight_number=${flightNumber}" class="result">
    <img class="badge" src="${rocketBadge}" alt="">
    <h2 class="mission__name">${missionName}</h2>
    <p><b>Flight Number:</b> ${flightNumber}</p>
    <p><b>Launch Date:</b> ${date}</p>
    <p><b>Launch Site:</b> ${launchSite}</p>
    <p><b>Rocket Name:</b> ${rocketName}</p>
    ${successFactor()}
  </a>`
  });
}