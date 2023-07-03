$(function() {

  calculateTimeToDeveloper();

  if ($('#sticky-sidebar').length) {
    var el = $('#sticky-sidebar');
    var stickyTop = $('#sticky-sidebar').offset().top;
    // var stickyHeight = $('#sticky-sidebar').height();

    $(window).scroll(function() {
      // var limit = $('#footer-wrapper').offset().top - stickyHeight - 20;
      var windowTop = $(window).scrollTop();
      if (stickyTop < windowTop) {
        el.css({
          position: 'fixed',
          // top: 20
        });
      } else {
        // el.css('position', 'static');
      }
      // if (limit < windowTop) {
      //   var diff = limit - windowTop;
      //   el.css({
      //     top: diff
      //   });
      // }
    });
  }

  // 개발자로 일한 시간 계산
  function calculateTimeToDeveloper() {
    $('.timeToDeveloper').text('');

    var startDate = new Date(2022, 5, 14, 9, 0); // 2022년 6월 14일 09:00
    var currentDate = new Date(); // 현재 시간

    var timeDiff = currentDate - startDate; // 현재 시간과 개발자로 일을 시작한 시간의 차이(ms)
    var seconds = Math.floor(timeDiff / 1000); // 초 단위로 변환

    var minutes = Math.floor(seconds / 60); // 분 단위로 변환
    seconds = seconds % 60; // 초 단위 재설정

    var hours = Math.floor(minutes / 60); // 시간 단위로 변환
    minutes = minutes % 60; // 분 단위 재설정

    var days = Math.floor(hours / 24); // 일 단위로 변환
    hours = hours % 24; // 시간 단위 재설정

    var timeToDeveloper = days + '일 ' + hours + '시간 ' + minutes + '분 ' + seconds + '초';

    $('.timeToDeveloper').text(timeToDeveloper);
  }

  setInterval(calculateTimeToDeveloper, 1000);
});

// Back to top button
(function() {
  $(document).ready(function() {
    return $(window).scroll(function() {
      return $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
    }), $("#back-to-top").click(function() {
      return $("html,body").animate({
        scrollTop: "0"
      })
    })
  })
}).call(this);
