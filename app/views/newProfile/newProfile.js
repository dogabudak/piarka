var dialogsModule = require("ui/dialogs"),
 frameModule = require("ui/frame"),
 appSettings = require("application-settings"),
 UserViewModel = require("../../shared/view-models/newProfile"),
 imagepickerModule = require("nativescript-imagepicker"),
 user = new UserViewModel();

var list;

exports.loaded = function (args) {
    var page = args.object;
    page.bindingContext = user;
    list = page.getViewById("urls-list");
    console.log(list,"----------------")
    if (appSettings.getString("newProfile") === "No"){
    //TODO databaseden data çek

    }
};

function onSelectSingleTap(args) {
    var context = imagepickerModule.create({
        mode: "single"
    });
    startSelection(context);
}
function startSelection(context) {
    context
        .authorize()
        .then(function() {
            list.items = [];
            return context.present();
        })
        .then(function(selection) {
            selection.forEach(function(selected) {
                console.log("uri: " + selected.uri);
                console.log("fileUri: " + selected.fileUri);
            });
            list.items = selection;
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
