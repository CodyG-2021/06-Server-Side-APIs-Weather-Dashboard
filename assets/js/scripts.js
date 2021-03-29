var key = '64f2ee2a8261daa4d9f780f5b365f275';
var city = "Denver"

var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')
// console.log(dateTime);

var cityHist = [];
//Will save the text value of the search and save it to an array
$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (city === "") {
		return;
	};
	cityHist.push(city);

	localStorage.setItem('city', JSON.stringify(cityHist));
	fiveForecastEl.empty();
	getHistory();
	getWeatherToday();
});

//Will create buttons based on search history 
var contHistEl = $('.cityHist');
function getHistory() {
	contHistEl.empty();

	for (let i = 0; i < cityHist.length; i++) {

		var rowEl = $('<row>');
		var btnEl = $('<button>').text(`${cityHist[i]}`)

		rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary histBtn');
		btnEl.attr('type', 'button');

		contHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	}	if (!city) {
		return;
	}
	$('.histBtn').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		fiveForecastEl.empty();
		getWeatherToday();
	});
};

//Grab the main 'Today' card body.
var cardTodayBody = $('.cardBodyToday')

function getWeatherToday() {
	var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

	$(cardTodayBody).empty();

	$.ajax({
		url: getUrlCurrent,
		method: 'GET',
	}).then(function (response) {
		$('.cardTodayCityName').text(response.name);
		$('.cardTodayDate').text(date);
		//Icons
		$('.icons').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		// Temperature
		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		cardTodayBody.append(pEl);
		//Feels Like
		var pElTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
		cardTodayBody.append(pElTemp);
		//Humidity
		var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		cardTodayBody.append(pElHumid);
		//Wind Speed
		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		cardTodayBody.append(pElWind);
		//Set the lat and long from the searched city
		var cityLon = response.coord.lon;
		// console.log(cityLon);
		var cityLat = response.coord.lat;
		// console.log(cityLat);

		var getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}`;

		$.ajax({
			url: getUrlUvi,
			method: 'GET',
		}).then(function (response) {
			// console.log('what');
			// console.log(response.current.uvi);
			var pElUvi = $('<p>').text(`UV Index: `);
			var uviSpan = $('<span>').text(response.current.uvi);
			var uvi = response.current.uvi;
			pElUvi.append(uviSpan);
			cardTodayBody.append(pElUvi);
			//set the UV index to match an exposure chart severity based on color 
			if (uvi >= 0 && uvi <= 2) {
				uviSpan.attr('class', 'green');
			} else if (uvi > 2 && uvi <= 5) {
				uviSpan.attr("class", "yellow")
			} else if (uvi > 5 && uvi <= 7) {
				uviSpan.attr("class", "orange")
			} else if (uvi > 7 && uvi <= 10) {
				uviSpan.attr("class", "red")
			} else {
				uviSpan.attr("class", "purple")
			}
		});
	});
	getFiveDayForecast();
};

var fiveForecastEl = $('.fiveForecast');

function getFiveDayForecast() {
	var getUrlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;

	$.ajax({
		url: getUrlFiveDay,
		method: 'GET',
	}).then(function (response) {
		var fiveDayArray = response.list;
		var myWeather = [];
		$.each(fiveDayArray, function (index, value) {
			testObj = {
				date: value.dt_txt.split(' ')[0],
				time: value.dt_txt.split(' ')[1],
				temp: value.main.temp,
				feels_like: value.main.feels_like,
				icon: value.weather[0].icon,
				humidity: value.main.humidity
			}

			if (value.dt_txt.split(' ')[1] === "12:00:00") {
				myWeather.push(testObj);
			}
		})

		for (let i = 0; i < myWeather.length; i++) {

			var divElCard = $('<div>');
			divElCard.attr('class', 'card text-white bg-primary mb-3 cardOne');
			divElCard.attr('style', 'max-width: 200px;');
			fiveForecastEl.append(divElCard);

			var divElHeader = $('<div>');
			divElHeader.attr('class', 'card-header')
			var m = moment(`${myWeather[i].date}`).format('MM-DD-YYYY');
			divElHeader.text(m);
			divElCard.append(divElHeader)

			var divElBody = $('<div>');
			divElBody.attr('class', 'card-body');
			divElCard.append(divElBody);

			var divElIcon = $('<img>');
			divElIcon.attr('class', 'icons');
			divElIcon.attr('src', `http://openweathermap.org/img/wn/${myWeather[i].icon}@2x.png`);
			divElBody.append(divElIcon);


			//Temp
			var pElTemp = $('<p>').text(`Temperature: ${myWeather[i].temp} °F`);
			divElBody.append(pElTemp);
			//Feels Like
			var pElFeel = $('<p>').text(`Feels Like: ${myWeather[i].feels_like} °F`);
			divElBody.append(pElFeel);
			//Humidity
			var pElHumid = $('<p>').text(`Humidity: ${myWeather[i].humidity} %`);
			divElBody.append(pElHumid);
		}
	});
};

function initLoad() {

	var cityHistStore = JSON.parse(localStorage.getItem('city'));

	if (cityHistStore !== null) {
		cityHist = cityHistStore
	}
	getHistory();
	getWeatherToday();
};

initLoad();
