var app = angular.module('Lead');

app.controller('LeaddeatilsController', function($scope,$window,$filter,LeadService) {
     $scope.lead_id= localStorage.getItem('lead_id');
     
     initlead();
     loadallsourse();
     loadallstatus();
     loadallcourse();
     loadalluser();
     
     
     var today = new Date();
	var formattedDate = $filter('date')(today, 'yyyy-MM-dd');
	
	$( "#datepicker" ).daterangepicker({ dateFormat: 'yy-mm-dd' ,singleDatePicker: true,});
//	$("#datepicker").daterangepicker("setDate", new Date());
        

    $scope.updateRemark=function(){

            
            var remarkData={}
            remarkData.lead_id=$scope.lead_id;
            remarkData.remark=$scope.remarks;
            remarkData.next_followup_date=moment($scope.followupDate).format('YYYY-MM-DD');
            remarkData.lead_status=$scope.status
            remarkData.followup_time=$scope.time;
            remarkData.updated_by=localStorage.user_id
            console.log("new remark object");
            console.log(remarkData);

            if(localStorage.remarksdata)
            {
                var remarkold=JSON.parse(localStorage.remarksdata)
                console.log("oldremarkdata");
                console.log(remarkold);
                remarkold.push(remarkData);
                console.log('before pushing')
                console.log(remarkData);
                localStorage.remarksdata=JSON.stringify(remarkold);
            }else
            {
                var data=[];
                data.push(remarkData);
                localStorage.remarksdata =JSON.stringify(data);
            }
         

         

            

          

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
     
     function initlead(){
          LeadService.loadleaddetails($scope.lead_id).then(function(response){
              $scope.lead.name = response.data.data[0].contact_person;
              $scope.lead.address = response.data.data[0].address;
               $scope.lead.mobile = response.data.data[0].mobile;
               $scope.lead.phone = response.data.data[0].phone;
               $scope.lead.lead_source =response.data.data[0].lead_source;
               $scope.lead.email =response.data.data[0].email;
               $scope.lead.product =response.data.data[0].product;
               $scope.lead.university =response.data.data[0].university;
               $scope.lead.teamleader_id =response.data.data[0].teamleader_id;
               $scope.lead.telecaller_id =response.data.data[0].telecaller_id;
                $scope.lead.lead_status =response.data.data[0].lead_status;
              
              
          }, function(error) {});

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

     }
    
    
    $scope.updateleaddiv = function(){
        $("#tab-8").hide();
        $("#addc").removeClass("bg-green1-dark");
         $("#addc").removeClass("color-white");
         
         $("#updatec").addClass("bg-green1-dark");
         $("#updatec").addClass("color-white");
        $("#tab-9").show();
    }
    
    $scope.addleaddiv = function(){
        $("#tab-8").show();
        $("#addc").addClass("bg-green1-dark");
         $("#addc").addClass("color-white");
         
         $("#updatec").removeClass("bg-green1-dark");
         $("#updatec").removeClass("color-white");
        $("#tab-9").hide();
        
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

