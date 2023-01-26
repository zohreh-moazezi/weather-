function get(url, success, fail) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url);
  httpRequest.onload = function () {
    // update
    if (httpRequest.status === 200) {
      success(httpRequest.responseText);
    } else {
      // actual status code
      fail(httpRequest.status);
    }
  };
  httpRequest.send();
}

function successHandler(data) {
  const dataObj = JSON.parse(data);
  const weatherDiv = document.querySelector("#weather");
  const weatherFragment = `
        <h1>Weather</h1>
        <h2 class="top">
        <img
            src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
            alt="${dataObj.weather[0].description}"
            width="50"
            height="50"
        />${dataObj.name}
        </h2>
        <p>
        <span class="tempF">${tempToC(dataObj.main.temp)}&deg;</span> | ${
    dataObj.weather[0].description
  }
        </p>
    `;
  weatherDiv.innerHTML = weatherFragment;
  weatherDiv.classList.remove("hidden");
}

function failHandler(status) {
  console.log(status);
  const weatherDiv = document.querySelector("#weather");
  weatherDiv.classList.remove("hidden");
}

function tempToC(kelvin) {
  return (kelvin - 273.15).toFixed(0);
}

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "7ea8e959cebbba86bef1edd5c42ee827";
  // const apiKey = "";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=tehran&APPID=" + apiKey;
  // update it with three parameters
  get(url, successHandler, failHandler);
});

// simulate a problem
// empty API key
