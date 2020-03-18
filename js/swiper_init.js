var windowWidth = window.screen.width;

var benefits = new Swiper('.benefits', {
navigation: {
nextEl: '.swiper__next',
prevEl: '.swiper__prev',
},

slidesPerView: 1,

breakpoints: {
  320: {
    slidesPerView: 1,
    spaceBetween: 50
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30
  }
}
});

var portfolio = new Swiper('.portfolio', {
  navigation: {
  nextEl: '.swiper__next',
  prevEl: '.swiper__prev',
  },

  slidesPerView: 1,

  breakpoints: {
    320: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
  });

var sertificate = new Swiper('.sertificate__swiper', {
  navigation: {
  nextEl: '.swiper__next',
  prevEl: '.swiper__prev',
  },

  slidesPerView: 3,

  breakpoints: {
    320: {
      slidesPerView: 1
    },
    425: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30
    },
    1440: {
      slidesPerView: 6,
      spaceBetween: 30
    }
  }
});