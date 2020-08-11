window.addEventListener('DOMContentLoaded', function() {

  //Slider native JS
  // проработать slidesToScroll
	const track = document.querySelector('.comments__slider-track'),
		slidesToShow = 1,
		slidesToScroll = 1,
		slide = document.querySelectorAll('.comments__slider-slide'),
		container = document.querySelector('.comments__slider-container'),
		prev = document.querySelector('.prevArrow'),
		next = document.querySelector('.nextArrow'),
		activeSlide = document.querySelector('.comments__slider-slide.active');

	let itemWidth,
		offset = 0,
		slideIndex = 1;
	if(window.matchMedia('(max-width: 767px)').matches) {
		itemWidth = (+(window.getComputedStyle(container).width).slice(0, -2));
		track.style.width = `${100 * slide.length}%`;
	}else {
		itemWidth = (+(window.getComputedStyle(container).width).slice(0, -2)) / 3;
	}
	const movePosition = itemWidth * slidesToScroll;
	if(window.matchMedia('(max-width: 767px)').matches) {
		slideIndex = 0;
		slide[slideIndex].classList.add('active');
		slide[slideIndex+1].classList.remove('active');
	}
	slide.forEach((slide) => {
		slide.style.minWidth = `${itemWidth}px`;
		slide.style.transform = `scale(${0.60066})`;
		if(slide.classList.contains('active')) {
			slide.style.transform = `scale(${1})`;
		}
	});
	prev.addEventListener('click', () => {
		if (offset >= 0) {
			offset = (-(itemWidth) * (slide.length-1)); //так как при загрузке страницы центральный кадр не первый слайд в html
			slideIndex = slide.length - 1;				//то офсет на движение track сдвигаем на 2 слайда
		} else {
			offset += +movePosition;
			slideIndex -= (1*slidesToScroll);
		}
		console.log(offset, slideIndex);
		track.style.transform = `translateX(${offset}px)`;
		slide[slideIndex].style.transform = `scale(${1})`; //central frame scale=1 opacity=1

		if(slideIndex <= slide.length-2) {
			slide[slideIndex+1].style.transform = `scale(${0.60066})`; //autoScale for small frames
		} else {
			slide[0].style.transform = `scale(${0.60066})`;
		}
		removeActive();
		addActiveSlide(slideIndex);

	});
    next.addEventListener('click', () => {

		adjustMediaNextBtn();
		console.log(offset, slideIndex);
		track.style.transform = `translateX(${offset}px)`;
		slide[slideIndex].style.transform = `scale(${1})`;

		if(slideIndex > 0) {
			slide[slideIndex-1].style.transform = `scale(${0.60066})`;
		} else {
			slide[slide.length-1].style.transform = `scale(${0.60066})`;
		}

		removeActive();
		addActiveSlide(slideIndex);
	});

	activeSlide.addEventListener('mousedown', (e) => {
		e.preventDefault();
		let posX = e.clientX;
		// console.log(posX);

		activeSlide.addEventListener('mousemove', (e) => {
			console.log(e.clientX);
			// if(e.clientX > posX) {
			// 	console.log('yes');
			// 	adjustMediaNextBtn();
			// 	track.style.transform = `translateX(${offset}px)`;
			// 	slide[slideIndex].style.transform = `scale(${1})`;
	
			// 	if(slideIndex > 0) {
			// 		slide[slideIndex-1].style.transform = `scale(${0.60066})`;
			// 	} else {
			// 		slide[slide.length-1].style.transform = `scale(${0.60066})`;
			// 	}
	
			// 	removeActive();
			// 	addActiveSlide(slideIndex);
			// }
		});
		

		
		

	});

	activeSlide.addEventListener('mouseup', (e) => {
		activeSlide.removeEventListener('mousemove', (e) => {
			console.log(e.clientX);
		});
			
			
	});

	function adjustMediaNextBtn () {
		if (window.matchMedia('(max-width: 767px)').matches) {
			if (offset <= (-(itemWidth) * (slide.length-1))) {
				offset = 0;
				slideIndex = 0;
			} else {
				offset -= +movePosition;
				slideIndex += (1*slidesToScroll);
			}
		}else {
			if (offset <= (-(itemWidth) * (slide.length-2))) {
				offset = itemWidth*slidesToScroll;
				slideIndex = 0;
			} else {
				offset -= +movePosition;
				slideIndex += (1*slidesToScroll);
			}
		}
	}

	function adjustMediaPrevBtn () {
		if(window.matchMedia('(max-width: 767px)').matches) {
			if (offset >= 0) {
				offset = (-(itemWidth) * (slide.length-1)); //так как при загрузке страницы центральный кадр не первый слайд в html
				slideIndex = slide.length - 1;				//то офсет на движение track сдвигаем на 2 слайда
			} else {
				offset += +movePosition;
				slideIndex -= (1*slidesToScroll);
			}
		}else {
			if (offset >= itemWidth) {
				offset = (-(itemWidth) * (slide.length-2)); //так как при загрузке страницы центральный кадр не первый слайд в html
				slideIndex = slide.length - 1;				//то офсет на движение track сдвигаем на 2 слайда
			} else {
				offset += +movePosition;
				slideIndex -= (1*slidesToScroll);
			}
		}
	}

	
	function addActiveSlide(index) {
		slide[index].classList.add('active');
	}
	function removeActive() {
		slide.forEach((slide) => {
			slide.classList.remove('active');
		});
	}

	//form validation
	let consForm = document.querySelector('.feed-form__input');
		  
	
	

	consForm.addEventListener('resize', () => {
		let lineLeft = document.querySelector('.consultation__line-left');
		let length = +(window.getComputedStyle(consForm).height).slice(0, -2);
		lineLeft.style.height = `${length+118}px`;
		console.log('here');
	});
	
	function validateForm(form) {

		let validator = $(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				phone: "required",
				email: {
					required: true,
					email: true,
				}
			},
			messages: {
				name: {
					required: "Пожалуйста введите имя",
					minlength: "Имя не должно быть менее 3 символов"
				},
				phone: "Необходимо ввести номер телефона",
				email: {
					required: "Введите почтовый адрес",
					email: "Введите правильный почтовый адрес"
				}
			}
		});
	}

	const consulValidated = validateForm('#consultation-form');
	const questValidated = validateForm('#questions-form');
	
	//mask phone number

	$("input[name=phone]").mask("+7 (999) 999-9999");
	
	// promo Hamburger

	const hamburger = document.querySelector('.promo__hamburger'),
		  menu = document.querySelector('.promo__nav');

	hamburger.addEventListener('click', () => {
		menu.classList.toggle('opened');
		hamburger.classList.toggle('promo__hamburger_active');
		
	});

	
	
	

});



