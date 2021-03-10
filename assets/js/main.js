$(document).ready(function () {

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

	$('.slider-projects-main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-projects-nav'
	});
	$('.slider-projects-nav').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: '.slider-projects-main',
		dots: false,
		arrows: false,
		focusOnSelect: true,
		centerMode: true
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