/////////////////////////////////////////
//Hide Header Background When At Top
/////////////////////////////////////////
//Hide Background On Load
window.onload = function () {
	hideHeader();
}

//Check On Scroll
$(window).scroll(hideHeader);

//Hide Header Background When At Top
function hideHeader() {
	let scrollPos = $(window).scrollTop();
	let windowWidth = $(window).width();

	//Check Window Location and width
	if (scrollPos < 50 && windowWidth > 925) {
		//Hide Background
		$("#navContainer").addClass("clBackground");
	} else {
		//Add Background
		$("#navContainer").removeClass("clBackground");
	}
}

/////////////////////////////////////////
//Open/Close Navigation
/////////////////////////////////////////
//Open Navigation 
$("#open").click(menuOpen);

//Close Navigation
$("#close").click(menuClose);
$("main").click(menuClose);

//Open Navigation Function
function menuOpen() {

	$(".navContainer").addClass("navContainerOpen");
	$(".arrows").addClass("arrowsOpen");
	$(".arrowTop").addClass("arrowTopOpen");
	$(".arrowBottom").addClass("arrowBottomOpen");
	$("body").addClass("bgFreeze");
	$("main").addClass("bgDarken");
	$("#open").attr("id", "close");
	$("#open").off("click", menuOpen);
	$("#close").on("click", menuClose);
}

//Close Navigation Function
function menuClose() {

	$(".navContainer").removeClass("navContainerOpen");
	$(".arrows").removeClass("arrowsOpen");
	$(".arrowTop").removeClass("arrowTopOpen");
	$(".arrowBottom").removeClass("arrowBottomOpen");
	$("body").removeClass("bgFreeze");
	$("main").removeClass("bgDarken");
	$("#close").attr("id", "open");
	$("#close").off("click", menuClose);
	$("#open").on("click", menuOpen);

}

/////////////////////////////////////////
//Open/Close Reservation Modal
/////////////////////////////////////////
//Open Reservation Modal 
$("#reservationsButton").click(modalOpen);
$("#reservationsButton").click(setCurrentDate);

//Close Reservation Modal
$("main").click(modalClose);

//Open Reservation Modal Function
function modalOpen() {
	event.stopPropagation();

	$("#reservationModal").removeClass("remElement");
	$("#reservationModal").scrollTop(0);
	$("body").addClass("bgFreeze");
	$("main").addClass("bgDarken");
}

//Close Reservation Modal Function
function modalClose() {
	let name = $('#underName');
	let email = $('#email');
	let phone = $('#phone');
	let adultGuests = $('#adultGuests');
	let kidGuests = $('#kidGuests');

	$("body").removeClass("bgFreeze");
	$("main").removeClass("bgDarken");
	$("#reservationModal").addClass("remElement");
	location.reload();
}



/////////////////////////////////////////
//Set Reservation Date Current Date
/////////////////////////////////////////
//Get Current Date
function setCurrentDate(e) {
	//Add any date into the "new Date()" to change reservation date range
	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = currentDate.getMonth();
	let currentDay = currentDate.getDate();
	let elementClick = $(e).attr("id");

	if (elementClick === $("#year").attr("id")) {
		createMonthLists(currentDate, currentYear, currentMonth, currentDay)
		currentDate = new Date(currentYear, currentMonth, currentDay);
		createDayLists(currentDate, currentMonth, currentDay)
	} else if (elementClick === $("#month").attr("id")) {
		createDayLists(currentDate, currentMonth, currentDay)
		currentDate = new Date(currentYear, currentMonth, currentDay);
	} else if (elementClick === $("#day").attr("id")) {
		addTimeLists()
	} else {
		createYearLists(currentDate, currentYear)
		currentDate = new Date(currentYear, currentMonth, currentDay);
		createMonthLists(currentDate, currentYear, currentMonth, currentDay)
		currentDate = new Date(currentYear, currentMonth, currentDay);
		createDayLists(currentDate, currentMonth, currentDay)
		currentDate = new Date(currentYear, currentMonth, currentDay);
	}

}


/////////////////////////////////////////
//Create Reservation Date Lists
/////////////////////////////////////////
//Create Select Year Lists
function createYearLists(currentDate, currentYear) {
	let date = currentDate;
	let year = currentYear;
	let yearInput = document.getElementById('year');

	//Add Years To Years List
	yearInput.innerHTML = ''
	for (i = 0; i < 3; i++) {
		yearInput.innerHTML += '<option>' + (year + i) + '</option>'
	}

}

//Adjust Month Index Numbers
function monthAdjustIndex(e) {
	return 12 - $('#month option').length + e;
}

