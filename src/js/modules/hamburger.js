function hamburger(hambSelector, menuSelector, activeClass) {
    // promo Hamburger

    const hamburger = document.querySelector(hambSelector),
    menu = document.querySelector(menuSelector);

    hamburger.addEventListener('click', () => {
    menu.classList.toggle('opened');
    hamburger.classList.toggle(activeClass);

    });
}
export default hamburger;