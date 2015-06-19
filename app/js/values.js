/**
 * Работает со значениями инпутов в которых хранятся характеристики водяного знака
 * @type {{setCoords, getCoords}}
 */
var Values = (function () {
    var mode = document.querySelector('[name=mode]'),
        watermarkPositionX = document.querySelector('#moveX'),
        watermarkPositionY = document.querySelector('#moveY'),
        watermarkMarginRight = document.querySelector('#margin-right'),
        watermarkMarginBottom = document.querySelector('#margin-bottom'),
        watermarkOpacity = document.querySelector('[name=opacity]');


    return {

        /**
         * Записывает значения характеристик вотермарка в инпуты
         * @param data
         */
        setCoords: function (data) {

            if (data.mode !== undefined) {
                mode.value = data.mode;
            }
            if (data.positionX !== undefined) {
                watermarkPositionX.value = data.positionX;
            }
            if (data.positionY !== undefined) {
                watermarkPositionY.value = data.positionY;
            }
            if (data.marginRight !== undefined) {
                watermarkMarginRight.value = data.marginRight;
            }
            if (data.marginBottom !== undefined) {
                watermarkMarginBottom.value = data.marginBottom;
            }
            if (data.opacity !== undefined) {
                watermarkOpacity.value = data.opacity;
            }
        },

        /**
         * Хранит значения инпутов с характеристиками вотермарка
         * @returns {{mode: *, watermarkPositionX: *, watermarkPositionY: *, watermarkMarginRight: *, watermarkMarginBottom: *, watermarkOpacity: *}}
         */

        getCoords: function () {
            return {
                mode: mode.value,
                watermarkPositionX: watermarkPositionX.value,
                watermarkPositionY: watermarkPositionY.value,
                watermarkMarginRight: watermarkMarginRight.value,
                watermarkMarginBottom: watermarkMarginBottom.value,
                watermarkOpacity: watermarkOpacity.value
            }
        }
    }


})();

