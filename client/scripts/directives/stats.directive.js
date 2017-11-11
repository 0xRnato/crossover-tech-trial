var app = angular.module('myApp');
app.directive('myTodo', function () {
  return {
    restrict: 'EA',
    templateUrl: '/views/templates/todo.tpl.html',
    scope: {
      list: '=',
      title: '@'
    }
  };
});
