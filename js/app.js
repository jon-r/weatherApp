var app = angular.module("jr_weather", ['ngRoute']);

app.controller('Main', ['$scope', 'getCities', function($scope, getCities) {

  getCities.success(function(data) {
    $scope.cities = data;
  })

}])

app.controller('Weather', ['$scope', '$routeParams', 'getWeather', function($scope, $routeParams, getWeather) {
  getWeather($routeParams.id).then(function(data) {
    console.log(data.data);
    $scope.get = data.data;

  }, function(err) {
    console.log(err);
  });
}])

app.factory('getCities', ['$http', function($http) {
  return $http.get('/data/cityList.json')
    .success(function(data) {
      return data;
    })
    .error(function(err) {
      return err;
    })
}])

app.factory('getWeather', ['$http', function ($http) {
  return function (countryID) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast',
      params: {
        id: countryID,
        appid: '2de143494c0b295cca9337e1e96b00e0',
        units: 'metric'
      }
    })
  }
 }])

//because the timestamps are in seconds not miliseconds...
app.filter('secToMs', function() {
  return function(input) {
    input = input || 0;
    return (input * 1000);
  }
})

app.filter('lat', function() {
  return function(input) {
    input = input || 0;
    return ((input*-455)/5) + 5540;
  }
})

app.filter('long', function() {
  return function(input) {
    input = input || 0;
    return ((input*-255)/-5) + 721;
  }
})

app.directive('ngX', function () {
  return function (scope, element, attrs) {
    scope.$watch(attrs.ngX, function (value) {
      element.attr('cx', value);
    });
  };
})

app.directive('ngY', function () {
  return function (scope, element, attrs) {
    scope.$watch(attrs.ngY, function (value) {
      element.attr('cy', value);
    });
  };
})

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'Main',
    templateUrl: 'views/home.htm'
  })
  .when('/city/:id', {
  	controller: 'Weather',
    templateUrl: 'views/weather.htm'
  })
  .otherwise({
    redirectTo:  '/'
  });
});
