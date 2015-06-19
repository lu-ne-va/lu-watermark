///**
// * Created by urla on 17/06/15.
// */
//
////Переключение между режимами отображения водяного знака (один или мульти)
//$(".placement-select__item").on("click", function () {
//    var $this = $(this),
//        id = $this.data('select-placement');
//
//    $(id).addClass('active').siblings('.position-select').removeClass('active');
//    $this.addClass('active').siblings('.placement-select__item').removeClass('active');
//
//    // var imgFile = '/img/watermark.jpg'; // todo - это значение надо инизиализировать при загрузке изображения
//
//    if ($this.hasClass('placement-select__item_multi')) {
//        watermark.init(imgFile, 'multy');
//        $('input[name=mode]').val('multy');
//
//        //Используем сохраненное значение в случае переключения между режимами мульти и сингл
//        watermark.setRightMargin(marginRight.val());
//        watermark.setBottomMargin(marginBottom.val());
//        Opacity.refreshValue();
//
//    } else {
//        $draggable_elem = watermark.init(imgFile);
//
//        //Отображаем координаты при их изменении способом Драг энд Дроп
//        $draggable_elem.on("drag", function (event, ui) {
//            moveX.val(ui.position.left);
//            moveY.val(ui.position.top);
//        });
//
//        $('input[name=mode]').val('single');
//
//        //Используем сохраненное значение в случае переключения между режимами мульти и сингл
//        watermark.setPosition({x: moveX.val(), y: moveY.val()});
//        Opacity.refreshValue();
//
//    }
//
//});


/**
 * Отвечает за все характеристики водяного знака: режим мульти/сингл + сранит данные о всех характеристиках
 * @type {{init, changeMode, setMultyMode, setSingleMode}}
 */

var Position = function () {

    return {

        /**
         * Инициализирует переключение между режимами МУЛЬТИ и СИНГЛ
         */
        init: function () {
            var self = this;

            $(".placement-select__item").on("click", function () {
                self.changeMode($(this))
            })
        },

        /**
         * Отвечает за переключение между режимами МУЛЬТИ и СИНГЛ
         * @param $item
         */
        changeMode: function ($item) {
            var id = $item.data('select-placement');

            $(id).addClass('active').siblings('.position-select').removeClass('active');
            $item.addClass('active').siblings('.placement-select__item').removeClass('active');

            if ($item.hasClass('placement-select__item_multi')) {
                this.setMultyMode()
            } else {
                this.setSingleMode()
            }
        },

        /**
         *
         */
        setMultyMode: function () {
            //watermark.init(imgFile, 'multy');
            //$('input[name=mode]').val('multy');
            Values.setCoords({mode: 'multy'});
            Opacity.refreshValue();


            //var _initMultyMode = function () {

                $draggable_elem = _getDraggableElem('multy');
                var $img = _getWmImg();

                for (i = 0; i < 1000; i++) {
                    $draggable_elem.append($img.clone());
                }

                $draggable_elem.appendTo('.aim-img');
                $draggable_elem.draggable({
                    stop: _stop
                });
            //};

            //Используем сохраненное значение в случае переключения между режимами мульти и сингл
            //watermark.setRightMargin(marginRight.val());
            //watermark.setBottomMargin(marginBottom.val());
            //Values.getCoords.
        },

        /**
         *
         */
        setSingleMode: function () {
            //$draggable_elem = watermark.init(imgFile);

            ////Отображаем координаты при их изменении способом Драг энд Дроп
            //$draggable_elem.on("drag", function (event, ui) {
            //    moveX.val(ui.position.left);
            //    moveY.val(ui.position.top);
            //});

            //$('input[name=mode]').val('single');
            Values.setCoords({mode: 'single'});

            //Используем сохраненное значение в случае переключения между режимами мульти и сингл
            //watermark.setPosition({x: moveX.val(), y: moveY.val()});
            Opacity.refreshValue();
        }
    }


}();

Position.init();

