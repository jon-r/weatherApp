/* weather ----------------------------------------------------------------------------*/
app.controller('weather', ['$scope', '$routeParams', 'getWeather', 'dayStr',
  function($scope, $routeParams, getWeather,dayStr) {

    getWeather($routeParams.id).then(function(result) {

      $scope.get = result.data.SiteRep.DV;
      $scope.days = $scope.get.Location.Period;
      $scope.dayStr = dayStr($scope.days.Rep);

      console.log ($scope.days);
    }, function(err) {
      console.log(err);
    })

    //$scope.days = $scope.get.list;
}])
