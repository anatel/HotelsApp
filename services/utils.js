hotelsApp.service('Utils', function() {
    
    this.removeItemByProperty = function(array, propName, propVal) {
        var i;
        for (i=0; i < array.length; i++) {
            if (array[i][propName] == propVal) {
                break;
            }
        }
        array.splice(i,1);
    }
});