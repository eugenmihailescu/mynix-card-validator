var Braintree = (function(modules) {
    return {
        support : {
            "amex" : modules.world,
            "visa" : modules.world,
            "mastercard" : modules.world,
            "discover" : modules.utils.extend(modules.usa, modules.europe),
            "dinersclub" : modules.utils.extend(modules.usa, modules.europe, modules.australia),
            "jcb" : modules.utils.extend(modules.usa, modules.europe),
            "maestro" : modules.utils.extend(modules.usa, modules.europe),
            "unionpay" : modules.europe
        },
        has_support : function(issuer, country) {
            return Braintree.support[issuer].hasOwnProperty(country);
        }
    };
})({
    utils : Utils,
    world : World,
    usa : USA,
    europe : Europe,
    australia : Australia
});