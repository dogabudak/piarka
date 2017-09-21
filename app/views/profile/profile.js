var dialogsModule = require("ui/dialogs"),
    frameModule = require("ui/frame"),
    appSettings = require("application-settings"),
    UserViewModel = require("../../shared/view-models/profile"),
    imagepickerModule = require("nativescript-imagepicker"),
    user = new UserViewModel();
var cameraModule = require("nativescript-camera");
cameraModule.requestPermissions();

var image;
var myImage;

exports.loaded = function (args) {
    var page = args.object;
    page.bindingContext = user;
    image  = page.getViewById("pict");
    myImage = page.getViewById("myImage");
    page.bindingContext = {};

    if (appSettings.getString("newProfile") === "No") {
        //TODO databaseden data çek
    }
};

function onSelectGallery(args) {
    var context = imagepickerModule.create({
        mode: "single"
    });
    startSelection(context);
}
function startSelection(context) {1
    context
        .authorize()
        .then(function () {
            return context.present();
        })
        .then(function (selection) {
            image = selection;
            console.log(image)
        }).catch(function (e) {
        console.log(e);
    });
}
exports.onSelectGallery = onSelectGallery;

exports.skipTo = function () {
    frameModule.topmost().navigate("views/currentCity/currentCity");
};

exports.update = function () {
    completeUpdate();
};
exports.tapAction = function() {
    cameraModule.takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true
    }).then(function(picture) {
        console.log("Image Taken !")
        myImage.imageSource = picture;
    });
}
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
