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
		autoplay: true,
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

	function calcArc() {
		let arcWidth = $(window).width(),
			arcHeight = 0,
			height = $(window).height();
		if (arcWidth > height) {
			arcHeight = +(arcWidth / 16).toFixed();
		} else {
			arcHeight = +(height / 16).toFixed();
		}
		return { arcWidth: arcWidth, arcHeight: arcHeight };
	};

	function insertAcr() {
		let arcWidth = calcArc().arcWidth,
			arcHeight = calcArc().arcHeight,
			arcEclipse = (arcWidth / 7).toFixed(),
			arcEl = `url("data:image/svg+xml,%3Csvg width='${arcWidth}' height='${arcHeight}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${arcWidth} ${arcHeight}'%3E%3Cpath d='M${arcWidth},${arcHeight}a${arcWidth * 2},${arcWidth * 2},0,0,0-${arcWidth},0v1H${arcWidth}Z'%3E%3C/path%3E%3C/svg%3E")`;

		$('.arc-screen__bg').css('mask-image', arcEl);
		$('.arc-screen').css({
			'opacity': 1,
			'height': arcHeight + 'px',
			'top': -arcHeight + 'px'
		});
		$('.arc-screen__eclipse').css({
			'width': arcEclipse + 'px',
			'height': arcEclipse + 'px',
			'left': (arcWidth / 2) - (arcEclipse / 2) + 'px',
			'bottom': 0,
		});
		$('.arc-screen__arrow').css({
			'height': '6vmax',
			'width': '19.2vmax',
		});
	}

	insertAcr();

	function peoplesDisplay() {
		if ($(document).width() < 661) {
			$('.peoples__item').each(function (items, el) {
				if (items > 11 && !$(this).hasClass('peoples__item--new')) {
					$(this).hide();
				}
			});
		} else {
			$('.peoples__item').each(function (items, el) {
				$(this).show('fast');
			});
		}
	}
	peoplesDisplay();

	$('#peoplesShow').on('click', function (e) {
		e.preventDefault();
		$('.peoples__item').each(function (items, el) {
			if (!$(this).hasClass('peoples__item--new')) {
				$(this).slideDown('fast');
			}
		});
	});

	$(window).resize(function () {
		insertAcr();
		peoplesDisplay();
	});

	// Плавный скролл к якорю
	$(function () {
		let smoothLink = $('a[data-smooth]');
		smoothLink.on('click', function (event) {
			event.preventDefault();
			let sc = $(this).attr("href"); // id цели
			if ($(sc).length) {
				let pad = $(sc).outerHeight() - $(sc).height() - 100, // расстояние для позиционирования
					dn = $(sc).offset().top + pad; // положение цели на странице
				$('html, body').animate({ scrollTop: dn }, 1000);
			} else {
				alert('Нет такой секции!');
			}
		});
	});

	// Бегущая строка
	$(function () {
		$('.run-line__text--1').marquee({
			duration: 50000,
			startVisible: true,
			duplicated: true
		});
		$('.run-line__text--2').marquee({
			duration: 50000,
			startVisible: true,
			duplicated: true,
			direction: 'right'
		});
		$('.run-line__text--3').marquee({
			duration: 35000,
			startVisible: true,
			duplicated: true
		});
	});

	// Вращение квадратов
	$(function () {
		const coub = $(".coub");
		setInterval(rotateCoub, 2000);
		function rotateCoub() {
			let numItem = getRandomFromRange(0, 8).toFixed();
			let el = coub.find('.coub__item').eq(numItem);
			el.toggleClass("coub__item--180");
		}
	});

	// Отправка данных форм
	$("#formInviteMain").on("submit", formSuccesMain);
	$("#formInvitePopup").on("submit", formSuccesPopup);

	$("input[type='tel']").mask("+7 (999) 999-99-99");
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
		var scrollPos = this.scrollLeft;  // Сколько прокручено по горизонтали, до прокрутки
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

// Функции форм
function formSuccesMain(event) {
	event.preventDefault();
	const form = $("#formInviteMain"),
		sended = $("#formSendedMain");
	form.slideUp("fast");
	sended.slideDown("fast");
	form[0].reset()
	setTimeout(function () {
		sended.slideUp("fast");
	}, 3000);
	setTimeout(function () {
		form.slideDown("fast");
	}, 3000);
}
function formSuccesPopup(event) {
	event.preventDefault();
	const form = $("#formInvitePopup"),
		container = $(".mod-invite__main");
	sended = $(".mod-invite__sended");
	container.slideUp("fast");
	sended.slideDown("fast");
	form[0].reset()
	setTimeout(function () {
		sended.slideUp("fast");
	}, 3000);
	setTimeout(function () {
		container.slideDown("fast");
		parent.jQuery.fancybox.getInstance().close();
	}, 3000);
}

// Генератор чисел
function getRandomFromRange(min, max) {
	let int = Math.random() * (max - min) + min;
	return int;
}