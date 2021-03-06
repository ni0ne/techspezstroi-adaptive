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
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 4,
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
      slidesPerView: 2,
      spaceBetween: 20
    },
    425: {
      slidesPerView: 3,
      spaceBetween: 20
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

$(document).ready(function () {
  $('.fancybox').fancybox();
});

// Modal Call
var modal = document.getElementById("modal"),
      btnOpen = document.getElementById("modalOpen"),
      btnClose = document.getElementsByClassName("modal__close")[0];

btnOpen.onclick = function () {
  modal.style.display = "block";
}

btnClose.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Mask
$('input[name="phone"]').mask('+7(000)000-0000');

// Validation

jQuery.validator.addMethod("checkMask", function(value, element) {
  return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value); 
});

$(function(){
  $('#form').validate({
    rules: {
      phone: {
        checkMask: true
      }
    },
    messages: {
      phone: {
        checkMask: "Введите полный номер телефона"
      }
    }
  });
});