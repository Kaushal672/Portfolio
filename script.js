const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');

window.addEventListener('scroll', function () {
    const pos = this.document.documentElement.scrollTop;
    if (pos >= 100) {
        nav.classList.add('scroll');
    } else {
        nav.classList.remove('scroll');
    }
});

// section fade in
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    });
};

const sectionObs = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSection.forEach((section) => {
    sectionObs.observe(section);
});

// nav link fade
const handleHover = function (evt) {
    if (evt.target.classList.contains('nav__link')) {
        const link = evt.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        const logo = link.closest('.nav').querySelector('.logo');
        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

document.querySelectorAll('.nav__links').forEach((elem) => {
    elem.addEventListener('click', function (evt) {
        evt.preventDefault();

        //Mathcing strategy
        if (
            evt.target.classList.contains('nav__link') &&
            !evt.target.classList.contains('nav__btn')
        ) {
            const id = evt.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document
    .querySelector('.contact__btn')
    .addEventListener('click', function (evt) {
        evt.preventDefault();

        document
            .querySelector(evt.target.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });

document.querySelectorAll('.nav__btn').forEach((element) => {
    element.addEventListener('click', function (e) {
        e.preventDefault();

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
});

modal.addEventListener('click', function (e) {
    if (e.target !== modal) return;

    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// lazy load images

const allImages = document.querySelectorAll('.project__img');

const loadImg = function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener('load', function (e) {
            entry.target.classList.remove('lazy-img');
        });

        observer.unobserve(entry.target);
    });
};

const imgObs = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-50px',
});

allImages.forEach((img) => imgObs.observe(img));

document.getElementById('toTop').addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav-burger').addEventListener('click', function (e) {
    document.querySelector('.collapse').classList.toggle('show');
    document.querySelector('.nav-burger').classList.toggle('rotate');
});

let lastScrollTop = 0;
const mobileNav = document.querySelector('.mobile-nav');

window.addEventListener('scroll', () => {
    let currentScroll = document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scroll down
        mobileNav.style.top = '-280px'; // Hide navbar when scrolling down
    } else {
        // Scroll up
        mobileNav.style.top = '0'; // Show navbar when scrolling up
    }
    lastScrollTop = currentScroll;
});
