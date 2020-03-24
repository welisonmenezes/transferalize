RunDatepicker = function (DatepickerContainer, options) {

    var datepicker = DatepickerContainer.querySelectorAll('input');

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

    function initDatepicker() {
        if (datepicker.length) {
            var _opts = getDatepickerOptions();
            _opts.onSelect = function () {
                [].forEach.call(datepicker, function (el) {
                    el.parentElement.querySelector('.datepicker-done').click();
                });
            }
            M.Datepicker.init(datepicker, _opts);
        }
    }

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

    function initFlatpickr () {
        if (datepicker.length) {
            var instance;
            var _opts = getFlatpiockrOptions();
            [].forEach.call(datepicker, function (el) {
                el.addEventListener('change', function (evt) {
                    var value = evt.currentTarget.value;
                    try {
                        instance.setDate(instance.parseDate(value, _opts.dateFormat));
                    } catch (e) { }
                });
            });
            instance = flatpickr(datepicker, _opts);
        }
    }

    if (options.type === 'flatpickr') {
        initFlatpickr();
    } else {
        initDatepicker();
    }
    
}


RunTextMask = function (TextMaskContainer, options) {
    console.log(TextMaskContainer, options);
    var field = TextMaskContainer.querySelector('input')
    if (field) {
        $(field).mask(options.pattern, {
            reverse: options.reverse
        });

    }
} 