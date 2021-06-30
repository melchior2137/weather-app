function display_c() {
  let refresh = 1000; // Refresh rate in milli seconds
  let today = new Date();
  let currHour = today.getHours();
  let currMinutes = today.getMinutes();
  let currSeconds = today.getSeconds();
  if (currHour < 10) {
    currHour = "0" + currHour;
  }
  if (currMinutes < 10) {
    currMinutes = "0" + currMinutes;
  }
  if (currSeconds < 10) {
    currSeconds = "0" + currSeconds;
  }
  document.getElementById('curr-time').innerHTML = currHour + ":" + currMinutes + ":" + currSeconds;
  mytime = setTimeout('display_c()', refresh)
}

display_c();


let today = new Date();
let currMonth = today.getMonth() + 1;
let currDay = today.getDate();
let currYear = today.getFullYear();
if (currMonth < 10) {
  currMonth = "0" + currMonth;
}
if (currDay < 10) {
  currMonth = "0" + currMonth;
}

document.getElementById("curr-date").innerHTML = currDay + "." + currMonth
  + "." + currYear;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let day1 = document.querySelector("#day1");
day1.innerHTML = days[today.getDay() + 1];

let day2 = document.querySelector("#day2");
day2.innerHTML = days[today.getDay() + 2];

let day3 = document.querySelector("#day3");
day3.innerHTML = days[today.getDay() + 3];

let day4 = document.querySelector("#day4");
day4.innerHTML = days[today.getDay() + 4];

let day5 = document.querySelector("#day5");
day5.innerHTML = days[today.getDay() + 5];


let button = document.getElementById("getCurrPosition");

button.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    alertLocation(lat, long);
    getWeather(lat, long);
  });
});

