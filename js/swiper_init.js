var windowWidth = window.screen.width;

var benefits = new Swiper('.benefits', {
navigation: {
nextEl: '.swiper__next',
prevEl: '.swiper__prev',
},

slidesPerView: 
  ( windowWidth <= 768) ? 1 :
  ( windowWidth <= 1200) ? 2 : 3,
spaceBetween: windowWidth <= 768 ? 20 : 30
});

var portfolio = new Swiper('.portfolio', {
  navigation: {
  nextEl: '.swiper__next',
  prevEl: '.swiper__prev',
  },
  
  slidesPerView: 
    ( windowWidth <= 425) ? 1 : 
    ( windowWidth <= 768) ? 2 : 
    ( windowWidth <= 1200) ? 3 : 4,
  spaceBetween: windowWidth <= 768 ? 20 : 30
});

var sertificate = new Swiper('.sertificate__swiper', {
  navigation: {
  nextEl: '.swiper__next',
  prevEl: '.swiper__prev',
  },
  
  slidesPerView: 
    ( windowWidth <= 425) ? 2 : 
    ( windowWidth <= 768) ? 4 : 
    ( windowWidth <= 1200) ? 5 : 6,
  spaceBetween: windowWidth <= 768 ? 20 : 30
});