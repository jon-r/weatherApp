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

  Number.prototype.between = function(a,b) {
    return this > a && this < b;
  }

  var setStrings = function(dayArr) {
    //var dayX = dayArr.length;
    return {
      windVal: function() {
        var beaufort = [
           0,    //none
           0.3, //calm
           1.5, //air
           3.3, //light
           5.5, //gentle
           8.0, //moderate
          10.8, //fresh
          13.9, //strong
          17.2, //high
          20.7, //gale
          24.5, //severe
          28.4, //storm
          32.6  //violent
        ];

        var winds = beaufort.length;
        var wind = dayArr.speed;

        for (i=0;i<winds;i++) {
          j = i - 1;
          if (wind.between(beaufort[j], beaufort[i])) {
            return i;
            break;
          }
        }

      },
      overview: function() {
        return dayArr.weather[0].description;
      },
    }
  }





  return function(days) {
    count = days.length;
    out = new Array(count);

    for (x=0;x<count;x++) {
      day = setStrings(days[x]);
      dt = (days[x].dt * 1000);
      var today = $filter('date')(dt,'EEEE');
      out[x] = today + '\'s weather will be ' + day.overview() + '. The wind level is ' + day.windVal();
    }
    console.log(out);
  }
}]);
