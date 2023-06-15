$( document ).ready(function() {
  // Main variables
  const $aboutTitle = $('.about-myself .content h2');
  const $developmentWrapper = $('.development-wrapper');
  let developmentIsVisible = false;

  window.portFolio = {};


  /////////////////////////////
  // 개인정보 세팅 함수
  /////////////////////////////
  function getDeveloperDays(today) {
    // 시작한 날짜
    var startDate = new Date("2022-06-14");


    // 두 날짜 사이의 일 수 계산
    var diffTime = today.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function getAge(today) {
    return Math.floor((today - new Date("1996-10-15")) / 31557600000);
  }

  /////////////////////////////
  // 개인 사진 애니메이션 설정
  /////////////////////////////
  function showStandingHongPhoto() {
    $('.standingHongPhoto').animate({
      'opacity': '1',
    }, {
      duration: 3000,
      queue: false,
      complete: executeAfterAnimation
    });
  }

  function executeAfterAnimation() {
  }

  /////////////////////////////
  // 자기소개 스타일 설정
  /////////////////////////////
  function showHeroSection() {
    $('.hero .content .header').css('opacity', 0).delay(500).animate({
      'opacity': '1',
      'top': '50%'
    }, {
      duration: 1000,
      queue: false,
      complete: animateContentItems
    });
  }

  function animateContentItems() {
    $('.hero .content').find('p, span, a, ul > li').each(function(i) {
      $(this).delay(100 * i).animate({
        'opacity': '1',
        'top': '0'
      }, {
        duration: 500,
        queue: true,
        complete: applyMouseAnimation
      });
    });
  }

  function applyMouseAnimation() {
    $(this).mouseenter(handleMouseEnter);
    $(this).mouseleave(handleMouseLeave);
  }

  function handleMouseEnter() {
    addUnderlineElement.call(this);
    animateUnderlineWidth.call(this);
    animateTransformScale.call(this, 1.5);
  }

  function addUnderlineElement() {
    $('<div class="underline"></div>').appendTo($(this));
  }

  function animateUnderlineWidth() {
    var width = $(this).find('a').width();
    $(this).find('.underline').css({
      'width': 0,
      'height': '0.5px',
      'background-color': '#292b2f',
      'position': 'absolute',
      'bottom': 10,
      'left': '50%',
      'transform': 'translateX(-50%)',
      'transition': 'width 0.3s ease'
    }).animate({
      'width': width,
    }, {
      duration: 50,
      queue: false
    });
  }

  function animateTransformScale(scaleValue) {
    $(this).stop().animate({
      'transform': 'scale(' + scaleValue + ')'
    }, {
      duration: 200,
      queue: false
    });
  }

  function handleMouseLeave() {
    animateUnderlineWidth.call(this, 0, removeUnderlineElement);
    animateTransformScale.call(this, 1);
  }

  function animateUnderlineWidth(targetWidth, callback) {
    $(this).find('.underline').animate({
      'width': targetWidth,
    }, {
      duration: 50,
      queue: false,
      complete: callback
    });
  }

  function removeUnderlineElement() {
    $(this).remove();
  }

  function animateTransformScale(scaleValue) {
    $(this).stop().animate({
      'transform': 'scale(' + scaleValue + ')'
    }, {
      duration: 200,
      queue: false
    });
  }

  // 오늘
  const today = new Date();

  const developerDays = getDeveloperDays(today);
  $('#myDeveolperDays').text(developerDays);

  const age = getAge(today);
  $('#yearAge').text(age);

  $(window).scroll(handleWindowScroll);

  showStandingHongPhoto();
  showHeroSection();
});
