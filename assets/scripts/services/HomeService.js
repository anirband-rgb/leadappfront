var app = angular.module('Lead');
app.service('HomeService', ['$http', 'globalUrl', function($http, globalUrl) {
    
    
    this.totalalllead_foruser = function(user){
         return $http({
            url: globalUrl.baseurl + 'lead/leadbydateCount/'+user+'',
            method: 'GET'
        })
        
    }
    
    this.totalalllead = function(){
        return $http({
            url: globalUrl.baseurl + 'lead/leadbydateCount/',
            method: 'GET'
        })
    }
    
    this.totalalllead_foruser_new = function(user,start,end){
       return $http({
            url: globalUrl.baseurl + 'lead/leadbydateCount/'+user+'?startDate='+start+'&endDate='+end+'',
            method: 'GET'
        })  
    }
    
    this.totalalllead_new = function(user,start,end){
        return $http({
            url: globalUrl.baseurl + 'lead/leadbydateCount?startDate='+start+'&endDate='+end+'',
            method: 'GET'
        })  
        
    }
    
    this.totalfolowup_usertoday = function(user,today){
       return $http({
            url: globalUrl.baseurl + 'lead/followupByDateCount/'+user+'?startDate='+today+'&endDate='+today+'',
            method: 'GET'
        })  
        
    }

    this.synclead = function(remarks){
        return $http({
            url: globalUrl.baseurl +'lead/syncRemark',
             headers: { 'Content-Type': 'Application/json' },
            method: 'POST',
           data: remarks
        })
        
    }
    
    this.totalfolowup_today = function(user,today){
         return $http({
            url: globalUrl.baseurl + 'lead/followupByDateCount/'+user+'?startDate='+today+'&endDate='+today+'',
            method: 'GET'
        })  
        
    }
    
    this.totaljunk_usre = function(user){
        return $http({
            url: globalUrl.baseurl + 'lead/leadbydateCount/'+user+'?status=6',
            method: 'GET'
        })  
    }
    
    this.totaljunk = function(user){
        return $http({
            url: globalUrl.baseurl + 'lead/leadbydateCount?status=6',
            method: 'GET'
        })  
        
    }
    
    this.loadleadforhome_user = function(user){
        return $http({
            url: globalUrl.baseurl + 'lead/leadbydate/'+user+'?limit=10&offset=1',
            method: 'GET'
        })  
    }
    
    this.loadleadforhome = function(user){
        return $http({
            url: globalUrl.baseurl + 'lead/leadbydate?limit=10&offset=1',
            method: 'GET'
        })  
        
    }
}]);