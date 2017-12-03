var mapbox = require("nativescript-mapbox"),
    geolocation = require("nativescript-geolocation"),
    http = require("http"),
    config = require("../../shared/config"),
    frameModule = require("ui/frame");

function tapOnMArkerFunction(tappedMarker) {
    //TODO alttakine benzemesi gerekiyor :*
    /*
     function () {
     var navigationEntry = {
     moduleName: "views/locations/locations",
     context: "kapalicarsi",
     animated: true,
     transition: {
     name: "slide",
     duration: 380,
     curve: "easeIn"
     }
     };
     frameModule.topmost().navigate(navigationEntry);
     console.log("kapaicarsitapped");
     }
     */

    console.log(tappedMarker)
}

// drawer için gerekli olan şeyler
exports.toggleDrawer = function () {
    var topmost = frameModule.topmost();
    var page = topmost.currentPage;
    page.getViewById("drawer").toggleDrawerState();
}

exports.navigate = function (args) {
    var pageName = args.view.text.toLowerCase();
    frameModule.topmost().navigate("views/" + pageName + "/" + pageName);
}


function onMapReady(args) {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
    var location = geolocation.getCurrentLocation({
        desiredAccuracy: 3,
        updateDistance: 10,
        maximumAge: 20000,
        timeout: 20000
    }).then(function (loc) {
        if (loc) {
            return loc
        }

    }, function (e) {
        console.log("Error: " + e.message);
    });


    // TODO uzaktan çekilecek
    var sightLocations = [
         {
            lat: 41.0063886,
            lng: 28.9781057,
            title: 'Area 1',
            subtitle: 'Sultanahmet Mosque',
            onCalloutTap: tapOnMArkerFunction()
        },{
            lat: 41.0086738,
            lng: 28.9800905,
            title: 'Area 2',
            subtitle: 'Ayasofya',
            onCalloutTap: tapOnMArkerFunction()
        },{
            lat: 41.0127296,
            lng: 28.9832964,
            title: 'Area 3',
            subtitle: 'Topkayı Sarayı',
            onCalloutTap: tapOnMArkerFunction()
        },{lat: 41.0106807,
            lng: 28.9683792,
            title: 'Area 4',
            subtitle: 'Kapalıçarşı',
            onCalloutTap: tapOnMArkerFunction()
        },
        {
            lat: 41.039399,
            lng: 29.0004916,
            title: 'Area 5',
            subtitle: 'Dolmabahçe Sarayı',
            onCalloutTap: tapOnMArkerFunction()

        }
    ];

 sightLocations.forEach(function (eachMarker) {
     args.map.addMarkers([eachMarker]);
 });
 //TODO used fake location gero location does not work properly on virtual device
    location.then(function (currentLocation) {
      http.request({
          url: config.updateUrl+"/update",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify({ token: global.token, currentLoc: currentLocation })
      })
        var fakeLocObj = {
            latitude: 41.0043886,
            longitude: 28.9781053
        };
        var fakeLocObj2 = {
            latitude: 41.0106807,
            longitude: 28.9683792
        };

        function getDistance(loc1, loc2) {
            console.log("Distance between loc1 and loc2 is: " + geolocation.distance(loc1, loc2));
        }

        getDistance(fakeLocObj, fakeLocObj2)
        args.map.addMarkers([
            {
                lat: fakeLocObj.latitude,
                lng: fakeLocObj.longitude,
                title: 'Area Null',
                subtitle: 'Current Loc'

            }]
        );
    })
}

exports.onMapReady = onMapReady;
