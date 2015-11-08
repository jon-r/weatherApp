var app = angular.module("jr_weather", ['ngRoute']);

app.controller('Main', ['$scope', 'getCities', function($scope, getCities) {

  getCities.success(function(data) {
    $scope.cities = data;
  })

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


/*$searchIn.keyup(function () {
  vp = updateViewportDimensions();
  if ( vp.width >= 1030 ) {
    var keyword = $(this).val();
    if (keyword.length >= MIN_LENGTH) {
      $.get(fileSrc.admin, {
        keyword: keyword,
        action: "jr_autocomplete"
      }).done(searchToText);
    } else {
      $searchOut.html('');
    }
  }
});

function searchToText(data) {
  var results = $.parseJSON(data);
  $searchOut.html('');
  $(results).each(function (i) {
    if (i < 4) {
      var link = fileSrc.site + '/products/' + this.filter + '/' + this.url + '/';
      var extra = (this.filter == 'brand') ? '<span> - Brand</span>' : '<span> - Category</span>';
      var output = '<li><a href="' + link + '" >' + this.name + extra + '</a></li>';
      $searchOut.append(output);
    }
  })

  angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];

    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });
};*/
