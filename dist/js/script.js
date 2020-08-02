// window.addEventListener('DOMContentLoaded', function() {

//   //Slider

// 	const wrapper = document.querySelector('.comments__slider'),
// 		slide = document.querySelectorAll('.comments__slide'),
// 		width = window.getComputedStyle(wrapper).width,
// 		prev = document.querySelector('.prevArrow'),
// 		next = document.querySelector('.nextArrow');
  
// 	let offset = 710,
// 		slideIndex = 1;


// 	prev.addEventListener('click', () => {
// 		if (offset < 0) {
// 			offset = +width.slice(0, -2);
// 			slideIndex = 2;
// 		} else {
// 			offset -= 710;
// 			slideIndex -= 1;
// 		}

// 		slide[slideIndex].style.transform = `translateX(${-offset}px)`;


// 	});
    
// });

$(document).ready(function(){
	$(".comments__slider").owlCarousel({
		center: true,
		items:1,
		loop:true,
		margin:3,
		responsive:{
			600:{
				items:1
			}
		}
	});
  });