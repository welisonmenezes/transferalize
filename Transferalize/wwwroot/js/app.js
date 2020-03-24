RunDatepicker = function (DatepickerContainer, options) {

    var datepicker = DatepickerContainer.querySelectorAll('input');

    function getDatepickerOptions () {
        return {
            'format': (options.format) ? options.format : 'dd-mm-yyyy',
            'i18n': (options.lang && options.lang === 'pt-BR') ? getDatepickerPTBR() : null
        }
    }

    function getDatepickerPTBR() {
        console.log('ptbr')
        return {
            cancel: 'Cancelar',
            clear: 'Limpar',
            done: 'Ok',
            months: ['Janeiro', 'Fevereio', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
        }
    }

    function initDatepicker () {
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

    function initFlatpickr () {
        var datepicker = DatepickerContainer.querySelectorAll('input');
        if (datepicker.length) {
            flatpickr(datepicker, {});
        }
    }

    if (options.type === 'flatpickr') {
        initFlatpickr();
    } else {
        initDatepicker();
    }
    
}