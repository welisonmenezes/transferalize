RunTSDatepicker = function (TSDatepickerContainer, options) {

    var datepicker = TSDatepickerContainer.querySelectorAll('input');
    var instance, timer;

    /* **********************************************************
     * DATEPICKER
     * **********************************************************/

    function initDatepickerOnLoad(_opts) {
        [].forEach.call(datepicker, function (element) {
            M.Datepicker.init(element, _opts);
        });
    }

    function initDatepickerOnClick(_opts) {

        _createButtonElement(datepicker);

        var btn = TSDatepickerContainer.querySelector('.datepicker-open');
        if (btn) {
            var elements = btn.parentElement.querySelectorAll('input');
            btn.addEventListener('click', function (evt) {
                evt.stopPropagation();

                var element = evt.currentTarget.parentElement.querySelector('input');

                M.Datepicker.init(elements, _opts);
                instance = M.Datepicker.getInstance(element);


                if (instance) {

                    instance.options.onClose = function () {
                        destroyDatepicker();
                    };

                    document.removeEventListener('click', destroyDatepicker);
                    document.addEventListener('click', destroyDatepicker);
                    instance.open();
                }

            });
        }
    }

    function destroyDatepicker(evt) {
        if (evt && (evt.target.classList.contains('modal-overlay') || evt.target.classList.contains('datepicker-day-button')) ) {
            if (instance) {
                try {
                    instance.destroy();
                    instance = null;
                } catch (e) { }
            }
        }
    }

    function initDatepicker() {
        if (datepicker.length) {
            var _opts = _getDatepickerOptions(options);

            // execute when datepicker modal opens
            _opts.onOpen = function () {
                var self = this;

                // set default date
                if (self.el.value) {

                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        self.setDate(_getEnglishFormatDate(self.options.format, self.el.value));
                    });

                }
            }

            // start the date picker
            if (options.openOn === 'click') {
                initDatepickerOnClick(_opts);
            } else {
                initDatepickerOnLoad(_opts);
            }

            // trigger done btn to close on select date
            document.addEventListener('click', function (evt) {
                if (evt.target.classList.contains('datepicker-day-button')) {
                    var modal = document.querySelector('.datepicker-modal.open');
                    if (modal) {
                        var btn = modal.querySelector('.datepicker-done');
                        if (btn) {
                            btn.click();
                        }
                    }
                }
            });

        }
    }



    /* **********************************************************
     * FLATPICKR
     * **********************************************************/

    function setDateToFlatpickr(element) {
        element.addEventListener('change', function (evt) {
            var value = evt.currentTarget.value;
            try {
                instance.setDate(instance.parseDate(value, _opts.dateFormat));
            } catch (e) { }
        });
    }

    function initFlatpickrOnLoad(_opts) {
        [].forEach.call(datepicker, function (element) {
            setDateToFlatpickr(element);
        });
        instance = flatpickr(datepicker, _opts);
    }

    function initFlatpickrOnClick(_opts) {

        _createButtonElement(datepicker);

        var btn = TSDatepickerContainer.querySelector('.datepicker-open');
        if (btn) {
            var element = btn.parentElement.querySelector('input');
            btn.addEventListener('click', function (evt) {
                var value = element.value;
                setDateToFlatpickr(element);
                instance = flatpickr(element, _opts);

                if (value) {
                    instance.setDate(instance.parseDate(value, _opts.dateFormat));
                }

                instance.open();

                instance.config.onClose.push(function () {
                    value = element.value;

                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        instance.destroy();
                        element.value = value;
                    })
                });
            });
        }
    }

    function initFlatpickr () {
        if (datepicker.length) {
            var _opts = _getFlatpiockrOptions(options);
 
            if (options.openOn === 'click') {
                initFlatpickrOnClick(_opts);
            } else {
                initFlatpickrOnLoad(_opts);
            }
        }
    }

    if (options.type === 'flatpickr') {
        initFlatpickr();
    } else {
        initDatepicker();
    }

}


