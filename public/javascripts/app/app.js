var app=angular.module('tabs',['ngRoute','tabs.service'])
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/users',{
        templateUrl:'/partial/users',
        controller:'usersCtrl'
    }).
    when('partial/users/new',{
        templateUrl:'/partial/users/new'
    }).
    otherwise({
        redirectTo:'/users'
    });
}]);

app.controller('usersCtrl',function($scope,users_service){
    users_service.getUsers().success(function(response){
        $scope.users=response;
    },
    function(error){

    })
})