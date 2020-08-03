window.addEventListener('DOMContentLoaded', function() {

  //Slider native JS

	const track = document.querySelector('.comments__slider-track'),
		slidesToShow = 1,
		slidesToScroll = 1,
		slide = document.querySelectorAll('.comments__slider-slide'),
		container = document.querySelector('.comments__slider-container'),
		itemWidth = (+(window.getComputedStyle(container).width).slice(0, -2)) / slidesToShow - 722 - 277,
		prev = document.querySelector('.prevArrow'),
		next = document.querySelector('.nextArrow'),
		movePosition = itemWidth * slidesToScroll;

	let offset = -itemWidth,
		slideIndex = 1;
	
	track.style.transform = `translateX(${offset}px)`;
	slide.forEach((slide) => {
		slide.style.minWidth = `${itemWidth}px`;
		
	});
	removeActive();
	activeSlide(slideIndex);
	
	prev.addEventListener('click', () => {
		if (offset >= 0) {
			offset = (-(itemWidth) * (slide.length-1));
			slideIndex = slide.length - 1;
		} else {
			offset += +movePosition;
			slideIndex -= 1;
		}
		console.log(offset, slideIndex);
		track.style.transform = `translateX(${offset}px)`;
		removeActive();
		activeSlide(slideIndex);

	});
    next.addEventListener('click', () => {
		if (offset <= (-(itemWidth) * (slide.length-1))) {
			offset = 0;
			slideIndex = 0;
		} else {
			offset -= +movePosition;
			slideIndex += 1;
		}
		console.log(offset, slideIndex);
		track.style.transform = `translateX(${offset}px)`;
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