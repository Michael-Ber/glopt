// window.addEventListener('DOMContentLoaded', function() {

//   //Slider native JS

// 	const track = document.querySelector('.comments__slider-track'),
// 		slidesToShow = 1,
// 		slidesToScroll = 1,
// 		slide = document.querySelectorAll('.comments__slider-slide'),
// 		container = document.querySelector('.comments__slider-container'),
// 		itemWidth = (+(window.getComputedStyle(container).width).slice(0, -2)) / slidesToShow,
// 		prev = document.querySelector('.prevArrow'),
// 		next = document.querySelector('.nextArrow'),
// 		movePosition = itemWidth * slidesToScroll;
		
// 	let offset = 0;
// 	slide.forEach((slide) => {
// 		slide.style.minWidth = `${itemWidth}px`;
// 	});

// 	prev.addEventListener('click', () => {
		
// 		if (offset >= 0) {
// 			offset = (-(itemWidth) * (slide.length-1));
// 		} else {
// 			offset += +movePosition;
// 		}
// 		track.style.transform = `translateX(${offset}px)`;
// 	});
//     next.addEventListener('click', () => {
// 		if (offset <= (-(itemWidth) * (slide.length-1))) {
// 			offset = 0;
// 		} else {
// 			offset -= +movePosition;
// 		}
// 		console.log(offset, movePosition);
// 		track.style.transform = `translateX(${offset}px)`;
// 	});
// });

$(document).ready(function(){
	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		dots: false,
		center: true,
		// navContainer: '.comments__slider-nav',
		navText : ["",""]
	});
  });