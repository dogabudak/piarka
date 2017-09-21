var frameModule = require("ui/frame"),
    UserViewModel = require("../../shared/view-models/register"),
    dialogsModule = require("ui/dialogs"),
    appSettings = require("application-settings"),
    user = new UserViewModel();

exports.loaded = function (args) {
    var page = args.object;
    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
  // bu alttaki satırdan emin değiliz
    page.bindingContext = user;
};

// XML'deki çift parantez datayı aynı isim ile argüman olarak bağlıyor ve yukarıdaki binding model ile user'ı buraya bağlıyorsun.
exports.register = function() {
  user.register()
          .catch(function(err) {
            console.log(err);
              dialogsModule.alert({
                      message: "Unfortunately we were unable to create your account. This username is already on use. Please try again with another username",
                      okButtonText: "OK"
                  });
                  return Promise.reject();
          }).then(function() {
                      frameModule.topmost().navigate("views/profile/profile");

          });
        };
