'use strict';

const preloader = document.querySelector("[data-preload]");
window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

const navbarLinks = document.querySelectorAll('.navbar-link');
navbarLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute("href");
    if (navbar.classList.contains('active')) {
      toggleNavbar();
    }
    setTimeout(() => {
      document.querySelector(targetID).scrollIntoView({ behavior: "smooth" });
    }, 300);
  });
});

addEventOnElements(navTogglers, "click", toggleNavbar);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;
const hideHeader = function () {
  if (document.body.classList.contains("nav-active")) return;
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
};
window.addEventListener("scroll", function () {
  if (window.scrollY >=50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];
const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};
const slideNext = function () {
  currentSlidePos = currentSlidePos >= heroSliderItems.length - 1 ? 0 : currentSlidePos + 1;
  updateSliderPos();
};
heroSliderNextBtn.addEventListener("click", slideNext);
const slidePrev = function () {
  currentSlidePos = currentSlidePos <= 0 ? heroSliderItems.length - 1 : currentSlidePos - 1;
  updateSliderPos();
};
heroSliderPrevBtn.addEventListener("click", slidePrev);
let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);

// --- Parallax Effect ---
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
window.addEventListener("mousemove", function (event) {
  const baseX = (event.clientX / window.innerWidth * 10) - 5;
  const baseY = (event.clientY / window.innerHeight * 10) - 5;
  parallaxItems.forEach(item => {
    const speed = Number(item.dataset.parallaxSpeed) || 1;
    const moveX = baseX * -1 * speed;
    const moveY = baseY * -1 * speed;
    item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
  });
});