//Create Select Month Lists
function createMonthLists(currentDate, currentYear, currentMonth, currentDay) {
	let date = currentDate;
	let year = currentYear;
	let monthInput = document.getElementById('month');
	let selectedYear = parseInt($("#year option:selected").text());
	let selectedMonth = parseInt($("#month").prop('selectedIndex'));
	let monthList = [];

	//Create Month List
	//If the year selected matchs current year
	if (year === selectedYear) {

		while (date.getFullYear() === selectedYear) {
			monthList.push(date.toString().substring(7, 3));
			date.setMonth(date.getMonth() + 1);
		}

		//Adjust month index #s when current year is being selected
		selectedMonth = -12 + selectedMonth + monthList.length;
		if (selectedMonth < 0) {
			selectedMonth = 0
		}
		//If the year selected doesn't match current year
	} else if (year !== selectedYear) {
		date = new Date(selectedYear, 0, 1);
		while (date.getFullYear() === selectedYear) {
			monthList.push(date.toString().substring(7, 3));
			date.setMonth(date.getMonth() + 1);
		}
		//Adjust month index #s when changing from current year
		selectedMonth = monthAdjustIndex(selectedMonth)
	}

	//Add Months To Months List
	monthInput.innerHTML = ''
	for (i = 0; i < monthList.length; i++) {
		monthInput.innerHTML += '<option>' + monthList[i] + '</option>'
	}

	//Set The Current Selected Month
	$("#month").prop('selectedIndex', selectedMonth);

}

//Create Select Day Lists
function createDayLists(currentDate, currentMonth, currentDay) {
	let date = currentDate;
	let month = currentMonth;
	let day = currentDay;
	let dayInput = document.getElementById('day');
	let selectedYear = parseInt($("#year option:selected").text());
	let selectedMonth = parseInt($("#month").prop('selectedIndex'));
	let selectedDay = $("#day").prop('selectedIndex');
	let dayList = [];


	//Adjust month index numbers when current year is selected
	selectedMonth = monthAdjustIndex(selectedMonth)

	//Create Day List
	//If the month and year selected matchs current month and year being selected
	if (month === selectedMonth && date.getFullYear() === selectedYear) {
		date.setDate(date.getDate() + 1);

		while (date.getMonth() === selectedMonth) {
			dayList.push(date.getDate());
			date.setDate(date.getDate() + 1);
		}

		//Adjust day index #s when changing to current month and year 
		date.setDate(date.getDate() - 1)
		selectedDay = ($("#day option:selected").text() - 1) - (date.getDate() - dayList.length);
		if (selectedDay < 0) {
			selectedDay = 0
		}
		//If the month selected doesn't match current month
	} else if (month !== selectedMonth || date.getFullYear() !== selectedYear) {
		date = new Date(selectedYear, selectedMonth, 1);

		while (date.getMonth() === selectedMonth) {
			dayList.push(date.getDate());
			date.setDate(date.getDate() + 1);
		}

		//Adjust day index #s when changing from different month or year 
		selectedDay = $("#day option:selected").text() - 1;
	}
	//Add Days To Days List
	dayInput.innerHTML = ''
	for (i = 0; i < dayList.length; i++) {
		dayInput.innerHTML += '<option>' + dayList[i] + '</option>'
	}



	//Adjust day index #s for months with diff day totals
	date.setDate(date.getDate() - 1)
	if (selectedDay > date.getDate()) {
		selectedDay = date.getDate() - 1;
	}

	//Set The Current Selected Day
	$("#day").prop('selectedIndex', selectedDay);
	addTimeLists()
}

//Add Time List
function addTimeLists() {
	let times = document.getElementById('time');
	let selectedYear = parseInt($("#year option:selected").text());
	let selectedMonth = $("#month").prop('selectedIndex');
	let selectedDay = parseInt($("#day option:selected").text());

	selectedMonth = monthAdjustIndex(selectedMonth)
	let date = new Date(selectedYear, selectedMonth, selectedDay);
	let dayName = date.toString().substring(0, 3);

	if (dayName === "Sun") {
		//Add Days To Days List
		times.innerHTML = ''
		for (i = 0; i < sun.length; i++) {
			times.innerHTML += '<option>' + sun[i] + '</option>';
		}
	} else if (dayName === "Fri" || dayName === "Sat") {
		//Add Days To Days List
		times.innerHTML = ''
		for (i = 0; i < friToSat.length; i++) {
			times.innerHTML += '<option>' + friToSat[i] + '</option>';
		}
	} else {
		//Add Days To Days List
		times.innerHTML = ''
		for (i = 0; i < monToThur.length; i++) {
			times.innerHTML += '<option>' + monToThur[i] + '</option>';
		}
	}
}

/////////////////////////////////////////
//Reservation Validation
/////////////////////////////////////////
$('#adultGuests').keyup(guestsValidation)
$('#kidGuests').keyup(guestsValidation)
$('#phone').keyup(phoneValidation)

function guestsValidation() {
	let adultGuests = $('#adultGuests');
	let kidGuests = $('#kidGuests');
	let adultLabel = document.getElementById('adultLabel');
	let kidLabel = document.getElementById('kidLabel');

	$("#remove").remove();
	$("#exceedWarning").removeClass("warning bolText");


	numbersOnly(this);
	checkGuestsCount();
}

