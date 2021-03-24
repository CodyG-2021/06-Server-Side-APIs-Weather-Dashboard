// 64f2ee2a8261daa4d9f780f5b365f275

$('.search').on("click", function () {
	var city = $(this).parent('.btnPar').siblings('.textVal').val();
	localStorage.setItem("city", city);
});