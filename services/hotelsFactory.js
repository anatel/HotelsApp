hotelsApp.factory('HotelsFactory', ['$filter', '$http', '$q', 'Utils', function($filter, $http, $q, Utils) {
    
    var factoryObj = {};
    var hotels, brands;
    var hotelsURL = "DataBase/hotels.json";
    var brandsURL = "DataBase/brands.json";
    
    factoryObj.GetHotels = function() {
        
        var deferred = $q.defer();
        
        //We avoid going out to the server multiple times when we already have the data.
        if (hotels) {
            deferred.resolve(hotels);
        } else {
            $http.get(hotelsURL).then(function onSuccess(response) {
                hotels = response.data;
                deferred.resolve(hotels);
            }, function onError() {
                deferred.reject("Failed to get hotels :(");
            });
        }
        
        return deferred.promise;
    };
    
    factoryObj.GetBrands = function() {
        
        var deferred = $q.defer();
        
        //We avoid going out to the server multiple times when we already have the data.
        if (brands) {
            deferred.resolve(brands);
        } else {
            $http.get(brandsURL).then(function onSuccess(response) {
                brands = response.data;
                deferred.resolve(brands);
            }, function onError() {
                deferred.reject("Failed to get brands :(");
            });
        }
        
        return deferred.promise;
    };
    
    factoryObj.GetHotelById = function(hotelId) {
        /*
        NOTE: We want to enable accessing to hotel/:id directly, without accessing to hotelsList first, 
        that's why we request the hotels JSON again in this method.
        */
        return factoryObj.GetHotels().then(function onSuccess(hotels) {
            return $filter('filter')(hotels, {_id: hotelId}, true)[0];
        }, function onError() {
            return "Failed to get hotel Id " + hotelId;
        });
    };
    
    factoryObj.DeleteHotel = function(hotelId) {
        Utils.removeItemByProperty(hotels, "_id", hotelId);
    };
    
    factoryObj.UpdateHotel = function(hotel) {
        factoryObj.GetHotelById(hotel._id).then(function(hotelFromDB){
            angular.extend(hotelFromDB, hotel);
        });
    }
    
    //NOTE: The user needs to choose amenities. A list of amenities to choose from was not provided, so here I created it based on the original JSON. 
    factoryObj.GetOptionalAmenities = function() {
        return  [
                  {
                    "val": 1,
                    "txt": "Spa"
                  },
                  {
                    "val": 2,
                    "txt": "Kids Spa"
                  },
                  {
                    "val": 3,
                    "txt": "Sauna"
                  },
                  {
                    "val": 4,
                    "txt": "Olympic Pool"
                  },
                  {
                    "val": 5,
                    "txt": "Ran Bahar Size pool"
                  },
                  {
                    "val": 6,
                    "txt": "Angular Pool"
                  },
                  {
                    "val": 7,
                    "txt": "Swedish Massage"
                  },
                  {
                    "val": 8,
                    "txt": "Master Card"
                  },
                  {
                    "val": 9,
                    "txt": "Visa"
                  },
                  {
                    "val": 10,
                    "txt": "Diners"
                  },
                  {
                    "val": 11,
                    "txt": "American Express"
                  }
                ]; 
    };
    
    return factoryObj;
    
}])