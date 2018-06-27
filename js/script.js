'use strict';
var isIE = (function() {
  var ua = window.navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
})();

var EVENT = {
  CLICK: 'click',
  FOCUS: 'focus',
  BLUR: 'blur',
  SUBMIT: 'submit',
  KEYDOWN: 'keydown',

};

var overlay = document.querySelector('.modal-overlay');
var popups = document.querySelectorAll('.modal');

var openMap = document.querySelector('.js-open-map');
var popupMap = document.querySelector('.modal--map');
var closeMap = document.querySelector('.js-close-map');

var openFeedback = document.querySelector('.js-open-feedback');
var popupFeedback = document.querySelector('.modal--feedback');
var closeFeedback = document.querySelector('.js-close-feedback');
var feedbackForm = document.querySelector('.feedback-form');
var feedbackName = popupFeedback && popupFeedback.querySelector('#feedback-name');
var feedbackMail = popupFeedback && popupFeedback.querySelector('#feedback-mail');
var feedbackMessage = popupFeedback && popupFeedback.querySelector('#feedback-message');

var buyButtons = document.querySelectorAll('.js-buy');
var popupBuyModal = document.querySelector('.modal--cart');
var closeBuyModal = document.querySelector('.js-close-cart');

var addBookmarkButtons = document.querySelectorAll('.js-add-bookmark');

var storageName = localStorage.getItem('name');
var storageMail = localStorage.getItem('mail');


function closePopup(popup){
  popup.classList.remove('modal--show');
  overlay.classList.remove('modal-overlay--show');
}

function openPopup(popup) {
  popup.classList.add('modal--show');
  overlay.classList.add('modal-overlay--show');
}

overlay.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  Array.prototype.forEach.call(popups, function(p) {
    if(p.classList.contains('modal--show'))
      closePopup(p);
  });
});

openMap && openMap.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  openPopup(popupMap);
});

closeMap && closeMap.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  closePopup(popupMap);
});

openFeedback && openFeedback.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  openPopup(popupFeedback);
  if (storageName)
    feedbackName.value = storageName;
  if (storageMail)
    feedbackMail.value = storageMail;

  if (storageName && storageMail)
    feedbackMessage.focus();
  else if (storageName)
    feedbackMail.focus();
  else
    feedbackName.focus();
});

closeFeedback && closeFeedback.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  closePopup(popupFeedback);
});

feedbackForm && feedbackForm.addEventListener(EVENT.SUBMIT, function(event) {
  if (!feedbackName.value || !feedbackMail.value || !feedbackMessage.value) {
    event.preventDefault();
    // добавляем селектор при ошибки закопления формы
  } else {
    feedbackName && localStorage.setItem('name', feedbackName.value);
    feedbackMail && localStorage.setItem('mail', feedbackMail.value);
  }
});

buyButtons && Array.prototype.forEach.call(buyButtons, function(b) {
  if (isIE) {
    b.addEventListener(EVENT.FOCUS, function(event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.add('card--current');
  });

    b.addEventListener(EVENT.BLUR, function(event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.remove('card--current');
  });
  }
  b.addEventListener(EVENT.CLICK, function(event) {
    event.preventDefault();
    openPopup(popupBuyModal);
  });
});

closeBuyModal && closeBuyModal.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  closePopup(popupBuyModal);
});

window.addEventListener(EVENT.KEYDOWN, function(event) {
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
    b.addEventListener(EVENT.FOCUS, function (event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.add('card--current');
    });

    b.addEventListener(EVENT.BLUR, function (event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.remove('card--current');
    });
  }
});
