angular.module("smooth-example", ['smoothie-directive'])

    .controller('MainController', function($scope) {
        $scope.foo = function() {
            return [new Date().getTime(), Math.random()*0.2];
        };
        
        $scope.goo = function() {
            return [new Date().getTime(), Math.random() * 30.0];
        };

    });