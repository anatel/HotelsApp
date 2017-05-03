hotelsApp.component('recentlyViewedHotels', {
    restrict: 'E',
    replace: true,
    templateUrl: 'components/recentlyViewed.html',
    bindings: {
        title: '@'
    },
    controller: function() {
        this.hotels = localStorage.getItem("recentlyViewedHotels") || "[]";
        this.hotels = JSON.parse(this.hotels);
    }
});
