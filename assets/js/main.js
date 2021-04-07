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

	// Пропорции для картинок раздела событий
	$('.events__img').css({
		'height': $('.events__img').width() / 1.6
	});

	// Управление классами при скролле
	const animItems = $('.animation');
	if (animItems.length > 0) {
		$(window).on('scroll', animScroll);
		animScroll();
		displayMapItem(2);
		function animScroll(params) {
			animItems.each(function (index, el) {
				const animItem = $(this);
				const animItemHeight = animItem.innerHeight();
				const animItemOffset = animItem.offset().top;
				const animStart = 4;
				let animItemPoint = $(window).innerHeight() - animItemHeight / animStart;
				if (animItemHeight > $(window).innerHeight()) {
					animItemPoint = $(window).innerHeight() - $(window).innerHeight() / animStart;
				}
				if (($(window).scrollTop() > animItemOffset - animItemPoint) && ($(window).scrollTop() < animItemOffset + animItemHeight)) {
					animItem.addClass('_active');
					if (animItem.hasClass('map')) {
						displayMapItem(1);

					}
				} else {
					if (!animItem.hasClass('animation--uno')) {
						animItem.removeClass('_active');
					}
				}
			});
		}
	}

	// Объекты для анимации 2,3 экранов
	const ghostCircleClass = 'anniv__ghost-circle',
		annivBird = '<img src="assets/img/anniv/bird.png" class="anniv__midge anniv__midge--bird">',
		annivPlanet = '<img src="assets/img/anniv/planet.png" class="anniv__midge anniv__midge--planet">',
		annivLeader = '<img src="assets/img/anniv/leader.png" class="anniv__midge anniv__midge--leader">',
		annivStella = '<img src="assets/img/anniv/stella.png" class="anniv__midge anniv__midge--stella">';

	let minStella = $('.map__syktyvkar svg'),
		minStellaTop = minStella.offset().top,
		minStellaLeft = minStella.offset().left,
		minStellaHeight = minStella.height(),
		minStellaWidth = minStella.width();

	// Создаём маску для элементов 2-го экрана
	function addCircleMask() {
		let circle = $('.anniv__circle'),
			circleParent = $('.anniv');
		let circleTop = circle.offset().top;
		let circleLeft = circle.offset().left;
		let ghostCircleH = circle.height() * 2;
		let ghostCircleW = circle.width() * 1.2;
		let ghostCircleLeft = (ghostCircleW - circle.width()) / 2;
		const ghostCircle = `<div class="${ghostCircleClass}"></div>`;
		if ($('.' + ghostCircleClass).length > 0) {
			$('.' + ghostCircleClass).replaceWith(ghostCircle);
		} else {
			circleParent.append(ghostCircle);
		}
		$('.anniv__ghost-circle')
			.offset({
				top: circleTop - circle.height(),
				left: circleLeft - ghostCircleLeft
			})
			.css({
				'width': ghostCircleW + 'px',
				'height': ghostCircleH + 'px',
				'border-bottom-left-radius': circle.width() + 'px',
				'border-bottom-right-radius': circle.width() + 'px',
			});
	}

	// Добавляем элементы в маску
	function addCircleMidges() {

		if (($(window).width() > 750) && (!$('.map').hasClass('animComplete')) && (!$('.map').hasClass('mapGo'))) {
			//$('.anniv__midge--stella').on('animationend', animateStella);
			animateStella();
		}

		let circle = $('.anniv__circle');
		const midgeCircleClass = 'anniv__midge';
		let stellaH = circle.height() * 1.4;
		if ($('.' + midgeCircleClass).length > 0) {
			$('.' + ghostCircleClass).empty();
		}
		$('.' + ghostCircleClass).append(annivBird);
		$('.' + ghostCircleClass).append(annivPlanet);
		$('.' + ghostCircleClass).append(annivLeader);
		$('.' + ghostCircleClass).append(annivStella);

		$('.anniv__midge--stella').css({
			'height': stellaH,
			'width': 'auto',
			'bottom': -stellaH,
			'right': '-6%'
		});
		$('.anniv__midge--bird').css({
			'height': stellaH / 1.4,
			'width': stellaH / 1.4,
			'bottom': -stellaH / 1.4,
			'right': -stellaH / 1.4
		});
		$('.anniv__midge--planet').css({
			'height': stellaH / 3.7,
			'width': stellaH / 2.3,
			'bottom': -stellaH / 3.7,
			'left': -stellaH / 2.3
		});
		$('.anniv__midge--leader').css({
			'height': stellaH / 4.6,
			'width': stellaH / 4.6,
			'bottom': -stellaH / 4.6,
			'left': '0%'
		});


	}

	// Полёт стеллы на карту
	function animateStella() {
		let circle = $('.anniv__circle');
		const annivStellaVector = '<img src="assets/img/anniv/stella-vector.png" class="anniv__midge anniv__midge--stella-vector">';
		$('.anniv__midge--stella-vector').remove();
		let hS = $('.anniv__midge--stella').height(),
			wS = $('.anniv__midge--stella').width(),
			tpS = $('.anniv__circle').offset().top,
			lpS = $('.anniv__circle').offset().left;
		$('body').append(annivStellaVector);
		$('.anniv__midge--stella-vector')
			.css({
				'top': tpS - 120,
				'left': lpS,
				'height': circle.height() * 1.5,
				'width': 'auto',
				'opacity': 0
			});
		$('.anniv__midge--stella-vector')
			.animate({
				'opacity': 1
			}, 200);
		// .animate({
		// 	'left': minStellaLeft,
		// 	'top': minStellaTop,
		// 	'height': minStellaHeight,
		// 	'width': minStellaWidth
		// }, {
		// 	done: function (now, fx) {
		// 		$(this).css('transform', 'rotate(-10deg)');
		// 		$('.map__syktyvkar').css('opacity', '1');
		// 		$(this).css('opacity', '0');
		// 		$('.map').addClass('animComplete');
		// 	},
		// 	duration: 1000
		// });
	}

	let go = 0;
	$(window).on('scroll', function () {
		go++;
		let ghStellaH = $('.anniv').outerHeight();
		let ghStellaOffset = $('.anniv').offset().top;
		let ghStellaPoint = $(window).innerHeight() - ghStellaH * 1.4;
		if (($(document).scrollTop() > ghStellaOffset - ghStellaPoint)) {

			$('.anniv__midge--stella-vector')
				.animate({
					'left': minStellaLeft,
					'top': minStellaTop,
					'height': minStellaHeight,
					'width': minStellaWidth
				}, {
					done: function (now, fx) {
						$(this).css('transform', 'rotate(-10deg)');
						$('.map__syktyvkar').css('opacity', '1');
						$(this).css('opacity', '0');
						$('.map').addClass('animComplete');
					},
					duration: 2000
				});
		}

	});


	// Добавление арок к блокам
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
			'top': -arcHeight + 1 + 'px'
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

	$('.anniv__circle').on('transitionend', animGo);
	function animGo() {
		addCircleMask();
		addCircleMidges();
	}
	insertAcr();


	// Отображение карточек участников на малых разрешениях
	function peoplesDisplay() {
		if ($(document).width() < 661) {
			$('.peoples__item').each(function (items, el) {
				if (items > 11 && !$(this).hasClass('peoples__item--new')) {
					$(this).hide();
				}
			});
			$('#peoplesShow').show();
		} else {
			$('.peoples__item').each(function (items, el) {
				$(this).show('fast');
			});
			$('#peoplesShow').hide();
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
		$(this).hide();
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
	const coub = $(".coub");
	let coubAnimate = setInterval(rotateCoub, 2000);
	function rotateCoub() {
		let numItem = getRandomFromRange(0, 8).toFixed();
		let el = coub.find('.coub__item').eq(numItem);
		el.toggleClass("coub__item--180");
	}

	$('#invite2').on('click', function () {
		$.fancybox.open({
			src: '#modalInvite',
			type: 'inline',
			opts: {
				afterShow: function (instance, current) {
					clearInterval(coubAnimate);
				},
				afterClose: function (instance, current) {
					setInterval(rotateCoub, 2000);
				},
			}
		});
	});

	// Отправка данных форм
	$("#formInviteMain").on("submit", formSuccesMain);
	$("#formInvitePopup").on("submit", formSuccesPopup);

	$("input[type='tel']").mask("+7 (999) 999-99-99");

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
				breakpoint: 769,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 581,
				settings: {
					slidesToShow: 2
				}
			},
		]
	});

	$(window).resize(function () {
		displayMapItem(2);
		insertAcr();
		peoplesDisplay();
		addCircleMask();
		addCircleMidges();
		if ($(window).outerWidth() > 700 && $('.mob-menu').css('transform') == 'translateX(0)') {
			$('.mob-menu').css('transform', 'translateX(100%)');
		}
		$('.events__img').css({
			'height': $('.events__img').width() / 1.6
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

// Горизонтальный скролл
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

function displayMapItem(type) {
	if (type == 1) {
		if ($('.map').hasClass('_active') && !($('.anniv').hasClass('_active'))) {
			$('.map').addClass('mapGo');
		}
	}
	if (type == 2) {
		if ($('.map').hasClass('_active') && $('.anniv').hasClass('_active')) {
			$('.map').addClass('mapGo');
		}
	}
}

