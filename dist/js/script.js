window.addEventListener('DOMContentLoaded', function() {

  //Slider native JS
  // проработать slidesToScroll
	const track = document.querySelector('.comments__slider-track'),
		slidesToShow = 1,
		slidesToScroll = 1,
		slide = document.querySelectorAll('.comments__slider-slide'),
		container = document.querySelector('.comments__slider-container'),
		itemWidth = (+(window.getComputedStyle(container).width).slice(0, -2)) / slidesToShow - 1202,
		prev = document.querySelector('.prevArrow'),
		next = document.querySelector('.nextArrow'),
		movePosition = itemWidth * slidesToScroll;

	let offset = 0,
		slideIndex = 1;
	
	slide.forEach((slide) => {
		slide.style.minWidth = `${itemWidth}px`;
		slide.style.transform = `scale(${361/itemWidth})`;
		if(slide.classList.contains('active')) {
			slide.style.transform = `scale(${1})`;
		}
	});

	
	
	prev.addEventListener('click', () => {

		if (offset >= itemWidth) {
			offset = (-(itemWidth) * (slide.length-2)); //так как при загрузке страницы центральный кадр не первый слайд в html
			slideIndex = slide.length - 1;				//то офсет на движение track сдвигаем на 2 слайда
		} else {
			offset += +movePosition;
			slideIndex -= (1*slidesToScroll);
		}

		track.style.transform = `translateX(${offset}px)`;
		slide[slideIndex].style.transform = `scale(${1})`; //central frame scale=1 opacity=1

		if(slideIndex <= slide.length-2) {
			slide[slideIndex+1].style.transform = `scale(${361/itemWidth})`; //autoScale for small frames
		}

		removeActive();
		activeSlide(slideIndex);

	});
    next.addEventListener('click', () => {

		if (offset <= (-(itemWidth) * (slide.length-2))) {
			offset = itemWidth*slidesToScroll;
			slideIndex = 0;
		} else {
			offset -= +movePosition;
			slideIndex += (1*slidesToScroll);
		}

		track.style.transform = `translateX(${offset}px)`;
		slide[slideIndex].style.transform = `scale(${1})`;

		if(slideIndex > 0) {
			slide[slideIndex-1].style.transform = `scale(${361/itemWidth})`;
		}

		removeActive();
		activeSlide(slideIndex);
	});


	function activeSlide(index) {
		slide[index].classList.add('active');
	}
	function removeActive() {
		slide.forEach((slide) => {
			slide.classList.remove('active');
		});
	}
});

// owl carousel 2 
// $(document).ready(function(){
// 	$(".owl-carousel").owlCarousel({
// 		items: 1,
// 		loop: true,
// 		nav: true,
// 		dots: false,
// 		center: true,
// 		// navContainer: '.comments__slider-nav',
// 		navText : ["",""]
// 	});
//   });