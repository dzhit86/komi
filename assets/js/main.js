$(document).ready(function () {

	$(".scroll").onepage_scroll({
		sectionContainer: ".screen",     // sectionContainer accepts any kind of selector in case you don't want to use section
		easing: "linear",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
		// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		animationTime: 500,             // AnimationTime let you define how long each section takes to animate
		pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
		updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		beforeMove: function (index) { },  // This option accepts a callback function. The function will be called before the page moves.
		afterMove: function (index) { },   // This option accepts a callback function. The function will be called after the page moves.
		loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
		keyboard: true,                  // You can activate the keyboard controls
		responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
		// you want the responsive fallback to be triggered. For example, set this to 600 and whenever
		// the browser's width is less than 600, the fallback will kick in.
		direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  

	});

	// Главное меню
	$(function () {
		let menu = $('.mob-menu'),
			menuBtn = $('#btnBurger');
		menuBtn.on('click', function (e) {
			e.preventDefault();
			if (menuBtn.hasClass('btn-burger--cross')) {
				displayMenu('hide');
			} else {
				displayMenu('show');
			}
		});
	});


});

// Отображение меню
function displayMenu(status = false) {
	let menu = $('.mob-menu'),
		menuBtn = $('#btnBurger');
	if (status === 'show') {
		animationMenu(menu, 'left');
		menuBtn.addClass('btn-burger--cross');
		$('body').addClass('fixed');
		return true;
	}
	if (status === 'hide') {
		animationMenu(menu, 'right');
		menuBtn.removeClass('btn-burger--cross');
		$('body').removeClass('fixed');
		return true;
	}
	if (status === false && menu.is(':visible')) {
		return true;
	}
	return false;
}

// Анимация меню
function animationMenu(id, direction) {
	if (direction == "left") {
		id.css('transform', 'translateX(-100%)');
	}
	if (direction == "right") {
		id.css('transform', 'translateX(0)');
	}
}

$(window).resize(function (params) {
	if ($(window).outerWidth() > 700 && $('.mob-menu').css('transform') == 'translateX(0)') {
		$('.mob-menu').css('transform', 'translateX(100%)');
	}
});