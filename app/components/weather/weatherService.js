app.factory('getWeather', ['$http', 'dayStr', function ($http) {
  return function (countryID) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
      params: {
        id: countryID,
        cnt: 7,
        appid: '2de143494c0b295cca9337e1e96b00e0',
        units: 'metric'
      }
    })
  }
 }]);

//because the timestamps are in seconds not miliseconds...
app.filter('secToMs', function() {
  return function(input) {
    input = input || 0;
    return (input * 1000);
  }
});

//day string
app.factory('dayStr', ['$filter', function($filter) {
  return function(days) {
    count = days.length;
    out = new Array(count);

    for (i=0;i<count;i++) {
      dt = (days[i].dt * 1000);
      var today = $filter('date')(dt,'EEEE');
      out[i] = today + '\'s weather will be ' + days[i].weather[0].description;
    }
    console.log(out);
  }
}]);
