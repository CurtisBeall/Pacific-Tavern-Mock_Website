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
	$("#open").attr("id","close");
	$( "#open").unbind( "click", menuOpen );
	$( "#close").bind( "click", menuClose );
	
}

//Close Navigation Function
function menuClose() {
	
	$(".navContainer").removeClass("navContainerOpen");
	$(".arrows").removeClass("arrowsOpen");
	$(".arrowTop").removeClass("arrowTopOpen");
	$(".arrowBottom").removeClass("arrowBottomOpen");
	$("body").removeClass("bgFreeze");
	$("main").removeClass("bgDarken");
	$("#close").attr("id","open");
	$( "#close").unbind( "click",  menuClose );
	$( "#open").bind( "click", menuOpen );
	
}

/////////////////////////////////////////
//Open Reservation Modal
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
	$("body").addClass("bgFreeze");
	$("main").addClass("bgDarken");
}

//Close Reservation Modal Function
function modalClose() {

	$("#reservationModal").addClass("remElement");
	$("body").removeClass("bgFreeze");
	$("main").removeClass("bgDarken");
}

/////////////////////////////////////////
//Set Reservation Date Current Date
/////////////////////////////////////////
//Get Current Date
function setCurrentDate() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	

	
//Set The Current Date
	$("#year").prop('selectedIndex', 0);
	$("#month").prop('selectedIndex', 0);
	$("#day").prop('selectedIndex', day-1);
	
	createYearLists()
	createMonthLists()
	createDayLists()
}


/////////////////////////////////////////
//Create Reservation Date Lists
/////////////////////////////////////////
$("#year").change(createMonthLists);
$("#year").change(createDayLists);
$("#month").change(createDayLists);

//Create Select Year Lists
function createYearLists() {
	let date = new Date();
	let year = date.getFullYear();
	let yearInput = document.getElementById('year');

	//Add Years To Years List
	yearInput.innerHTML = ''
	for (i = 0; i < 3; i++) {
		yearInput.innerHTML += '<option>' + (year + i) + '</option>'
	}
}

//Create Select Month Lists
function createMonthLists() {
	let date = new Date();
	let year = date.getFullYear();
	let monthInput = document.getElementById('month');
	let selectedMonth = $("#month").prop('selectedIndex');
	let selectedYear = parseInt($("#year").find(":selected").text());
	let monthList = [];
	
	//Create Month List
	//If the year selected matchs current year
	if (year === selectedYear) {
		while (date.getFullYear() === selectedYear) {
			monthList.push(date.toString().substring(7,3));
			date.setMonth(date.getMonth()+1);
		}
		date = new Date();
	//If the year selected doesn't match current year
	} else if (year !== selectedYear) {
		date = new Date(selectedYear, 0, 1);
		while (date.getFullYear() === selectedYear) {
			monthList.push(date.toString().substring(7,3));
			date.setMonth(date.getMonth()+1);
		}
	}

	//Add Months To Months List
	monthInput.innerHTML = ''
	for (i = 0; i < monthList.length; i++) {
		monthInput.innerHTML += '<option>' + monthList[i] + '</option>'
	}
}

//Create Select Day Lists
function createDayLists() {
	let date = new Date();
	let month = date.getMonth();
	let dayInput = document.getElementById('day');
	let selectedMonth = $("#month").prop('selectedIndex');
	let selectedYear = parseInt($("#year").find(":selected").text());
	let dayList = [];

	//Adjust current month index number for current year
	selectedMonth = 12 - $('#month option').length + selectedMonth;
	
	//Create Day List
	//If the month selected matchs current month
	if (month === selectedMonth && date.getFullYear() === selectedYear) {
		while (date.getMonth() === selectedMonth) {
			dayList.push(date.getDate());
			date.setDate(date.getDate() + 1);
		}
	//If the month selected doesn't match current month
	} else if (month !== selectedMonth || date.getFullYear() !== selectedYear) {
		date = new Date(selectedYear, selectedMonth, 1);
		while (date.getMonth() === selectedMonth) {
			dayList.push(date.getDate());
			date.setDate(date.getDate() + 1);
		}
	}
	
	//Add Days To Days List
	dayInput.innerHTML = ''
	for (i = 0; i < dayList.length; i++) {
		dayInput.innerHTML += '<option>' + dayList[i] + '</option>'
	}
}
/////////////////////////////////////////
//Submit Reservation
/////////////////////////////////////////
	//Check Reservation
		//Check Date
		//Check Guests Count
	//Submit Reservation
	//Confirm Reservation
		//Replace HTML Text

/////////////////////////////////////////
//Add Items To Menu and Drinks
/////////////////////////////////////////
	//Check Item Type
	//Add To Menu HTML
	//Add To Drinks HTML