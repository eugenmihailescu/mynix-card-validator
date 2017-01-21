var demo_app = (function(modules) {
    function print_result(what, valid, suffix) {
        suffix = suffix || 'a valid pattern';
        var color = valid ? 'green' : 'red';
        return '<li><span style="color:' + color + '">' + what + ' has ' + (valid ? '' : 'NOT') + ' ' + suffix
                + '</span></li>';
    }

    function validate() {
        var el = document.getElementById('cc_result'), cc_number = document.getElementById('cc_number').value, cc_expiry = document
                .getElementById('cc_expiry').value.replace(/[^\d]/g, ''), ccv_number = document.getElementById('ccv_number').value, postal_code = document
                .getElementById('postal_code').value, postal_code_is_valid, country_code = document
                .getElementById('country_code').value, is_valid, issuer, s = '', braintree_supports_country, cc_code;

        is_valid = modules.cc.is_valid_number(cc_number);
        cc_code = modules.cc.is_valid_issuer(cc_number);

        postal_code_is_valid = modules.cc.is_valid_postalcode(postal_code, country_code);
        issuer = is_valid ? modules.cc.get_card_issuer(cc_code) : '';
        braintree_supports_country = modules.bt.has_support(cc_code, country_code);
        el.innerHTML = '';
        if (false !== is_valid) {
            el.innerHTML = '<p>The card number matches the <strong>' + issuer + '</strong> pattern</p>';
        }

        s = print_result('card number', is_valid);
        s += print_result('expiry date', modules.cc.is_valid_expiry(cc_expiry));
        s += print_result('CCV', modules.cc.is_valid_ccv(cc_number, ccv_number));
        s += print_result("Postal code length", postal_code_is_valid);
        s += print_result(modules.pt.codes[country_code][0], braintree_supports_country, 'Braintree card support');
        el.innerHTML += '<ul>' + s + '</ul>';
    }

    function viewSource(evt) {
        evt.preventDefault();

        var content = unescape(document.documentElement.innerHTML);
        content = content.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

        var source = window.open("");
        source.document.write('<!doctype html><html><head><title>' + window.location.href + '<\/title><\/head><body><pre>'
                + content + '<\/pre><\/body><\/html>');
    }

    (function() {
        function fireEvent(target, name) {
            if (target["fireEvent"]) {
                target["fireEvent"].call(target, "on" + name);
            } else {
                target.dispatchEvent.call(target, new Event(name));
            }
        }

        function onCardNumberChange(event) {
            var code = modules.cc.is_valid_issuer(event.target.value, true);
            cc_badge.setAttribute("class", code + "-badge");
        }

        var ctry_list = modules.pt.codes;
        var country_code = document.getElementById("country_code");
        var postal_code = document.getElementById("postal_code");
        var cc_number = document.getElementById("cc_number");
        var cc_badge = document.getElementById("card-badge");
        var mask = "_";

        var options = "";
        for (ctry_code in ctry_list) {
            if (ctry_list.hasOwnProperty(ctry_code)) {
                options += "<option value=\"" + ctry_code + "\">" + ctry_list[ctry_code][0] + " [" + ctry_list[ctry_code][1]
                        + "]</option>";
            }
        }
        if (country_code) {
            country_code.innerHTML = options;
        }

        country_code.addEventListener("change", function(event) {
            var len = ctry_list[event.target.value][1];
            postal_code.setAttribute("maxlength", len);
            postal_code.setAttribute("placeholder", mask.repeat(len));
            postal_code.setAttribute("size", len);
        });

        cc_number.addEventListener("keyup", onCardNumberChange);
        cc_number.addEventListener("keydown", onCardNumberChange);

        document.getElementById('view-source').addEventListener('click', viewSource, false);

        document.getElementById("btn-validate").addEventListener("click", validate);

        fireEvent(country_code, "change");
        fireEvent(cc_number, "keyup");
    })();
})({
    cc : CC_Validator,
    bt : Braintree,
    pt : PostalCodesLength
});