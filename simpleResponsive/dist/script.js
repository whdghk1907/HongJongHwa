$( document ).ready(function() {
  // Main variables
    var $aboutTitle = $('.about-myself .content h2');
    var $developmentWrapper = $('.development-wrapper');
    var developmentIsVisible = false;


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
          queue: true
        });

        // 마우스 오버시 확대 애니메이션 적용
        $(this).mouseenter(function() {
          $(this).stop().animate({
            'transform': 'scale(1.5)'
          }, {
            duration: 200,
            queue: false
          });
        });

        // 마우스 아웃시 초기 상태로 되돌리기
        $(this).mouseleave(function() {
          $(this).stop().animate({
            'transform': 'scale(1)'
          }, {
            duration: 200,
            queue: false
          });
        });
      });
    }
  });

  // $('.hero .content .header, .hero .content .contentBody').css('opacity', 0).delay(500).animate({
  //   'opacity': '1',
  //   'top': '50%'
  // }, {
  //   duration: 1000,
  //   queue: false
  // });

  // $('.hero .content .header').delay(500).animate({
  //   'opacity':'1',
  //   'top': '50%'
  // },1000);

  $(window).scroll( function(){

    var bottom_of_window = $(window).scrollTop() + $(window).height();

    /* ##### ABOUT MYSELF SECTION #### */
    if( bottom_of_window > ($aboutTitle.offset().top + $aboutTitle.outerHeight())){
      $('.about-myself .content h2').addClass('aboutTitleVisible');
    }
  /* ##### EXPERIENCE SECTION #### */

      // Check the location of each element hidden */
      $('.experience .content .hidden').each( function(i){

          var bottom_of_object = $(this).offset().top + $(this).outerHeight();

          /* If the object is completely visible in the window, fadeIn it */
          if( bottom_of_window > bottom_of_object ){

            $(this).animate({
              'opacity':'1',
              'margin-left': '0'
            },600);
          }
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
  }); // -- End window scroll --
});
