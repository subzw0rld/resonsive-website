'use strict';
var meMeta = ['UI Enthusiast', 'Tech Evangelist', 'Traveler', 'Photographer', 'Blogger', 'Family Man'];

var config = {
    el: function (param) {
        return document.querySelector(param);
    },
    elList: function (param) {
        return document.querySelectorAll(param);
    }
};

function bannerAnimation() {
    var banner = config.el('.banner');
    if (banner) {
        setTimeout(function () {
            config.el('.banner').classList += ' banner-appear';
        }, 300);
    }
}

function changeNavigationColorOnScroll() {
    var navigation = config.el('.navigation');
    window.addEventListener('scroll', function (ev) {
        if (document.documentElement.scrollTop > 50 && navigation) {
            navigation.classList.add('black-bg');
        } else {
            navigation.classList.remove('black-bg');
        }
    });
}

function initFLipEffect() {
    var about = config.el('.about');
    var flipSetUp = config.el('.flip-setup');
    if (about) {
        var flipTop = config.el('.flip-top'),
            flipBottom = config.el('.flip-bottom'),
            flipBack = config.el('.flip-back'),
            flipBackBottom = config.el('.flip-back .flip-bottom'),
            counter = 0,
            flipTimer = 0;

        setMessage();
        // flipSetUp.classList.remove('flip');
        setInterval(function () {
            flipSetUp.classList.add('flip');
            flipTimer++;
            if(flipTimer % 10 === 0) {
                if (counter < meMeta.length - 1) {
                    counter++;
                } else {
                    counter = 0;
                }
                
                setMessage();
            }
            
        }, 100);
        // setInterval(function () {

        // }, 1000);

        function setMessage() {
            flipTop.innerText = meMeta[counter];
            flipBottom.setAttribute('data-value', meMeta[counter]);
            flipBack.setAttribute('data-value', meMeta[counter]);
            flipBackBottom.setAttribute('data-value', meMeta[counter]);
            flipSetUp.classList.remove('flip');
        }
    }
}


function init() {
    var blogMenu = config.el('.blog-menu');
    var menuDropDown = config.el('.menu-dropdown');
    var techGrid = config.el('.tech-grid');

    if (innerWidth >= 820 && techGrid) {
        setTimeout(function () {
            techGrid.classList.add('tilt');
        }, 800);
    }
    // blogMenu.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     menuDropDown.classList.toggle('hide');
    // });

    bannerAnimation();
    changeNavigationColorOnScroll();
    // initFLipEffect();
}

init();