var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var UserViewModel = require("../../shared/view-models/newProfile");
var user = new UserViewModel();


exports.loaded = function (args) {
    var page = args.object;
    page.bindingContext = user;
};

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

/*
*/
