'use strict';
const isIE = (function() {
  var ua = window.navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
})();
const CLICK = 'click';

const overlay = document.querySelector('.modal-overlay');
const popups = document.querySelectorAll('.modal');

const openMap = document.querySelector('.js-open-map');
const popupMap = document.querySelector('.modal--map');
const closeMap = document.querySelector('.js-close-map');

const openFeedback = document.querySelector('.js-open-feedback');
const popupFeedback = document.querySelector('.modal--feedback');
const closeFeedback = document.querySelector('.js-close-feedback');
const feedbackForm = document.querySelector('.feedback-form');
const name = popupFeedback && popupFeedback.querySelector('[name=name]');
const mail = popupFeedback && popupFeedback.querySelector('[name=mail]');
const message = popupFeedback && popupFeedback.querySelector('[name=message]');

const buyButtons = document.querySelectorAll('.js-buy');
const popupBuyModal = document.querySelector('.modal--cart');
const closeBuyModal = document.querySelector('.js-close-cart');

const addBookmarkButtons = document.querySelectorAll('.js-add-bookmark');

const storageName = localStorage.getItem('name');
const storageMail = localStorage.getItem('mail');


function closePopup(popup){
  popup.classList.remove('modal--show');
  overlay.classList.remove('modal-overlay--show');
}

function openPopup(popup) {
  popup.classList.add('modal--show');
  overlay.classList.add('modal-overlay--show');
}

overlay.addEventListener(CLICK, function(event) {
  event.preventDefault();
  Array.prototype.forEach.call(popups, function(p) {
    if(p.classList.contains('modal--show'))
      closePopup(p);
  });
});

openMap && openMap.addEventListener(CLICK, function(event) {
  event.preventDefault();
  openPopup(popupMap);
});

closeMap && closeMap.addEventListener(CLICK, function(event) {
  event.preventDefault();
  closePopup(popupMap);
});

openFeedback && openFeedback.addEventListener(CLICK, function(event) {
  event.preventDefault();
  openPopup(popupFeedback);
  if (storageName)
    name.value = storageName;
  if (storageMail)
    mail.value = storageMail;

  if (storageName && storageMail)
    message.focus();
  else if (storageName)
    mail.focus();
  else
    name.focus();
});

closeFeedback && closeFeedback.addEventListener(CLICK, function(event) {
  event.preventDefault();
  closePopup(popupFeedback);
});

feedbackForm && feedbackForm.addEventListener('submit', function(event) {
  if (!name.value || !mail.value || !message.value) {
    event.preventDefault();
    // добавляем селектор при ошибки закопления формы
  } else {
    name && localStorage.setItem('name', name.value);
    mail && localStorage.setItem('mail', mail.value);
  }
});

buyButtons && Array.prototype.forEach.call(buyButtons, function(b) {
  if (isIE) {
    b.addEventListener('focus', function(event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.add('card--current');
  });

    b.addEventListener('blur', function(event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.remove('card--current');
  });
  }
  b.addEventListener(CLICK, function(event) {
    event.preventDefault();
    openPopup(popupBuyModal);
  });
});

closeBuyModal && closeBuyModal.addEventListener(CLICK, function(event) {
  event.preventDefault();
  closePopup(popupBuyModal);
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    Array.prototype.forEach.call(popups, function(p) {
      if(p.classList.contains('modal--show'))
        closePopup(p);
    });
    overlay.classList.remove('modal-feedback--show');
  }
});

Array.prototype.forEach.call(addBookmarkButtons, function (b) {
  if (isIE) {
    b.addEventListener('focus', function (event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.add('card--current');
    });

    b.addEventListener('blur', function (event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.remove('card--current');
    });
  }
});
