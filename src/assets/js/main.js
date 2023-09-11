import slider from './modules/carousel';
import formValid from './modules/formValid';
import hamburger from './modules/hamburger';


window.addEventListener('DOMContentLoaded', function() {

	slider({
		trackWrapper: '.comments__slider-track',
		slideElement: '.comments__slider-slide',
		containerWrapper: '.comments__slider-container',
		prevArrow: '.prevArrow',
		nextArrow: '.nextArrow'
	});

	formValid('.feed-form__input', '#consultation-form', '#questions-form');
	
	hamburger('.promo__hamburger', '.promo__nav', 'promo__hamburger_active');
	
	//mask phone number

	$("input[name=phone]").mask("+7 (999) 999-9999");
	
	
});



