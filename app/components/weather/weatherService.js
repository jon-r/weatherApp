app.factory('getWeather', ['$http', function ($http) {
  return function (countryID) {
    return $http({
      method: 'GET',
      url: 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/'+countryID,
      params: {
        res: 'daily',
        key: '1557995e-17dd-41ff-9ed9-2803b0328aa0',
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

//because metoffice timestamps are baddys
app.filter('isoFix', function() {
  return function(input) {
    input = input || 0;
    return input.replace("Z","");
  }
});

//day string
app.factory('dayStr', ['$filter', function($filter) {
/*
  Number.prototype.between = function(from,to) {
    return this >= from && this < to;
  }

  var setStrings = function(dayArr) {
    //var dayX = dayArr.length;
    return {
      windVal: function() {

        var wind = dayArr.speed;

        if (wind.between(3, 8)) {
          return 1;//'There is a light breeze';
        } else if (wind.between(8,18)) {
          return 2; //'There is a strong wind';
        } else if (wind > 18) {
          return 3; //'There is a gale'
        } else {
          return 0;
        }
      },
      overview: function() {
        return dayArr.weather[0].description;
      },
      tempDayVal: function() {
        var temp = dayArr.temp.day;
        if (temp <= -10) {
          return -1
        } else if (temp.between(-10,30)) {
          return math.round(temp/10);
        } else if (temp > 30) {
          return 3
        }
      },
      tempNightVal: function() {
        var temp = dayArr.temp.night;
        if (temp <= -10) {
          return -1
        } else if (temp.between(-10,30)) {
          return math.round(temp/10);
        } else if (temp > 30) {
          return 3
        }
      },
      rain: function() {
        var rain = (dayArr.rain)/3;
        if
      }
    }
  }

  return function(days) {
    count = days.length;
    out = new Array(count);

    for (x=0;x<count;x++) {
      day = setStrings(days[x]);
      dt = (days[x].dt * 1000);
      var today = $filter('date')(dt,'EEEE');
      out[x] = today + '\'s weather will be ' + day.overview() + '. ' + day.windVal();
    }
    console.log(out);
  }*/

}]);
