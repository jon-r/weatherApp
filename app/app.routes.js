/* page nav ---------------------------------------------------------------------------*/
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'home',
    templateUrl: 'app/components/home/homeView.html'
  })
  .when('/city/:id', {
  	controller: 'weather',
    templateUrl: 'app/components/weather/weatherView.html'
  })
  .otherwise({
    redirectTo:  '/'
  });
});
