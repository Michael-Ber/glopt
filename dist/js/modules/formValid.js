function formValid(formInput, ...formSelectors) {
    //form validation
	let consForm = document.querySelector(formInput);
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

	const consulValidated = validateForm(formSelectors[0]);
	const questValidated = validateForm(formSelectors[1]);
}

export default formValid;