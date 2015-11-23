/* city select ------------------------------------------------------------------------*/
//TO DO - convert list to be filterable before getting everything
app.controller('sidebar', ['$scope', 'getCities', function($scope, getCities) {

  getCities.success(function(data) {
    $scope.cities = data;
  })

  //show/hide the autocomplete
  $scope.valueIn = '';
  $scope.$watch("valueIn", function() {
    $scope.cityListHide = ($scope.valueIn.length < 3);
  })
}])

.factory('getCities', ['$http', function($http) {
  return $http.get('assets/data/cityList.json')
    .success(function(data) {
      return data;
    })
    .error(function(err) {
      return err;
    })
}])
