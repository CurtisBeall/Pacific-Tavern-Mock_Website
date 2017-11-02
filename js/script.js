// Drop Down Menu Function
(function() {
	const toggle = document.getElementById("c-hamburger");
	const hide = document.getElementById("nav-bar");

	toggle.addEventListener( "click", function(e) {
	e.preventDefault();
	(this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
	(hide.classList.contains("hidden") === true) ? hide.classList.remove("hidden") : hide.classList.add("hidden");
	});
})();

//Setup About Page Before Load Function
window.onbeforeunload = () => {
	
	const about = 'file:///C:/Users/Curtis/Documents/Git%20Repos/Splash/about.html';
	
     if (window.location.href === about) {
		window.scrollTo(0,0);
	 }
};

//Setup About Page Onload Function
window.onload = () => {
	
	const about = 'file:///C:/Users/Curtis/Documents/Git%20Repos/Splash/about.html';
	
     if (window.location.href === about) {
		window.scrollBy(0,1);
	 }
};


//About Page Text Scroll Var

	let scrollToggle = 1;
	let spanlife = -52;
	let lastScrollY = 0;

//About Page Text Scroll Function
window.onscroll = () => {
	if (window.innerWidth > 626) {
	const staff_textR = document.getElementsByClassName("staff_textbg align-r");
	const staff_textL = document.getElementsByClassName("staff_textbg align-l");
	
	let newScroll = (scrollY * 100 / document.documentElement.scrollHeight);
	let lastScroll = (lastScrollY * 100 / document.documentElement.scrollHeight);
	let scrollYPercent = (newScroll - lastScroll)*1.25;
	let span = spanlife;
	let spanL = spanlife+50;

	for (var i = 0; i < staff_textR.length; i++) {
		
		if(span < -53 ) {
			
			(scrollToggle === 1 ) ?  scrollToggle = 0: scrollToggle = 1;
			
		} if(span > 2) {
			
			(scrollToggle === 0 ) ?  scrollToggle = 1: scrollToggle = 0;
			
		} if(scrollToggle === 0) {
			
			(lastScroll < newScroll) ?  span -= scrollYPercent : span -= scrollYPercent;
			(lastScroll < newScroll) ?  lastScrollY = scrollY: lastScrollY = scrollY;
			spanlife = span;	
			staff_textR[i].style.transform = "translateY(-50%) translateX(" + span + "%)";

		} if(scrollToggle === 1) {
			
			(lastScroll > newScroll) ?  span += scrollYPercent : span += scrollYPercent;
			(lastScroll > newScroll) ?  lastScrollY = scrollY: lastScrollY = scrollY;
			spanlife = span;
			staff_textR[i].style.transform = "translateY(-50%) translateX(" + span + "%)";
		}

	}
	

	for (var i = 0; i < staff_textL.length; i++) {

	if(scrollToggle === 0) {

			(lastScroll < newScroll) ?  spanL -= scrollYPercent : spanL -= scrollYPercent;
			staff_textL[i].style.transform = "translateY(-50%) translateX(" + spanL + "%)";

		} if(scrollToggle === 1) {
			
			(lastScroll > newScroll) ?  spanL += scrollYPercent : spanL += scrollYPercent;
			staff_textL[i].style.transform = "translateY(-50%) translateX(" + spanL + "%)";
			
		}

	}
	}
};