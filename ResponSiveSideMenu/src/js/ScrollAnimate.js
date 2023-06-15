$( document ).ready(function() {
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

    window.portFolio.ScrollAnimate = ScrollAnimate;
});
