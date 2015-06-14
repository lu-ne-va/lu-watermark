var Slider = function (params) {
    var sliderTrumb = document.querySelector(params.trumbSelector),
        slider = document.querySelector(params.sliderSelector),
        progress = document.querySelector(params.progressSelector),
        opacity = 100;
    var coords;
    var boxCoords;
    var shiftX;
    var sliderWidth = slider.offsetWidth;
    var sliderTrumbWidth = sliderTrumb.offsetWidth;
    var maxLeft = sliderWidth - sliderTrumbWidth;


    /**
     * Определяет координаты елемента
     * @param elem
     * @returns {{top: number, left: number}}
     */

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    /**
     * Обработчик события нажатия
     * @param e
     */

    sliderTrumb.onmousedown = function (e) {
        coords = getCoords(sliderTrumb);
        boxCoords = getCoords(slider);
        shiftX = e.pageX - coords.left;

        moveAt(e);
        sliderTrumb.style.zIndex = 1000;


        /**
         * Расчет координат
         * @param e
         */
        function moveAt(e) {
            var left = e.pageX - boxCoords.left - shiftX;

            if (left > 0 && left < maxLeft) {
                opacity = ~~(left / maxLeft * 100 );
                sliderTrumb.style.left = opacity + '%';
                progress.style.width = opacity + '%';
            } else if (left < 0) {
                sliderTrumb.style.left = '0%';
                progress.style.width = '0%';
                opacity = 0;
            } else if (left > maxLeft) {
                sliderTrumb.style.left = '100%';
                progress.style.width = '100%';
                opacity = 100;
            }
            params.change(opacity);
        }

        document.onmousemove = function (e) {
            moveAt(e);
        };

    };

    document.onmouseup = function () {
        document.onmousemove = null;
        sliderTrumb.onmouseup = null;
    };

    sliderTrumb.ondragstart = function () {
        return false;
    };

    params.change(opacity);

    return {
        refreshValue: function () {
            params.change(opacity)
        }
    }
};

Opacity = new Slider({
    change: refreshOpacity,
    trumbSelector: '#trumb',
    sliderSelector: '#opacity',
    progressSelector: '#progress'
});


/**
 * Применяет значение прозрачности к водяному знаку
 * и записывает его в скрытый инпут
 * @param value
 */
function refreshOpacity(value) {
    var opacity = value / 100;
    $('.watermark').css({'opacity': opacity});
    $('input[name=opacity]').val(opacity);
}