function alertLocation(latitude, longitude) {
  var api_key = '2691da71fc744450a0d4841af45eebae';
  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function () {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200) {
      // Success!
      var data = JSON.parse(request.responseText);
      var cityNameAndCode = data.results[0].formatted.split(',');
      console.log(cityNameAndCode);
      let cityName = cityNameAndCode[1].split(" ");
      console.log(cityName);
      document.getElementById("localization").innerHTML = cityName[2];
    } else if (request.status <= 500) {
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request
}

let temp = document.querySelector('#currTemp');
let tempDay1 = document.querySelector('#day1temp');
let tempDay2 = document.querySelector('#day2temp');
let tempDay3 = document.querySelector('#day3temp');
let tempDay4 = document.querySelector('#day4temp');
let tempDay5 = document.querySelector('#day5temp');

function getWeather(lat, lon) {
  console.log(lat);
  console.log(lon);
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=2d81ea702e902d65af59547bd10d8e08&units=metric')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let tempValue = data['current']['temp'];
      temp.innerHTML = Math.round(tempValue) + "°C";

      let currDescription = data['current']['weather']['0']['icon'];

      let currWeatherImg = document.querySelector("#curr-weather");
      switch (currDescription) {
        case "01d":
          currWeatherImg.src = 'img/clear_sky.png';
          break;
        case "02d":
          currWeatherImg.src = 'img/few_clouds.png';
          break;
        case "03d":
          currWeatherImg.src = 'img/scattered_clouds.png';
          break;
        case "04d":
          currWeatherImg.src = 'img/scattered_clouds.png';
          break;
        case "09d":
          currWeatherImg.src = 'img/shower_rain.png';
          break;
        case "10d":
          currWeatherImg.src = 'img/rain.png';
          break;
        case "11d":
          currWeatherImg.src = 'img/thunderstorm.png';
          break;
        case "13d":
          currWeatherImg.src = 'img/snow.png';
          break;
        case "50d":
          currWeatherImg.src = 'img/mist.png';
          break;
      }

      let currWeatherImg1 = document.querySelector("#curr-weather-1");
      let currDescription1 = data['daily']['1']['weather']['0']['icon'];
      switch (currDescription1) {
        case "01d":
          currWeatherImg1.src = 'img/clear_sky.png';
          break;
        case "02d":
          currWeatherImg1.src = 'img/few_clouds.png';
          break;
        case "03d":
          currWeatherImg1.src = 'img/scattered_clouds.png';
          break;
        case "04d":
          currWeatherImg1.src = 'img/scattered_clouds.png';
          break;
        case "09d":
          currWeatherImg1.src = 'img/shower_rain.png';
          break;
        case "10d":
          currWeatherImg1.src = 'img/rain.png';
          break;
        case "11d":
          currWeatherImg1.src = 'img/thunderstorm.png';
          break;
        case "13d":
          currWeatherImg1.src = 'img/snow.png';
          break;
        case "50d":
          currWeatherImg1.src = 'img/mist.png';
          break;
      }


      let currWeatherImg2 = document.querySelector("#curr-weather-2");
      let currDescription2 = data['daily']['2']['weather']['0']['icon'];
      switch (currDescription2) {
        case "01d":
          currWeatherImg2.src = 'img/clear_sky.png';
          break;
        case "02d":
          currWeatherImg2.src = 'img/few_clouds.png';
          break;
        case "03d":
          currWeatherImg2.src = 'img/scattered_clouds.png';
          break;
        case "04d":
          currWeatherImg2.src = 'img/scattered_clouds.png';
          break;
        case "09d":
          currWeatherImg2.src = 'img/shower_rain.png';
          break;
        case "10d":
          currWeatherImg2.src = 'img/rain.png';
          break;
        case "11d":
          currWeatherImg2.src = 'img/thunderstorm.png';
          break;
        case "13d":
          currWeatherImg2.src = 'img/snow.png';
          break;
        case "50d":
          currWeatherImg2.src = 'img/mist.png';
          break;
      }

      let currWeatherImg3 = document.querySelector("#curr-weather-3");
      let currDescription3 = data['daily']['3']['weather']['0']['icon'];
      switch (currDescription3) {
        case "01d":
          currWeatherImg3.src = 'img/clear_sky.png';
          break;
        case "02d":
          currWeatherImg3.src = 'img/few_clouds.png';
          break;
        case "03d":
          currWeatherImg3.src = 'img/scattered_clouds.png';
          break;
        case "04d":
          currWeatherImg3.src = 'img/scattered_clouds.png';
          break;
        case "09d":
          currWeatherImg3.src = 'img/shower_rain.png';
          break;
        case "10d":
          currWeatherImg3.src = 'img/rain.png';
          break;
        case "11d":
          currWeatherImg3.src = 'img/thunderstorm.png';
          break;
        case "13d":
          currWeatherImg3.src = 'img/snow.png';
          break;
        case "50d":
          currWeatherImg3.src = 'img/mist.png';
          break;
      }

      let currWeatherImg4 = document.querySelector("#curr-weather-4");
      let currDescription4 = data['daily']['4']['weather']['0']['icon'];
      switch (currDescription4) {
        case "01d":
          currWeatherImg4.src = 'img/clear_sky.png';
          break;
        case "02d":
          currWeatherImg4.src = 'img/few_clouds.png';
          break;
        case "03d":
          currWeatherImg4.src = 'img/scattered_clouds.png';
          break;
        case "04d":
          currWeatherImg4.src = 'img/scattered_clouds.png';
          break;
        case "09d":
          currWeatherImg4.src = 'img/shower_rain.png';
          break;
        case "10d":
          currWeatherImg4.src = 'img/rain.png';
          break;
        case "11d":
          currWeatherImg4.src = 'img/thunderstorm.png';
          break;
        case "13d":
          currWeatherImg4.src = 'img/snow.png';
          break;
        case "50d":
          currWeatherImg4.src = 'img/mist.png';
          break;
      }

      let currWeatherImg5 = document.querySelector("#curr-weather-5");
      let currDescription5 = data['daily']['5']['weather']['0']['icon'];
      switch (currDescription5) {
        case "01d":
          currWeatherImg5.src = 'img/clear_sky.png';
          break;
        case "02d":
          currWeatherImg5.src = 'img/few_clouds.png';
          break;
        case "03d":
          currWeatherImg5.src = 'img/scattered_clouds.png';
          break;
        case "04d":
          currWeatherImg5.src = 'img/scattered_clouds.png';
          break;
        case "09d":
          currWeatherImg5.src = 'img/shower_rain.png';
          break;
        case "10d":
          currWeatherImg5.src = 'img/rain.png';
          break;
        case "11d":
          currWeatherImg5.src = 'img/thunderstorm.png';
          break;
        case "13d":
          currWeatherImg5.src = 'img/snow.png';
          break;
        case "50d":
          currWeatherImg5.src = 'img/mist.png';
          break;
      }



      let tempDay1Value = data['daily']['1']['temp']['day'];
      tempDay1.innerHTML = Math.round(tempDay1Value) + "°C";

      let tempDay2Value = data['daily']['2']['temp']['day'];
      tempDay2.innerHTML = Math.round(tempDay2Value) + "°C";

      let tempDay3Value = data['daily']['3']['temp']['day'];
      tempDay3.innerHTML = Math.round(tempDay3Value) + "°C";

      let tempDay4Value = data['daily']['4']['temp']['day'];
      tempDay4.innerHTML = Math.round(tempDay4Value) + "°C";

      let tempDay5Value = data['daily']['5']['temp']['day'];
      tempDay5.innerHTML = Math.round(tempDay5Value) + "°C";

      document.querySelector("#curr-weather").style.display = "initial";
      document.querySelector("#next-wrapper").style.display = "flex";

    })

    .catch(err => console.log("Wrong city name!"));
}


let currentHour = today.getHours();
console.log(currentHour);
if (currentHour >= 4 && currentHour < 12) {
  document.body.style.background = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url('img/background.jpg')";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}
else if (currentHour >= 12 && currentHour < 21) {
  document.body.style.background = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url('img/background2.jpg')";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

}
else {
  document.body.style.background = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url('img/background3.jpg')";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}


const intervalId = window.setInterval(function(){
  console.log("Width:" + window.innerWidth);
  console.log("height" + window.innerHeight);
}, 1000);
