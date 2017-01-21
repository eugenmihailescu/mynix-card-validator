var Utils = (function() {
    return {
        extend : function() {
            var arg;
            var prop;
            var result = {};

            for (arg in arguments) {
                if (arguments.hasOwnProperty(arg) && "object" === typeof arguments[arg]) {
                    for (prop in arguments[arg]) {
                        if (arguments[arg].hasOwnProperty(prop)) {
                            result[prop] = arguments[arg][prop];
                        }
                    }
                }
            }
            return result;
        },
        strrev : function(s) {
            return s.split('').reverse().join('');
        }
    }
})();
