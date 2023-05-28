$( document ).ready(function() {
  // Main variables
  var $aboutTitle = $('.about-myself .content h2');
  var $developmentWrapper = $('.development-wrapper');
  var developmentIsVisible = false;

  // 1년차가 된 날짜
  var startDate = new Date("2022-06-14");

  // 현재 날짜
  var today = new Date();

  // 두 날짜 사이의 일 수 계산
  var diffTime = today.getTime() - startDate.getTime();
  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  $('#myDeveolperDays').text(diffDays);

  const birthDate = new Date(1996, 10, 15);
  let age = today.getFullYear() - birthDate.getFullYear() + 1;

  $('#yearAge').text(age);

  $('.standingHongPhoto').animate({
    'opacity': '1',
  }, {
    duration: 3000,
    queue: false,
    complete: function() {
    // 애니메이션이 끝나면 실행할 코드 작성
    }
  });

  /* ####### HERO SECTION ####### */
  $('.hero .content .header').css('opacity', 0).delay(500).animate({
    'opacity': '1',
    'top': '50%'
  }, {
    duration: 1000,
    queue: false,
    complete: function() {
      $('.hero .content p').each(function(i) {
        $(this).delay(100 * i).animate({
          'opacity': '1',
          'top': '0'
        }, {
          duration: 500,
          queue: true,
          complete: function() {

            // 마우스 오버시 확대 애니메이션 적용
            $(this).mouseenter(function() {
              $('<div class="underline"></div>').appendTo($(this));
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
                'width': $(this).find('a').width(),
              }, {
                duration: 50,
                queue: false
              });

              $(this).stop().animate({
                'transform': 'scale(1.5)'
              }, {
                duration: 200,
                queue: false
              });
            });


            // 마우스 아웃시 초기 상태로 되돌리기
            $(this).mouseleave(function() {

              $(this).find('.underline').animate({
                'width': 0,
              }, {
                duration: 50,
                queue: false,
                complete: function() {
                  $(this).remove();
                }
              });

              $(this).stop().animate({
                'transform': 'scale(1)'
              }, {
                duration: 200,
                queue: false
              });
            });
          }
        });
      });
    }
  });

  $(window).scroll(function() {
    var bottom_of_window = $(window).scrollTop() + $(window).height();

    /* ##### ABOUT MYSELF SECTION #### */
    if (bottom_of_window > ($aboutTitle.offset().top + $aboutTitle.outerHeight())) {
      $('.about-myself .content h2').addClass('aboutTitleVisible');
    }

    /* ##### EXPERIENCE SECTION #### */

    // Check the location of each element hidden */
    $('.experience .content .hidden').each(function(i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();

      /* If the object is completely visible in the window, fadeIn it */
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1',
          'margin-left': '0'
        }, 600);
      }
    });

    /* ##### HERO SECTION #### */

    var $hero = $('.hero');
    var height_of_hero = $hero.outerHeight();
    var bottom_of_hero = $hero.offset().top + height_of_hero;
    var opacity_ratio = (bottom_of_window - bottom_of_hero) / height_of_hero;

    $hero.css({
      'opacity': 1 - (opacity_ratio * 1.3)
    });

    /*###### SKILLS SECTION ######*/

    var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight()/2;

    if((bottom_of_window > middle_of_developmentWrapper)&& (developmentIsVisible == false)){

      $('.skills-bar-container li').each( function(){

        var $barContainer = $(this).find('.bar-container');
        var dataPercent = parseInt($barContainer.data('percent'));
        var elem = $(this).find('.progressbar');
        var percent = $(this).find('.percent');
        var width = 0;

        var id = setInterval(frame, 15);

        function frame() {
          if (width >= dataPercent) {
              clearInterval(id);
          } else {
            width++;
            elem.css("width", width+"%");
            percent.html(width+" %");
          }
        }
      });
      developmentIsVisible = true;
    }
  });
});
