var app = angular.module('Lead');

app.controller('LeadController', function($scope,$window,$filter,LeadService) {
   loadalllead();
  //localStorage.removeItem('page_id');

   $scope.page_id= localStorage.getItem('page_id');
   if($scope.page_id==null || $scope.page_id == undefined || $scope.page_id==0){
       $scope.newpage=0;
       $scope.prevbut=false;
   }else{
      $scope.newpage=$scope.page_id;
       $scope.prevbut=true; 
   }
//   alert($scope.newpage);
   
   loadallsourse();
     loadallstatus();
     loadallcourse();
     loadalluser();
     
   $scope.lead = {
            'name': '',
            'address':'',
            'mobile':'',
            'phone':'',
            'lead_source':'',
            'email':'',
            'product':'',
            'university':'',
            'teamleader_id':'',
            'telecaller_id':'',
            'lead.lead_status':'',
            
            
            
        }
        
        $scope.addleaddiv = function(){
        $("#tab-8").show();
        $("#addc").addClass("bg-green1-dark");
         $("#addc").addClass("color-white");
         
         $("#updatec").removeClass("bg-green1-dark");
         $("#updatec").removeClass("color-white");
        $("#tab-9").hide();
        
    }
    
    $scope.updateleaddiv = function(){
        $("#tab-8").hide();
        $("#addc").removeClass("bg-green1-dark");
         $("#addc").removeClass("color-white");
         
         $("#updatec").addClass("bg-green1-dark");
         $("#updatec").addClass("color-white");
        $("#tab-9").show();
    }
   
   function loadalllead(){
       
       $scope.page_id= localStorage.getItem('page_id');
   if($scope.page_id==null || $scope.page_id == undefined){
       $scope.newpage=0;
       $scope.prevbut=false;
   }else{
      $scope.newpage=$scope.page_id;
       $scope.prevbut=true; 
   }
   
       $scope.newpage_new=parseInt($scope.newpage) + parseInt(1) ;
//       alert($scope.newpage_new);
       LeadService.loadalllead($scope.newpage_new * 10).then(function(response){
             $scope.leadlist = response.data.data;
             
         }, function(error) {});
   }
    
   
   $scope.leaddetails = function(id){
       
       localStorage.setItem("lead_id", id);
       $window.location.href='#!leaddetails';
       
   }
   
   $scope.nextpage = function(){
//       alert("working");
       $scope.newpage_new=parseInt($scope.newpage) + parseInt(1) ;
       localStorage.setItem("page_id", $scope.newpage_new);
       $window.location.reload();
//       alert($scope.newpage_new);
//        LeadService.loadalllead_nextlead($scope.newpage_new * 10).then(function(response){
//             $scope.leadlist = response.data.data;
//             localStorage.setItem("page_id", $scope.newpage_new);
//            
//         }, function(error) {});
   }
   
   $scope.prevbutton = function(){
        $scope.newpage_new=parseInt($scope.newpage) - parseInt(1) ;
        localStorage.setItem("page_id", $scope.newpage_new);
       $window.location.reload();
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
                HomeService.synclead(remarkdata).then(function(response){ 

                    localStorage.removeItem('remarksdata');
            
                    }, function(error) {});
                 
            }, function() {
                 // Error
            });
        }
        
        
          function loadallsourse(){
         LeadService.loadleadsourse().then(function(response){
             $scope.sourselist = response.data.data;
             
         }, function(error) {});
        
    }
    
    function loadallstatus(){
         LeadService.loadleadstatus().then(function(response){
             $scope.statuslist = response.data.data;
             
         }, function(error) {});
        
    }
    
    function loadallcourse(){
        
        LeadService.loadleadcourse().then(function(response){
             $scope.courselist = response.data.data;
             
         }, function(error) {});
        
    }
    
    function loadalluser(){
        LeadService.loadleaduser().then(function(response){
             $scope.userlist = response.data.data;
             
         }, function(error) {});
        
    }
});


app.filter('toDate', function() {
    return function(items) {
      return new Date(items);
    };
  });


