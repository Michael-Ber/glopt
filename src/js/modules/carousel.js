function slider({trackWrapper, slideElement, containerWrapper, prevArrow, nextArrow}) {
    window.addEventListener('resize', function () { 
		callSlider();								
	});
	
  //Slider native JS
  // проработать slidesToScroll
	function callSlider() {
		const track = document.querySelector(trackWrapper),
			slidesToShow = 1,
			slidesToScroll = 1,
			slide = document.querySelectorAll(slideElement),
			container = document.querySelector(containerWrapper),
			prev = document.querySelector(prevArrow),
			next = document.querySelector(nextArrow);
			

		let itemWidth,
			offset = 0,
			slideIndex = 1;

		if(window.matchMedia('(max-width: 767px)').matches) {
			itemWidth = (+(window.getComputedStyle(container).width).slice(0, -2));
			track.style.width = `${100 * slide.length}%`;
			slideIndex = 0;
			slide[slideIndex].classList.add('active');
			slide[slideIndex+1].classList.remove('active');
		}else {
			itemWidth = Math.round((+(window.getComputedStyle(container).width).slice(0, -2)) / 3);
			track.style.width = `inherit`;
			slideIndex = 1;
			slide[slideIndex].classList.add('active');
			slide[slideIndex-1].classList.remove('active');
		}
		const movePosition = itemWidth * slidesToScroll;

		if(window.matchMedia('(max-width: 767px)').matches) {
			
		}

		slide.forEach((slide) => {
			slide.style.minWidth = `${itemWidth}px`;
			slide.style.transform = `scale(${0.60066})`;
			if(slide.classList.contains('active')) {
				slide.style.transform = `scale(${1})`;
			}
		});

		prev.addEventListener('click', () => {
			adjustMediaPrevBtn();
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

		let posXInit,
			posXCurrent,
			diff,
			threshold = 200,
			moving = false;

		if(window.PointerEvent) {
			document.addEventListener('pointerdown', swipeStart);
			document.addEventListener('pointermove', swipeAction);
			document.addEventListener('pointerup', swipeEnd);
		}else {
			document.addEventListener('mousedown', swipeStart);
			document.addEventListener('touchstart', swipeStart);

			document.addEventListener('mousemove', swipeAction);
			document.addEventListener('touchmove', swipeAction);

			document.addEventListener('mouseup', swipeEnd);
			document.addEventListener('touchend', swipeEnd);
		}

		function swipeStart(e) {
			posXInit = e.clientX;
			moving = true;
			track.style.cursor = 'grabbing';
		}
		
		function swipeAction(e) {
			if (moving) {

				posXCurrent = e.clientX;
				diff = posXInit - posXCurrent;
				track.style.transform = `translateX(${offset - diff}px)`;
				

				if(window.matchMedia('(max-width: 767px)').matches) {
					threshold = 100;
				}

				if(diff < (-threshold)) {
					adjustMediaPrevBtn();

					track.style.transform = `translateX(${offset}px)`;
					slide[slideIndex].style.transform = `scale(${1})`; //central frame scale=1 opacity=1

					if(slideIndex <= slide.length-2) {
						slide[slideIndex+1].style.transform = `scale(${0.60066})`; //autoScale for small frames
					} else {
						slide[0].style.transform = `scale(${0.60066})`;
					}

					removeActive();
					addActiveSlide(slideIndex);

					moving = false;
				}
				if(diff > threshold) {
					adjustMediaNextBtn();

					track.style.transform = `translateX(${offset}px)`;
					slide[slideIndex].style.transform = `scale(${1})`;

					if(slideIndex > 0) {
						slide[slideIndex-1].style.transform = `scale(${0.60066})`;
					} else {
						slide[slide.length-1].style.transform = `scale(${0.60066})`;
					}

					removeActive();
					addActiveSlide(slideIndex);

					moving = false;
				} 
			}
		}

		function swipeEnd() {
			moving = false;
			track.style.transform = `translateX(${offset}px)`; // возвращает экран если не пересекли пороговое значение
			track.style.cursor = 'grab';
			
		}
	
		function addActiveSlide(index) {
			slide[index].classList.add('active');
		}

		function removeActive() {
			slide.forEach((slide) => {
				slide.classList.remove('active');
			});
		}

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

	}

	callSlider();
}

export default slider;