var app = angular.module('Lead', ['ngRoute', 'angular.filter','ngCookies']);

if (localStorage.getItem('user_id') == null || localStorage.getItem('user_id') == undefined) {
    window.location.href = "login.html";
}
var today = new Date();

app.controller('SideMenuController', function ($http, $scope,$filter, $window, globalUrl, $location,$cookies,MainService) {

   

var emp = localStorage.getItem('employee');
/*alert(emp);*/


//var ranid= localStorage.getItem('randomcartid');




});

app.config(function ($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: "home.html",
            controller: "HomeController"
        })
         .when('/list', {
            templateUrl: "list.html",
            controller: "HomeController"
        })

          .when('/details', {
            templateUrl: "details.html",
            controller: "HomeController"
        })
          .when('/leaddetails', {
            templateUrl: "leaddetails.html",
            controller: "HomeController"
        })
          .when('/add_lead2',{
            templateUrl: 'add_lead2.html',
            controller: 'HomeController'
        })
          .when('/addlead',{
            templateUrl: 'addlead.html',
            controller: 'LeadController'
          })
           .when('/leaddetails',{
            templateUrl: 'addlead.html',
            controller: 'LeaddeatilsController'
          })
          .when('/leadlist',{
            templateUrl: 'leadlist.html',
            controller: 'LeadController'
          })
          .when('/filter',{
            templateUrl: 'filter.html',
            controller: 'HomeController'
          })
          .when('/student_details',{
            templateUrl: 'student_details.html',
            controller: 'HomeController'
          })
         .when('/lead_report',{
            templateUrl: 'lead_report.html',
            controller: 'HomeController'
          })
          .when('/payment_approval',{
            templateUrl: 'payment_approval.html',
            controller: 'HomeController'
          })       
          .when('/approve_payment',{
            templateUrl: 'approve_payment.html',
            controller: 'HomeController'
          })
          .when('/reject_payment',{
            templateUrl:'reject_payment.html',
            controller:'HomeController'
          })
        
        
        

        .otherwise({
            redirectTo: '/home',
            controller: "HomeController"
        })

});