RunTSTextMask = function (TSTextMaskContainer, options) {
    var field = TSTextMaskContainer.querySelector('input');
    if (field) {

        if (options.type === 'Currency') {
            $(field).maskMoney();
        } else {
            $(field).mask(options.pattern, {
                reverse: options.reverse,
                clearIfNotMatch: options.clear
            });
        }
        
        field.addEventListener('blur', function () {
            field.dispatchEvent(new Event('change', { 'bubbles': true }));
        });
    }
}


RunTSTabs = function (TSTabsContainer) {
    var el = TSTabsContainer.querySelector('.tabs');
    if (el) {
        M.Tabs.init(el, {});
    }
}


RunTSCarousel = function (TSCarouselContainer, options) {

    var elems = TSCarouselContainer.querySelectorAll('.carousel'),
        imgs = TSCarouselContainer.querySelectorAll('img'),
        len = imgs.length,
        counter = 0;

    if (len) {
        [].forEach.call(imgs, function (img) {
            if (img.complete)
                incrementCounter();
            else
                img.addEventListener('load', incrementCounter, false);
        });

        function incrementCounter() {
            counter++;
            if (counter === len) {
                M.Carousel.init(elems, options);
            }
        }
    } else {
        M.Carousel.init(elems, options);
    }
}



RunTSTooltip = function (TSTooltipContainer, options) {
    console.log(TSTooltipContainer, options);
    var tooltips = TSTooltipContainer.querySelectorAll('*');
    
    if (tooltips) {
        TSTooltipContainer.style.display = options.display;
        M.Tooltip.init(tooltips, options);
    }
}













function _getEnglishFormatDate(format, date) {
    var arDate;
    var retDate = date;

    if (format === 'dd-mm-yyyy') {
        arDate = date.split('-');
        retDate = arDate[1] + '-' + arDate[0] + '-' + arDate[2];
    }

    if (format === 'dd/mm/yyyy') {
        arDate = date.split('/');
        retDate = arDate[1] + '-' + arDate[0] + '-' + arDate[2];
    }

    if (format === 'mm/dd/yyyy') {
        arDate = date.split('/');
        retDate = arDate[0] + '-' + arDate[1] + '-' + arDate[2];
    }

    return retDate;
}


function _getFlatpickerFormatDate(format) {

    var retFormat = 'd-m-Y';

    if (format === 'dd-mm-yyyy') {
        retFormat = 'd-m-Y';
    }

    if (format === 'dd/mm/yyyy') {
        retFormat = 'd/m/Y'
    }

    if (format === 'mm/dd/yyyy') {
        retFormat = 'm/d/Y'
    }

    return retFormat;
}

function _getDatepickerOptions(options) {
    return {
        'format': (options.format) ? options.format : 'dd-mm-yyyy',
        'i18n': (options.lang && options.lang === 'pt-BR') ? _getDatepickerPTBR() : null,
        'setDefaultDate': false
    }
}

function _getDatepickerPTBR() {
    return {
        cancel: 'Cancelar',
        clear: 'Limpar',
        done: 'Ok',
        months: ['Janeiro', 'Fevereio', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    };
}

function _getFlatpiockrOptions(options) {
    return {
        'dateFormat': _getFlatpickerFormatDate(options.format),
        'locale': (options.lang && options.lang === 'pt-BR') ? _getFlatpickrPTBR() : null,
        'allowInput': true
    }
}

function _getFlatpickrPTBR() {
    return {
        weekdays: {
            shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        },
        months: {
            shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            longhand: ['Janeiro', 'Fevereio', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        },
        rangeSeparator: ' até ',
        time_24hr: true,
    };
}

function _createButtonElement(datepicker) {
    var btn = document.createElement("BUTTON");
    btn.setAttribute('class', 'datepicker-open');
    btn.setAttribute('type', 'button');
    btn.innerHTML = "Abrir";
    [].forEach.call(datepicker, function (element) {
        element.parentNode.insertBefore(btn, element.nextSibling);
    });
}