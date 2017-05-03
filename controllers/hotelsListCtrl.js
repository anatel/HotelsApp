hotelsApp.controller('HotelsListCtrl', ['$scope', '$location', 'HotelsFactory', function($scope, $location, HotelsFactory) {
    
    $scope.hotels = [];
    $scope.selectedBrand = {};
    
    HotelsFactory.GetHotels().then(function(hotels) {
        $scope.hotels = hotels;
    });
    
    HotelsFactory.GetBrands().then(function(brands) {
        $scope.brands = brands;
    });
    
    $scope.selectBrand = function(brand) {
        $scope.selectedBrand = brand;
    };
    
    $scope.resetFilters = function() {
        $scope.hotelName = undefined;
        $scope.selectedBrand = {};
        $scope.filters = {};
    };
    
    $scope.deleteHotel = function(hotelId) {
        HotelsFactory.DeleteHotel(hotelId);
    };
}]);