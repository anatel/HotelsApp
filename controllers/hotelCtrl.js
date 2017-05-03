hotelsApp.controller('HotelCtrl', ['$scope', '$routeParams', '$filter', '$location', 'HotelsFactory', 'Utils', function($scope, $routeParams, $filter, $location, HotelsFactory, Utils) {
 
    $scope.hotelId = parseInt($routeParams.id);
    
    HotelsFactory.GetHotelById($scope.hotelId).then(function(hotel) {
        $scope.origHotel = hotel;
        if ($scope.origHotel) {
            $scope.init();            
        } else {
            $scope.error = "Hotel not exists";
        }
        
    }, function(err) {
        $scope.error = err;    
    });
    
    HotelsFactory.GetBrands().then(function(brands) {
        $scope.brands = brands;
    });
    
    $scope.addToRecentlyViewed = function() {
        var hotelToAdd = {id: $scope.hotelId, name: $scope.hotel.name, timestamp: Date.now()};
        var recentlyViewed = localStorage.getItem("recentlyViewedHotels");
        if (recentlyViewed == null) {
            recentlyViewed = [hotelToAdd];
        } else {
            recentlyViewed = JSON.parse(recentlyViewed);
            Utils.removeItemByProperty(recentlyViewed, "id", $scope.hotelId);
            recentlyViewed.push(hotelToAdd);
        }
        
        localStorage.setItem("recentlyViewedHotels", JSON.stringify(recentlyViewed));
    }
    
    $scope.saveHotel = function() {
        HotelsFactory.UpdateHotel($scope.hotel);
        $location.path('/');
    }
    
    $scope.toggleEditMode = function() {
        $scope.editMode = !$scope.editMode;    
    }
    
    $scope.resetHotel = function() {
        $scope.hotel = angular.copy($scope.origHotel);
    }
    
    $scope.init = function() {
        
        $scope.resetHotel();
        $scope.editMode = false;
        
        $scope.optionalAmenities = HotelsFactory.GetOptionalAmenities();        

        $scope.addToRecentlyViewed();

        $scope.hasAmenitie = function(amenitieVal) {
            return $filter('filter')($scope.hotel.amenities, {val: amenitieVal}, true).length > 0;
        }
        
        $scope.toggleAmenitie = function(amenitie) {
            if ($scope.hasAmenitie(amenitie.val)) {
                Utils.removeItemByProperty($scope.hotel.amenities, "val", amenitie.val);
            } else {
                $scope.hotel.amenities.push(amenitie);
            }  
        }
    }

}]);