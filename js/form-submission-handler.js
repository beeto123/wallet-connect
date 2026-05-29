(function() {
    // Disable Google Sheets submission - using EmailJS instead
    function loaded() {
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
    }
    document.addEventListener("DOMContentLoaded", loaded, false);
})();