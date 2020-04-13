var app = angular.module('Lead');

app.controller('HomeController', function($scope,$window,HomeService) {
  

  $scope.curmonth = moment().format('MM');
  $scope.curyear = moment().format('YYYY');
  $scope.curday = moment().format('DD');
  $scope.newstartdate = '01-'+$scope.curmonth+'-'+$scope.curyear;
   $scope.newenddate = '30-'+$scope.curmonth+'-'+$scope.curyear;
   
   $scope.today = $scope.curday+'-'+$scope.curmonth+'-'+$scope.curyear+'';
  
  if(localStorage.remarksdata){
 
      if(window.navigator.onLine){

      var remarkdata=JSON.parse(localStorage.remarksdata)
      HomeService.synclead(remarkdata).then(function(response){ 

        localStorage.removeItem('remarksdata');

        }, function(error) {});
    
      }
    
     }


    
    $scope.user_id= localStorage.getItem('user_id');
     $scope.user_role= localStorage.getItem('user_role');
    
    if($scope.user_role==6){
        HomeService.totalalllead_foruser($scope.user_id).then(function(response){
    $scope.totallead= response.data.count;
 }, function(error) {});
   HomeService.totalalllead_foruser_new($scope.user_id,$scope.newstartdate,$scope.newenddate).then(function(response){
    $scope.totallead_new= response.data.count;
   }, function(error) {});
   
    HomeService.totalfolowup_usertoday($scope.user_id,$scope.today).then(function(response){
    $scope.todayfolowup= response.data.count;
   }, function(error) {});
   
    HomeService.totaljunk_usre($scope.user_id).then(function(response){
    $scope.totaljunk= response.data.count;
   }, function(error) {});
   
    HomeService.loadleadforhome_user($scope.user_id).then(function(response){ 
    $scope.leadlist= response.data.data;
    
    }, function(error) {});
   
 

       
       }else{
           
           
            HomeService.totalalllead($scope.user_id).then(function(response){
    //   $scope.cartlist = response.data;
      $scope.totallead= response.data.count;
 }, function(error) {});
 
 
  HomeService.totalalllead_new($scope.user_id,$scope.newstartdate,$scope.newenddate).then(function(response){
    $scope.totallead_new= response.data.count;
   }, function(error) {});
   
   
    HomeService.totalfolowup_today($scope.user_id,$scope.today).then(function(response){
    $scope.todayfolowup= response.data.count;
   }, function(error) {});
   HomeService.totaljunk($scope.user_id).then(function(response){
    $scope.totaljunk= response.data.count;
   }, function(error) {});
 
 HomeService.loadleadforhome($scope.user_id).then(function(response){ 
    $scope.leadlist= response.data.data;
    }, function(error) {});
 
 
 
           
       }
    
    $scope.leaddetails = function(id){
        localStorage.setItem("lead_id", id);
       $window.location.href='#!leaddetails';
        
    }
    
    
       $scope.callLead=function(number)
     {
//         alert(number);
         localStorage.phoneNumber=number;
        window.plugins.callLog.requestReadPermission(call,function(error){

        })
     }

        function call(){

            window.plugins.CallNumber.callNumber(callLog, function(error){

            }, localStorage.phoneNumber, true);
        }

        function callLog(){
            
            let filters = [{
                "name": "number",
                "value": localStorage.phoneNumber,
                "operator": "==",
            }];
            
            window.plugins.callLog.getCallLog(filters, function(data) {
                 alert(JSON.stringify(data));
            }, function() {
                 // Error
            });
        }
    
});






app.filter('toDate', function() {
    return function(items) {
      return new Date(items);
    };
  });