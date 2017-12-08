/////////////////////////////////////////
//On Load Tasks
/////////////////////////////////////////
window.onload = function () {
    hideHeader();
    addItems()
    $("main").off("click");
}

/////////////////////////////////////////
//On Orientation Change
/////////////////////////////////////////
$( window ).on( "orientationchange", function( event ) {
     menuClose();
});

/////////////////////////////////////////
//Hide Header Background When At Top
/////////////////////////////////////////
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
//Nav Selection Based On Scroll Pos
/////////////////////////////////////////
$(window).scroll(scroll);

function scroll() {
    let scrollPos = $(document).scrollTop();

    $(".nav a").removeClass('selected');
    if (scrollPos < 525) {
        $('a[href="#home"]').addClass('selected');
    } else if (scrollPos > 525 && scrollPos < 1235) {
        $('a[href="#restaurant"]').addClass('selected');
    } else if (scrollPos > 1235 && scrollPos < 1930) {
        $('a[href="#gallery"]').addClass('selected');
    } else if (scrollPos > 1930 && scrollPos < 2900) {
        $('a[href="#menu"]').addClass('selected');
    } else if (scrollPos > 2900 && scrollPos < 3800) {
        $('a[href="#drinks"]').addClass('selected');
    } else if (scrollPos > 3800) {
        $('a[href="#reservations"]').addClass('selected');
    }
}



/////////////////////////////////////////
//Section Jump Correctin
/////////////////////////////////////////
//Execute on Nav bUtton click
$(".nav a").click(scrollCorrection);

