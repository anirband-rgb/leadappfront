var app = angular.module('Lead');
app.service('MainService', ['$http', 'globalUrl', function($http, globalUrl) {

    
    this.login = function(email,password){
        return $http({
            url: globalUrl.baseurl +'auth/login',
             headers: { 'Content-Type': 'Application/json' },
            method: 'POST',
           data: {
        	          emailAddress:email,
                      password:password
                                  
                                     
                                    
               
                    
               
        	                    	
        	                    	
                                  }
        })
        
    }
     
}]);