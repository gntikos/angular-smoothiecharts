angular.module('smoothie-directive', [])
  .directive('smoothieGrid', function() {
    return {
      template: '<canvas ng-transclude></canvas>',
      replace: true,
      transclude: true,
      restrict: 'E',

      scope: {
        background: '@',
        lineColor: '@',
        lineWidth: '@',
        labelColor: '@'
      },

      controller: function($scope, $element) {
        this.canvas = $element[0];

        this.smoothie = new SmoothieChart({
          grid: {
            strokeStyle: $scope.lineColor || 'transparent',
            fillStyle: $scope.background || 'transparent'
          },
          labels: {
            fillStyle: $scope.labelColor || 'transparent',
          }
        });
        this.containerScope = $scope.$parent;
      }
    };
  })

.directive('timeSeries', function($interval) {
  return {
    restrict: 'E',
    require: '^smoothieGrid',

    scope: {
      rate: '@',
      color: '@',
      width: '@',
      fill: '@',
      callback: '&',
      bind: '@',
    },

    controller: function($scope, $element) {
      $scope.rate = $scope.rate || 1000;
      $scope.line = new TimeSeries();
      $scope.callback = $scope.callback ? $scope.callback : function() {
        return false;
      };
      $scope.bind = $scope.bind;
    },

    link: function(scope, element, attrs, controller) {
      controller.smoothie.streamTo(controller.canvas, scope.rate);

      controller.smoothie.addTimeSeries(scope.line, {
        strokeStyle: scope.color || 'green',
        fillStyle: scope.fill,
        lineWidth: scope.width || 2
      });
      if (scope.callback()) {
        var updateInterval = $interval(function() {
          var point = scope.callback();
          scope.line.append(point[0], point[1]);
        }, scope.rate);

        element.on('$destroy', function() {
          $interval.cancel(updateInterval);
        });
      } else {
        controller.containerScope[scope.bind] = scope.line;
      }
    }
  };
});
