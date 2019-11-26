window.swiper = function(el) {
    var swiperContainer = document.querySelector(el);
    var swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    var slideCount = swiperWrapper.children.length;
    var currentSlide = 0;
    var timer;
    var transformPos;

    console.log(this);
    function initializeSwiper() {
        var swiperWrapperWidth = 0;
        Array.from(swiperWrapper.children).forEach(function(item) {
            swiperWrapperWidth+=item.getBoundingClientRect().width;
        });

        swiperWrapper.style.width = swiperWrapperWidth+'px';
        swiperWrapper.style.transitionDuration = '100ms';
    }

    function animateSlide() {
        var currentSwipeEl = swiperWrapper.children[currentSlide];
        var currentSlideWidth = currentSwipeEl.getBoundingClientRect().width;
        
        if(currentSlide === 0) {
            transformPos = currentSlideWidth;
        }else {
            transformPos += currentSlideWidth;
        }

        if(currentSlide >= slideCount - 1) {
            currentSlide = 0;
            transformPos = 0;
        }else {
            currentSlide ++;
        }
        swiperWrapper.style.transform = 'translate3d(-'+transformPos+'px, 0, 0)';
    }

    initializeSwiper();
    timer = setInterval(animateSlide, 2000);

    return this.destroy = function() {
        clearInterval(timer);
    }
}
