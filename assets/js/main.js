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

	// Слайдеры

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
		centerMode: true,
		responsive: [
			{
				breakpoint: 1445,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 801,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 401,
				settings: {
					slidesToShow: 1
				}
			},
		]
	});

	//anniv animate
	const annivBird = $('.anniv__midge--bird'),
		annivPlanet = $('.anniv__midge--planet'),
		annivLeader = $('.anniv__midge--leader'),
		annivStella = $('.anniv__midge--stella');

	//anniv animate - position 0
	// annivBird.css('bottom', '-' + annivBird.height() + 'px');
	// annivPlanet.css('bottom', '-' + annivPlanet.height() + 'px');
	// annivLeader.css('bottom', '-' + annivLeader.height() + 'px');
	// annivStella.css('bottom', '-' + annivStella.height() + 'px');

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

(function () {

	function scrollHorizontally(e) {

		var scrollPos = this.scrollLeft;  // Сколько прокручено по горизонтали, до прокрутки (не перемещать эту строку!)

		// Горизонтальная прокрутка
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		this.scrollLeft -= (delta * 70); // Multiplied by 10

		var widthElem = this.scrollWidth; // Ширина всего элемента
		var widthBrowser = document.documentElement.clientWidth;  // Ширина окна минус размер вертикального скролла


		// Прокрутка вверх, но элемент уже в крайней левой позиции, то двигаемся вверх
		if ((delta == 1) && (this.scrollLeft == 0)) return;
		// Прокрутка вниз, но элемент виден полностью. Или элемент до конца прокручен в правый край
		if ((widthBrowser >= widthElem) || (scrollPos == this.scrollLeft)) return;

		e.preventDefault(); // запрещает прокрутку по вертикали

	}

	var elems = document.querySelectorAll('.slider-attractions');
	for (var a = 0; a < elems.length; a++) {
		elems[a].addEventListener("mousewheel", scrollHorizontally, false);     // IE9, Chrome, Safari, Opera
		elems[a].addEventListener("DOMMouseScroll", scrollHorizontally, false); // Firefox
	}

})();