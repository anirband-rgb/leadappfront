var app = angular.module('Lead');
app.service('LeadService', ['$http', 'globalUrl', function($http, globalUrl) {
        
        this.loadleaddetails = function(id){
            return $http({
        url: globalUrl.baseurl + 'lead/leadbydate?leadId='+id,
        method: 'GET'
    })
        }
        
        
        this.loadleadsourse = function(){
            
             return $http({
        url: globalUrl.baseurl + 'lead/source',
        method: 'GET'
    })
            
        }
        
        this.loadleadstatus = function(){
             return $http({
        url: globalUrl.baseurl + 'lead/status',
        method: 'GET'
    })
            
        }
        
        this.loadleadcourse = function(){
            return $http({
        url: globalUrl.baseurl + 'lead/course',
        method: 'GET'
    })
        }
        
        this.loadleaduser = function(){
            
             return $http({
        url: globalUrl.baseurl + 'lead/users',
        method: 'GET'
    })
            
        }
        
        this.loadalllead = function(id){
            
               return $http({
        url: globalUrl.baseurl + 'lead/leadbydate?limit=10&offset='+id+'',
        method: 'GET'
    })
            
        }
        
        this.loadalllead_nextlead = function(id){
              return $http({
        url: globalUrl.baseurl + 'lead/leadbydate?limit=10&offset='+id+'',
        method: 'GET'
    })
        }
        
}]);


