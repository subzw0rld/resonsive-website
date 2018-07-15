'use strict';

var config = {
    el: function(param) {
        return document.querySelector(param);
    },
    elList: function(param) {
        return document.querySelectorAll(param);
    }
};

function bannerAnimation(){
    setTimeout(function() {
        config.el('.banner').classList+=' banner-appear';
    }, 300);
}

bannerAnimation();