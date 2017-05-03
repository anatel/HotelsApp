var hotelsApp = angular.module('hotelsApp', ['ngRoute']);

hotelsApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider    
    .when('/', {
        templateUrl: 'views/hotelsList.html',
        controller: 'HotelsListCtrl'
    })
    
    .when('/hotel/:id', {
        templateUrl: 'views/hotel.html',
        controller: 'HotelCtrl'
    })
}]);