//Section Pos Jump
function scrollCorrection() {
    let divID;
    let scrollPos;
    let reservationCheck = $("#reservationModal").hasClass("remElement")
    let logoCheck = $(this).parent().hasClass("logoNav")

    //If Reseravation modal is open
    if (reservationCheck === true) {
        //If the logo is clicked
        if (logoCheck === true) {
            event.stopPropagation();
        //If the nav links are clicked
        } else {
            event.preventDefault();
            $(".nav").removeClass('selected');
            $(this).addClass('selected');
            divId = $(this).attr("href").toLowerCase();
            if ($(".navContainer").hasClass("navContainerOpen")) {
                menuClose();
                scrollPos = $(divId).offset().top;
            } else {
                scrollPos = $(divId).offset().top - 100;
            }
        $("html, body").animate({scrollTop: scrollPos}, 1000);
        }
    //If Reseravation modal is closed
    } else {
        event.preventDefault();
        event.stopPropagation();
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
    let modalCheck = $("body").hasClass("bgFreeze")

    if (modalCheck === false) {

        $(".navContainer").addClass("navContainerOpen");
        $(".arrows").addClass("arrowsOpen");
        $(".arrowTop").addClass("arrowTopOpen");
        $(".arrowBottom").addClass("arrowBottomOpen");
        $("body").addClass("bgFreeze");
        $("main").addClass("bgDarken");
        $("#open").attr("id", "close");
        $("#open").off("click", menuOpen);
        $("#close").on("click", menuClose);
        $("main").on("click", menuClose);
    }
}

//Close Navigation Function
function menuClose() {
    let menuCheck = $(".navContainer").hasClass("navContainerOpen");

    if (menuCheck === true) {
        $("body").removeClass("bgFreeze");
        $("main").removeClass("bgDarken");
        $(".navContainer").removeClass("navContainerOpen");
        $(".arrows").removeClass("arrowsOpen");
        $(".arrowTop").removeClass("arrowTopOpen");
        $(".arrowBottom").removeClass("arrowBottomOpen");
        $("#close").attr("id", "open");
        $("#close").off("click", menuClose);
        $("#open").on("click", menuOpen);
        $("main").off("click", menuClose);
    }
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
    $("main").on("click", modalClose);
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
    $("main").off("click", modalClose);
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

}

//Check Guests Charecters
function numbersOnly(input) {
    if (input.value.match(/[^0-9]/g) && $(input).attr("id") === "adultGuests") {
        adultLabel.innerHTML += '<p class="s4 bolText disFlex warning" id="remove">Numbers Only</p>'
        input.value = input.value.replace(/[^0-9]/g, '');
        check = false
    } else if (input.value.match(/[^0-9]/g) && $(input).attr("id") === "kidGuests") {
        kidLabel.innerHTML += '<p class="s4 bolText disFlex warning" id="remove">Numbers Only</p>'
        input.value = input.value.replace(/[^0-9]/g, '');
        check = false
    } else if (input.value.match(/[^0-9.-/(/)]/g) && $(input).attr("id") === "phone") {
        phoneLabel.innerHTML += '<p class="s4 bolText disFlex warning" id="remove">Numbers Only</p>'
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

    console.log(check)
    if (check === true) {
        confirmReservation()
    } else {
        event.preventDefault();
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
    check = false;
    return check;
}

//Confirm Reservation
function confirmReservation() {

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
        '<h3 class="s3 uppCase prText ligText">Reservation Made</h3>' +
        '</div>' +
        '<div>' +
        "<h3 class='s3' id='exceedWarning'>You'r reservation for " + total + ' guests on' + '<br>' + dayName + ' ' + selectedMonth + ' ' + selectedDay + ', ' + selectedYear + " has been created. <br> We can't wait to see you.</h3>" +
        '</div>';
}



/////////////////////////////////////////
//Add Items To Menu and Drinks
/////////////////////////////////////////
function addItems() {
    let snacksAndSalads = document.getElementById('snacksAndSaladsList');
    let sandwiches = document.getElementById('sandwichesList');
    let mains = document.getElementById('mainsList');
    let cocktails = document.getElementById('cocktailList');
    let wines = document.getElementById('wineList');
    let beers = document.getElementById('beerList');
    let sectionList = [snacksAndSalads,
							sandwiches,
							mains,
							cocktails,
							wines,
							beers
								]
    let itemList = [{
            array: snacksAndSaladsList,
            section: "snacksAndSaladsList",
            type: "food"
		},
        {
            array: sandwichesList,
            section: "sandwichesList",
            type: "food"
		},
        {
            array: mainsList,
            section: "mainsList",
            type: "food"
		},
        {
            array: cocktailList,
            section: "cocktailList",
            type: "drink"
		},
        {
            array: wineList,
            section: "wineList",
            type: "drink"
		},
        {
            array: beerList,
            section: "beerList",
            type: "drink"
		}
						]
    //Add To HTML
    for (i = 0; i < sectionList.length; i++) {
        for (x = 0; x < itemList.length; x++) {
            //Checks if product array matchs the section
            if ($(sectionList[i]).attr("id") === itemList[x].section) {
                let sectionProductList = itemList[x].array;
                let start;

                for (y = 0; y < sectionProductList.length; y++) {
                    //Checks if section has only one product to add correct stlye
                    if (sectionProductList.length === 1 && itemList[x].type !== "drink") {
                        start = '<div class = "item disFlex cenFlex" style="margin: .5rem auto;">'
                    } else {
                        start = '<div class = "item disFlex sbFlex">'
                    }
                    //Adds the product info to the section from the array
                    sectionList[i].innerHTML += start +
                        '<div class = "itemInfo lefText">' +
                        '<h3 class="s3">' + sectionProductList[y].name + '</h3>' +
                        '<p class="s4">' + sectionProductList[y].ingredents + '</p>' +
                        '</div>' +
                        '<div class = "itemPrice">' +
                        '<h3 class="s3">' + sectionProductList[y].price + '</h3>' +
                        '</div>'
                    '</div>'

                }
            }
        }
    }
}


/////////////////////////////////////////
//Gallery Controls
/////////////////////////////////////////
function changeImg(a) {
    let image = $(".imgGallery");
    let imgFocus;
    let imgNext;
    let imgPrevious;
    let changeAMT;
    let start;
    let end;

    for (i = 0; i < image.length; i++) {
        let total = image.length - 1;

        if ($(a).attr("id") === "prev") {
            changeAMT = parseInt([i]) - 1;
            end = 0;
            start = 6;
        } else if ($(a).attr("id") === "next") {
            changeAMT = parseInt([i]) + 1;
            end = 6;
            start = 0;
        }

        if ($(image[i]).hasClass("imgNext")) {
            if (i === end) {
                imgNext = start;
            } else {
                imgNext = changeAMT;
            }
            $(image[i]).removeClass("imgNext");

        } else if ($(image[i]).hasClass("imgFocus")) {
            if (i === end) {
                imgFocus = start;
            } else {
                imgFocus = changeAMT;
            }
            $(image[i]).removeClass("imgFocus");

        } else if ($(image[i]).hasClass("imgPrevious")) {
            if (i === end) {
                imgPrevious = start;
            } else {
                imgPrevious = changeAMT;
            }
            $(image[i]).removeClass("imgPrevious");
        }
    }
    $(image[imgNext]).addClass("imgNext");
    $(image[imgFocus]).addClass("imgFocus");
    $(image[imgPrevious]).addClass("imgPrevious");
}