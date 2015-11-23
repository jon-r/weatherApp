/* weather ----------------------------------------------------------------------------*/
app.controller('weather', ['$scope', '$routeParams', 'getWeather', 'dayStr',
  function($scope, $routeParams, getWeather, dayStr) {

    getWeather($routeParams.id).then(function(result) {

      $scope.get = result.data;
      $scope.days = $scope.get.list;
      $scope.dayStr = dayStr($scope.days);

    }, function(err) {
      console.log(err);
    })

    //$scope.days = $scope.get.list;
}])