function phoneValidation() {
	let phone = $('#phone');
	let phoneLabel = document.getElementById('phoneLabel');

	$("#remove").remove();
	$("#exceedWarning").removeClass("warning bolText");


	numbersOnly(this);

	console.log()
}

//Check Guests Charecters
function numbersOnly(input) {
	if (input.value.match(/[^0-9]/g) && $(input).attr("id") === "adultGuests") {
		adultLabel.innerHTML += '<h4 class="bolText disFlex warning" id="remove">Numbers Only</h4>'
		input.value = input.value.replace(/[^0-9]/g, '');
		check = false
	} else if (input.value.match(/[^0-9]/g) && $(input).attr("id") === "kidGuests") {
		kidLabel.innerHTML += '<h4 class="bolText disFlex warning" id="remove">Numbers Only</h4>'
		input.value = input.value.replace(/[^0-9]/g, '');
		check = false
	} else if (input.value.match(/[^0-9.-/(/)]/g) && $(input).attr("id") === "phone") {
		phoneLabel.innerHTML += '<h4 class="bolText disFlex warning" id="remove">Numbers Only</h4>'
		input.value = input.value.replace(/[^0-9.-/(/)]/g, '');
		check = false
	} else {
		check = true
	}

	return check;
}

//Check Guests Count
function checkGuestsCount() {
	let adultCount = parseInt(0 + $("#adultGuests").val());
	let kidCount = parseInt(0 + $("#kidGuests").val());
	let total = adultCount + kidCount;

	if (adultCount === 0 || adultCount > 40 || kidCount > 40 || total > 40 || total < 2) {
		$("#exceedWarning").addClass("warning bolText");
		$('#adultGuests').addClass("warningBox");
		$('#kidGuests').addClass("warningBox");
		$("#reservationModal").scrollTop(30);
		check = false
	} else {
		$("#exceedWarning").removeClass("warning bolText");
		$('#adultGuests').removeClass("warningBox");
		$('#kidGuests').removeClass("warningBox");
		check = true
	}
	return check;
}



/////////////////////////////////////////
//Submit Reservation
/////////////////////////////////////////
//Check Reservation
function checkReservation() {
	let check = false;
	let name = document.getElementById('underName');
	let email = document.getElementById('email')
	let phone = document.getElementById('phone')
	let adultGuests = document.getElementById('adultGuests');
	let kidGuests = document.getElementById('kidGuests');
	let info = [name,
				email,
				phone,
				adultGuests,
				kidGuests
			   ]
	clearWarnings()
	check = checkGuestsCount()
	for (i = 0; i < info.length; i++) {
		check = checkInfo(info[i]);
	}
	console.log(check);
	if (check === true) {
		confirmReservation()
	}
}

//Clear All Warnings
function clearWarnings() {
	$("#remove").remove();
	$("#exceedWarning").removeClass("warning bolText");
	$('#underName').removeClass("warningBox");
	$('#email').removeClass("warningBox");
	$('#phone').removeClass("warningBox");
	$('#adultGuests').removeClass("warningBox");
	$('#kidGuests').removeClass("warningBox");
}

//Check Info
function checkInfo(info) {
	let check = false;
	if (info.value === "" || info.checkValidity() === false) {
		info.className += " warningBox";
		check = false
	} else {
		check = true
	}
		check = true
	return check;
}

//Confirm Reservation
function confirmReservation() {
console.log("goodJob")

	let modal = document.getElementById('reservationModal');

	let selectedYear = parseInt($("#year option:selected").text());
	let selectedMonth = $("#month").prop('selectedIndex');
	let selectedDay = parseInt($("#day option:selected").text());
	let adultCount = parseInt(0 + $("#adultGuests").val());
	let kidCount = parseInt(0 + $("#kidGuests").val());
	let total = adultCount + kidCount;
	
	selectedMonth = monthAdjustIndex(selectedMonth)
	let date = new Date(selectedYear, selectedMonth, selectedDay);
	let dayName = date.toString().substring(0, 3);
	selectedMonth = date.toString().substring(7, 3);


	modal.innerHTML = '';
	modal.innerHTML = '<div>' +
				'<h3 class="uppCase prText ligText">Reservation Made</h3>' +
			'</div>' +
			'<div>' +
				"<h3 id='exceedWarning'>You'r reservation for " + total + ' guests on' + '<br>' + dayName + ' ' + selectedMonth + ' ' +selectedDay + ', ' + selectedYear + " has been created. <br> We can't wait to see you.</h3>" +
			'</div>';
}




/////////////////////////////////////////
//Add Items To Menu and Drinks
/////////////////////////////////////////
//Check Item Type
//Add To Menu HTML
//Add To Drinks HTML



/////////////////////////////////////////
//Gallery Controls
/////////////////////////////////////////
//Prev Button
//Next Button