var mapbox = require("nativescript-mapbox"),
    frameModule = require("ui/frame");


// drawer için gerekli olan şeyler
exports.toggleDrawer = function() {
    var topmost = frameModule.topmost();
    var page = topmost.currentPage;
    page.getViewById("drawer").toggleDrawerState();
}

exports.navigate = function(args) {
    console.log(args.view.text.toLowerCase(),"hey Arnold")
    var pageName = args.view.text.toLowerCase();
    frameModule.topmost().navigate("views/" + pageName + "/" + pageName);
}





function onMapReady(args) {
    args.map.addMarkers([
        {
            lat: 41.0063886,
            lng: 28.9781057,
            title: 'Area 1',
            subtitle: 'Sultanahmet Mosque',
            onCalloutTap: function () {
                console.log("'Nice location' marker callout tapped");
            },

        }, {
            lat: 41.0086738,
            lng: 28.9800905,
            title: 'Area 2',
            subtitle: 'Ayasofya',
            onCalloutTap: function () {
                console.log("'Nice location' marker callout tapped");
            },

        }, {
            lat: 41.0127296,
            lng: 28.9832964,
            title: 'Area 3',
            subtitle: 'Topkayı Sarayı',
            onCalloutTap: function () {
                console.log("'Nice location' marker callout tapped");
            },

        }, {
            lat: 41.0106807,
            lng: 28.9683792,
            title: 'Area 4',
            subtitle: 'Kapalıçarşı',
            onCalloutTap: function () {
                var navigationEntry = {
                    moduleName: "views/locations/locations",
                    context:"kapalicarsi",
                    animated: true,
                    transition: {
                        name: "slide",
                        duration: 380,
                        curve: "easeIn"
                    }
                };
                frameModule.topmost().navigate(navigationEntry);
                console.log("kapaicarsitapped");
            },

        }, {
            lat: 41.039399,
            lng: 29.0004916,
            title: 'Area 5',
            subtitle: 'Dolmabahçe Sarayı',
            onCalloutTap: function () {
                console.log("'Nice location' marker callout tapped");
            },

        }]
    );
}

exports.onMapReady = onMapReady;
