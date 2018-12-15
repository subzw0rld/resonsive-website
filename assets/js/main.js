'use strict';

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
        if(document.documentElement.scrollTop > 50 && navigation) {
            navigation.classList.add('black-bg');
        }else {
            navigation.classList.remove('black-bg');
        }
    });
}

function init() {
    var blogMenu = config.el('.blog-menu');
    var menuDropDown = config.el('.menu-dropdown');
    var techGrid = config.el('.tech-grid');

    if(innerWidth >= 820 && techGrid) {
        setTimeout(function() {
            techGrid.classList.add('tilt');
        }, 800);
    }
    blogMenu.addEventListener('click', function(e) {
        e.preventDefault();
        menuDropDown.classList.toggle('hide');
    });

    bannerAnimation();
    changeNavigationColorOnScroll();
}

init();