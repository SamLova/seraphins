angular.module('tabs.service',[])
.factory('users_service',function($http){
    return{
        getUsers:function(){
            return $http.get("http://127.0.0.1:3000/api/users");
        }
    }
})