//Loading the Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('_service-worker.js');
  });
}

$(document).ready(function(){      
    'use strict'	
    
    var pwaVersion = '2.0';
    $('[data-pwa-version]').data('pwa-version', pwaVersion)
    
    
    //Creating Update Modal
    function updateModal(){
        var body = $('body');
        var updateModal = $('#menu-update');
        if(!updateModal.length){
           body.append('<div id="menu-update"></div>');
           setTimeout(function(){
               body.find('#menu-update').load('menu-update.html');   
           },250);
        }
    };
                    
    //Update Version in 5 Seconds After New Version Detected
    function updateButton(){
        var counter = 5;
        var interval = setInterval(function() {
            counter--;
            console.log(counter);
            $('.page-update').html('Updating in ... '+ counter + ' seconds');
            if (counter == 0) {
                $('.page-update').trigger('click');
                clearInterval(interval);
            }
        }, 1000);
    };
        
    //Check Version    
    function check_version(){
        if($('link[data-pwa-version]').length){
            function versionCheck(){        
                var dt = new Date();
                var maniTimeVersion = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                var localVersionNumber = $('link[rel="manifest"]').data('pwa-version');
                var onlineVersionJSON = "_manifest.json?ver=" + maniTimeVersion;
                var onlineVersionNumber = "Connection Offline. Waiting to Reconect";
                $.getJSON(onlineVersionJSON, function(onlineData) {onlineVersionNumber = onlineData.version;}); 
                setTimeout(function(){
                    console.log('Online Version: ' + onlineVersionNumber + '\n' + ' Local Version: ' + localVersionNumber);
                    if(onlineVersionNumber != localVersionNumber && onlineVersionNumber != "Connection Offline. Waiting to Reconect"){
                        updateModal();
                        setTimeout(function(){
                            $('body').find('#menu-update').addClass('menu-active');
                            $('.menu-hider').addClass('menu-active-no-click');    
                            updateButton();
                        },500);
                    }     
                    if(onlineVersionNumber == localVersionNumber){/*No Update Available*/}    
                    if(onlineVersionNumber === "undefined"){/*Error Checking for Updates*/}    
                    if(onlineVersionNumber === "Finding Online Version..."){
                        $('.reloadme').addClass('disabled'); 
                        $('body').find('#menu-update').removeClass('menu-active');
                        $('.menu-hider').removeClass('menu-active-no-click');                
                    }
                },3000);
            }
            //Checking for new version every 60 seconds
            setInterval(function(){versionCheck()}, 57000);
            //Initial Load Version Check in 1 Second After Load
            setTimeout(function(){versionCheck();}, 1000);
        }
    }
    
    //Reload To Clear Button    
    $('body').on('click', '.page-update, .reloadme', function() {
        location.reload();
    });
    
    //Check for Version Change if Online If not Kill the Function
    if (navigator.onLine) {check_version();} else {function check_version(){}}
    
    //Adding Offline Alerts
    var offlineAlerts = $('.offline-message');

    if(!offlineAlerts.length){
        $('body').append('<p class="offline-message bg-red2-dark color-white center-text uppercase ultrabold">No internet connection detected</p> ');
        $('body').append('<p class="online-message bg-green1-dark color-white center-text uppercase ultrabold">You are back online</p>');
    }
    
    //Offline Function Show
    function isOffline(){
        $('.offline-message').addClass('offline-message-active');
        $('.online-message').removeClass('online-message-active');
        setTimeout(function(){$('.offline-message').removeClass('offline-message-active');},2000);
    }
    
    //Online Function Show
    function isOnline(){
        $('.online-message').addClass('online-message-active');
        $('.offline-message').removeClass('offline-message-active');
        setTimeout(function(){$('.online-message').removeClass('online-message-active');},2000);
    }    
    
    $('.simulate-offline').on('click',function(){isOffline();})
    $('.simulate-online').on('click',function(){isOnline();})
        
    //Check if Online / Offline
    function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";
        isOnline();
        console.log( 'Connection: Online');
        $("a").off( "click", returnFalse );
    }
    function updateOfflineStatus(event) {
        isOffline();
        $("a").on( "click", returnFalse );
        console.log( 'Connection: Offline');
    }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOfflineStatus);
    
    //Disable links to other pages if offline.
    //Warning! Enabling offline for iOS can cause issues
    //To allow offline functionality delete the next 7 lines
    function returnFalse(){
        var detectHREF = $(this).attr('href');
        if(detectHREF.match(/.html/)){
            isOffline();
            return false;
        }  
    }   
    
 
}); 
