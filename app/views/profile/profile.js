var dialogsModule = require("ui/dialogs"),
    frameModule = require("ui/frame"),
    appSettings = require("application-settings"),
    UserViewModel = require("../../shared/view-models/profile"),
    imagepicker = require("nativescript-imagepicker"),
    user = new UserViewModel();

var image;
var imageSrc;

exports.loaded = function (args) {
    var page = args.object;
    page.bindingContext = user;
    var item = {};
    imageSrc = page.getViewById("imageSrc");

    if (appSettings.getString("newProfile") === "No") {
        //TODO databaseden data çek
    }
};
function onSelectSingleTap(args) {
    let context = imagepicker.create({ mode: "single" });
    startSelection(context);
}

function startSelection(context) {
  console.log(context)
  context.authorize().then(function() {
            return context.present();
          }).then(function(selection) {
            console.log("Selection done:");
            selection.forEach(function(selected) {
                console.log("----------------");
                console.log("uri: " + selected.uri);
                selected.getImage({aspectRatio: 'fill' }).then((imageSource) => {
                        imageSrc.src = imageSource;
                    });

            });
            // TODO reminder uriID filan her bişey geliyor , resim ekranda gözüktürmedik (bağlamadık onu oraya) (ayrıca xml'in sınırları pek hoş değil)
            item = selection;
        }).catch(function (e) {
            console.log(e);
        });
}
exports.onSelectSingleTap = onSelectSingleTap;

exports.skipTo = function () {
    frameModule.topmost().navigate("views/currentCity/currentCity");
};

exports.update = function () {
    completeUpdate();
};

function completeUpdate() {
    user.update()
        .then(function () {
            dialogsModule
                .alert("Your account was successfully updated.")
                .then(function () {
                    frameModule.topmost().navigate("views/currentCity/currentCity");
                });
        }).catch(function () {
        dialogsModule
            .alert({
                message: "Unfortunately we were unable to create your account. This username is already on use. Please try again with another username",
                okButtonText: "OK"
            });
    });
}
