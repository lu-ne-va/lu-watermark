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

var DragDrop = function (params) {
    var dragabbleElement = document.querySelector(params.trumbSelector),
        slider = document.querySelector(params.sliderSelector),
        coords;
    var boxCoords;
    var shiftX;
    var shiftY;
    var sliderWidth = slider.offsetWidth;
    var sliderHeidht = slider.offsetHeight;
    var dragabbleElementWidth = dragabbleElement.offsetWidth;
    var dragabbleElementHeight = dragabbleElement.offsetHeight;
    //var maxLeft = sliderWidth - dragabbleElementWidth;
    //var maxTop = sliderHeidht - dragabbleElementHeight;
    var inputX = document.querySelector(params.inputX);
    var inputY = document.querySelector(params.inputY);


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

    dragabbleElement.onmousedown = function (e) {
        coords = getCoords(dragabbleElement);
        boxCoords = getCoords(slider);
        shiftX = e.pageX - coords.left;
        shiftY = e.pageY - coords.top;

        moveAt(e);
        dragabbleElement.style.zIndex = 1000;


        /**
         * Расчет координат
         * @param e
         */
        function moveAt(e) {
            var left = e.pageX - boxCoords.left - shiftX,
                top = e.pageY - boxCoords.top - shiftY;

            dragabbleElement.style.left = ~~left + 'px';
            inputX.value = ~~left;
            dragabbleElement.style.top = ~~top + 'px';
            inputY.value = ~~top;

            document.onmousemove = function (e) {
                moveAt(e);
            };

        }

        document.onmouseup = function () {
            document.onmousemove = null;
            dragabbleElement.onmouseup = null;
        };

        dragabbleElement.ondragstart = function () {
            return false;
        };

        params.change(opacity);

        return {
            refreshValue: function () {
                params.change(opacity)
            }
        }
    };
};

/**
 * Применяет значение прозрачности к водяному знаку
 * и записывает его в скрытый инпут
 * @param value
 */
function refreshOpacity(value) {
    var opacity = value / 100;
    document.querySelector('.watermark').style.opacity = opacity;
    document.querySelector('input[name=opacity]').value = opacity;
}

