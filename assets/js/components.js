var threeDButtonComponent = (function () {
    var threeDButton = document.querySelectorAll('.threeD-btn');

    threeDButton.forEach(function (element) {
        element.addEventListener('click', function (event) {
            toggleState(element);
            // console.log(element);
        });
    });

    function toggleState(element) {
        threeDButton.forEach(function(item) {
            item.classList.remove('active');
        });
        element.classList.add('active');
    }

    return threeDButton;
}(document));