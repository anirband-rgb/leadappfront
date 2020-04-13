var app = angular.module('Lead', ['ngRoute', 'angular.filter','ngCookies']);

app.controller('loginController', function ($http, $scope,$filter, $window, globalUrl, $location,$cookies,MainService) {
    
    
    $scope.login = function(){
        if(($scope.email == '')||($scope.email === undefined)) {
		$scope.erorsmg = "Please fill correct email";
      }else if(($scope.password == '')||($scope.password === undefined)){
               
          $scope.erorpass= "Please fill correct password!";
          $scope.erorsmg = "";
               }else if(($scope.passcode == '')||($scope.passcode === undefined)){
               
          $scope.erorpasscode= "Please fill correct company passcode!";
                    $scope.erorpass= "";
          $scope.erorsmg = "";
               }else{
                   
                   MainService.login($scope.email,$scope.password).then(function(response){
                       if(response.data=='login error'){
                           $scope.credierro= "Please enter a valid credention";
                       }else{
                           $scope.useridn = response.data.id;
                             $scope.userrole = response.data.role;
                            localStorage.setItem("user_id",  $scope.useridn);
                           localStorage.setItem("user_role",  $scope.userrole);
                 $window.location.href='index.html#!/home';
                       }
                   
                   }, function(error) {});
               }
    }
});