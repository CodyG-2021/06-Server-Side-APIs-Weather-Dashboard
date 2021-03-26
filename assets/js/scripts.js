// 64f2ee2a8261daa4d9f780f5b365f275
var city = 'Denver';
var key = '64f2ee2a8261daa4d9f780f5b365f275';
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS');
console.log(dateTime);

var cityHist = [];
//Will save the text value of the search and save it to an array
$('.search').on("click", function () {
	var city = $(this).parent('.btnPar').siblings('.textVal').val();
	cityHist.push(city);
	// console.log(cityHist);
	emptyHist();
	getHistory();
});

//Will create buttons based on search history 
var contHistEl = $('.cityHist');
function getHistory () {
	for (let i = 0; i < cityHist.length; i++) {
		var rowEl = $('<row>');
		var btnEl = $('<button>')

		rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary');
		btnEl.attr('type','button');

		btnEl.text(`${cityHist[i]}`)

		contHistEl.append(rowEl);
		rowEl.append(btnEl);
	}
};
//Removes any previous data in the array that will cause duplicates
function emptyHist () {
	contHistEl.empty();
};

// var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`; 
// var getUrlCurrentUV = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`; 
// var getUrlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&mode=xml&appid=${key}`;

// var getUrlIcons = `https://http://openweathermap.org/img`; 


// $.ajax({
//   url: getUrlCurrent,
// 	// dataType: "json",
//   method: 'GET',
// }).then(function (response) {
//   console.log('AJAX Response');
//   console.log(response);
// });


// fetch(getUrlCurrent)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('Fetch Response');
//     console.log(data);
//   });

//imgEl.setAttribute('src',`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);