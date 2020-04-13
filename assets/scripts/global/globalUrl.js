var app = angular.module('Lead');
app.factory('globalUrl', function () {
    return {
        baseurl: 'http://localhost:3000/',
        // imageurl: 'http://dev.yachtit.nl/yatchapi/Images/'
    };
});