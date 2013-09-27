(function (global) {
    var monitor,
        app = global.app = global.app || {};
    
    document.addEventListener("unload", app.stopMonitor);
    window.addEventListener("beforeunload", app.stopMonitor);
    
    app.stopMonitor = function(e){      
        //Stop monitor if running
        console.log("Stopping monitor...");
        if(monitor){
            monitor.stop();
        }
    };
    
    app.startMonitor = function(){
        if (monitor)   
            return;        
        
        try    
        {
            // This application is using EQATEC Analytics    
            // See the documentation at http://www.telerik.com/analytics/resources/documentation    
            // Create the monitor instance using the unique product key for Test App
            
            var settings = _eqatec.createSettings("__YOUR-EQATEC-KEY-HERE__");
            
            settings.version = "1.2.3";
            
            monitor = _eqatec.createMonitor(settings);
            console.log("Monitor created", monitor);
            
            
            // Start the monitor when your application starts    
            monitor.start();
            console.log("Monitor started");
            
        }    
        catch (e)    
        {    
            console.log("EQATEC Analytics exception: " + e.description);    
        }    
    };
  
    app.logViewStart = function(e){
     	//Log the view show to our app analytics
        
        var currentView = "View."+ e.view.title;
        console.log("Log feature", currentView);
        
        monitor.trackFeature(currentView);
        
        //Start view timer
        monitor.trackFeatureStart(currentView);
    };

    app.logViewEnd = function(e){
        var currentView = "View."+ e.view.title;
        console.log("End timing for feature", currentView);
        
        monitor.trackFeatureStop(currentView);
    }
    
})(window);