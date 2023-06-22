$( document ).ready(function() {
  // Main variables
  const $aboutTitle = $('.about-myself .content h2');
  const $developmentWrapper = $('.development-wrapper');
  let developmentIsVisible = false;

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

  const ScrollAnimate = () => {
    const $aboutTitle = $('.about-myself .content h2');
    const $developmentWrapper = $('.development-wrapper');
    let developmentIsVisible = false;

    function handleWindowScroll() {
      const bottom_of_window = $(window).scrollTop() + $(window).height();

      handleAboutMyselfSection(bottom_of_window);
      handleExperienceSection(bottom_of_window);
      handleHeroSection(bottom_of_window);
      handleSkillsSection(bottom_of_window);
    }

    function handleAboutMyselfSection(bottom_of_window) {
      const aboutTitleOffsetTop = $aboutTitle.offset().top + $aboutTitle.outerHeight();

      if (bottom_of_window > aboutTitleOffsetTop) {
        $('.about-myself .content h2').addClass('aboutTitleVisible');
      }
    }

    function handleExperienceSection(bottom_of_window) {
      $('.experience .content .hidden').each(function(i) {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();

        if (bottom_of_window > bottom_of_object) {
          $(this).animate({
            'opacity': '1',
            'margin-left': '0'
          }, 600);
        }
      });
    }

    function handleHeroSection(bottom_of_window) {
      var $hero = $('.hero');
      var height_of_hero = $hero.outerHeight();
      var bottom_of_hero = $hero.offset().top + height_of_hero;
      var opacity_ratio = (bottom_of_window - bottom_of_hero) / height_of_hero;

      $hero.css({
        'opacity': 1 - (opacity_ratio * 1.3)
      });
    }

    function handleSkillsSection(bottom_of_window) {
      var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight() / 2;

      if (bottom_of_window > middle_of_developmentWrapper && developmentIsVisible == false) {
        $('.skills-bar-container li').each(function() {
          animateProgressBar($(this));
        });
        developmentIsVisible = true;
      }
    }

    function animateProgressBar(element) {
      var $barContainer = element.find('.bar-container');
      var dataPercent = parseInt($barContainer.data('percent'));
      var elem = element.find('.progressbar');
      var percent = element.find('.percent');
      var width = 0;

      var id = setInterval(frame, 15);

      function frame() {
        if (width >= dataPercent) {
          clearInterval(id);
        } else {
          width++;
          elem.css("width", width + "%");
          percent.html(width + " %");
        }
      }
    }

  }


  // 오늘
  const today = new Date();

  const developerDays = getDeveloperDays(today);
  $('#myDeveolperDays').text(developerDays);

  const age = getAge(today);
  $('#yearAge').text(age);

  $(window).scroll(ScrollAnimate);

  showStandingHongPhoto();
  showHeroSection();
});
