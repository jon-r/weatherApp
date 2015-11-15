var app = angular.module("jr_weather", ['ngRoute']);

/* city select ------------------------------------------------------------------------*/
//TO DO - convert list to be filterable before getting everything
app.controller('Main', ['$scope', 'getCities', function($scope, getCities) {

  getCities.success(function(data) {
    $scope.cities = data;
  })

  //show/hide the autocomplete
  $scope.valueIn = '';
  $scope.$watch("valueIn", function() {
    $scope.cityListHide = ($scope.valueIn.length < 3);
  })
}])

app.factory('getCities', ['$http', function($http) {
  return $http.get('data/cityList.json')
    .success(function(data) {
      return data;
    })
    .error(function(err) {
      return err;
    })
}])

/* weather ----------------------------------------------------------------------------*/
app.controller('Weather', [
  '$scope', '$routeParams', 'getWeather', 'dayBreakdown', 'dayReport',
  function($scope, $routeParams, getWeather, dayBreakdown, dayReport) {

    getWeather($routeParams.id).then(function(result) {

      $scope.get = result.data;
      $scope.days = $scope.get.list;
      $scope.title = dayBreakdown($scope.days);

      $scope.report = dayReport(result.data);

    }, function(err) {
      console.log(err);
    });
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

app.factory('dayBreakdown', ['$filter', function($filter) {
  return function(dayArr) {
    out = [];
    today = new Date();
    title = $filter('date')(today,'EEE');
    titleFix = title;
    forecasts = dayArr.length;
    for (i=0;i<forecasts;i++) {
      timeStamp = dayArr[i].dt * 1000;
      thisTitle = $filter('date')(timeStamp,'EEE');
      if (title == thisTitle) {
        out[i] = false;
      } else {
        out[i] = title = thisTitle;
        //thisTitle = title;
      }
    }
    out[0] = 'Today'; //overwriting the first blank string;
    return out;
  }
}])

//formats the weather report into a day by day breakdown
app.factory('dayReport', ['$filter', function($filter) {
  return function(dataIn) {
    //first lets knock out the easy parts

    dataOut = new Array();
    dataOut.name = dataIn.name;
  //dataOut.today = $filter('date')(today,'EEE');
    dayArr = daySlice(dataIn.list);

    return dataOut;
  }
}])

//splits the reports into 6 hour chunks. accounts for the first/last being a little longer/shorter.
function daySlice(reports) {
  firstDay = reports[0].dt_txt.substring(8,10);
  dateMatch = true
  i = 0
  while (dateMatch === true) {
    i++
    date = reports[i].dt_txt.substring(8,10);
    dateMatch = (date === firstDay);
  }
  firstDayChunk = i;

  dayArr = new Array();
  dayArr.push(reports.splice(0,firstDayChunk));
  while (reports.length) {
    dayArr.push(reports.splice(0,4));
  }
  console.log(dayArr);
  return dayArr;
};

/*TO DO -------------------------------

- group "until 6am/pm" instead of by day, to sort day/night groups

- array map(s) of dayArr (line 100) to combine temp/rain/wind/etc. find max/min?

- wind chill?

- some simple text for day/night summary. "sunny but cold" "wet + windy" etc


*/
/* page nav ---------------------------------------------------------------------------*/
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


/*---------------------------------------------------------------------------------------



NYI lat/long map. the curved lat/long coordinates dont match a flat map, so its close but messy.
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
})*/
