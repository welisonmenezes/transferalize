RunDatepicker = function (DatepickerContainer, options) {

    var datepicker = DatepickerContainer.querySelectorAll('input');
    var instance, timer;

    /* **********************************************************
     * DATEPICKER
     * **********************************************************/

    function getDatepickerOptions () {
        return {
            'format': (options.format) ? options.format : 'dd-mm-yyyy',
            'i18n': (options.lang && options.lang === 'pt-BR') ? getDatepickerPTBR() : null
        }
    }

    function getDatepickerPTBR() {
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

    function initDatepickerOnLoad(_opts) {
        M.Datepicker.init(datepicker, _opts);
    }

    function initDatepickerOnClick(_opts) {
        createButtonElement();
        var btn = DatepickerContainer.querySelector('.datepicker-open');
        if (btn) {
            var elements = btn.parentElement.querySelectorAll('input');
            btn.addEventListener('click', function (evt) {
                evt.stopPropagation();

                var element = evt.currentTarget.parentElement.querySelector('input');

                M.Datepicker.init(elements, _opts);
                instance = M.Datepicker.getInstance(element);

                if (instance) {

                    if (element.value) {
                        try {
                            var date = Date.parse(element.value);
                            if (date) {
                                instance.gotoDate(date);
                            }
                        } catch (e) { }
                    }

                    instance.options.onClose = function () {
                        destroyDatepicker();
                    };

                    document.removeEventListener('click', destroyDatepicker);
                    document.addEventListener('click', destroyDatepicker);
                    document.querySelector('.datepicker-modal').addEventListener('click', function (evt) {
                        evt.stopPropagation();
                    });

                    instance.open();
                }

            });
        }
    }

    function destroyDatepicker() {
        if (instance) {
            try {
                instance.destroy();
                instance = null;
            } catch (e) { }
        }
    }

    function initDatepicker() {
        if (datepicker.length) {
            var _opts = getDatepickerOptions();
            _opts.onSelect = function () {
                [].forEach.call(datepicker, function (element) {
                    element.parentElement.querySelector('.datepicker-done').click();
                });
            }

            if (options.openOn === 'click') {
                initDatepickerOnClick(_opts);
            } else {
                initDatepickerOnLoad(_opts);
            }

        }
    }



    /* **********************************************************
     * FLATPICKR
     * **********************************************************/

    function getFlatpiockrOptions() {
        return {
            'dateFormat': (options.format) ? options.format : 'd-m-Y',
            'locale': (options.lang && options.lang === 'pt-BR') ? getFlatpickrPTBR() : null,
            'allowInput': true
        }
    }

    function getFlatpickrPTBR() {
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
        createButtonElement();
        var btn = DatepickerContainer.querySelector('.datepicker-open');
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
                    }, 10)
                });
            });
        }
    }

    function initFlatpickr () {
        if (datepicker.length) {
            var _opts = getFlatpiockrOptions();
 
            if (options.openOn === 'click') {
                initFlatpickrOnClick(_opts);
            } else {
                initFlatpickrOnLoad(_opts);
            }
        }
    }

    function createButtonElement(element) {
        var btn = document.createElement("BUTTON");
        btn.setAttribute('class', 'datepicker-open');
        btn.setAttribute('type', 'button');
        btn.innerHTML = "Abrir";
        [].forEach.call(datepicker, function (element) {
            element.parentNode.insertBefore(btn, element.nextSibling);
        });
    }

    if (options.type === 'flatpickr') {
        initFlatpickr();
    } else {
        initDatepicker();
    }

}


RunTextMask = function (TextMaskContainer, options) {
    var field = TextMaskContainer.querySelector('input');
    if (field) {
        $(field).mask(options.pattern, {
            reverse: options.reverse,
            clearIfNotMatch: options.clear
        });
        field.addEventListener('blur', function () {
            field.dispatchEvent(new Event('change', { 'bubbles': true }));
        });
    }
}


RunUpdateInputText = function () {
    //M.updateTextFields();
}

