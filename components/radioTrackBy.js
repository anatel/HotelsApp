hotelsApp.directive('radioTrackBy', function(){
return {
        restrict: "A",
        scope: {
            ngModel: "=",
            ngValue: "=",
            radioTrackBy: "@"
        },
        link: function (ng) {   
            if (ng.ngValue[ng.radioTrackBy] === ng.ngModel[ng.radioTrackBy]) {                                
                ng.ngModel = ng.ngValue;
            }
        }
    };
});