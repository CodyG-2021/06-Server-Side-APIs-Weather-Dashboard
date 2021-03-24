// 64f2ee2a8261daa4d9f780f5b365f275


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
