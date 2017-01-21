var USA = (function() {
    return {
        "US" : "United States of America"
    }
})();
var Canada = (function() {
    return {
        "CA" : "Canada"
    }
})();
var Australia = (function() {
    return {
        "AU" : "Australia"
    };
})();

var World = (function(modules) {
    return modules.utils
            .extend(modules.usa, modules.canada, modules.asia, modules.pacific, modules.europe, modules.australia);
})({
    utils : Utils,
    usa : USA,
    canada : Canada,
    asia : Asia,
    pacific : Pacific,
    europe : Europe,
    australia : Australia
});
