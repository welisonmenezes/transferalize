RunPickdate = function (DatepickerContainer, options) {
    var datepicker = DatepickerContainer.querySelectorAll('input');
    if (datepicker.length) {
        var _opts = (options) ? options : {};
        M.Datepicker.init(datepicker, _opts);
    }
}