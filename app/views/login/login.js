var frameModule = require("ui/frame"),
    UserViewModel = require("../../shared/view-models/login"),
    dialogsModule = require("ui/dialogs"),
    appSettings = require("application-settings");

var user = new UserViewModel();

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};
exports.loaded = function (args) {
    var page = args.object;
    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }

    //tns run ios | tns run android her defasında yeniden build ettiği için eski değerler siliniyor tns livesync ios --emulator --watch modunda aşağısı çalışıyor
    if (appSettings.getString("username") && appSettings.getString("password")) {
        user.Autologin()
            .catch(function () {
                appSettings.remove("username");
                dialogsModule.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
                return Promise.reject();
            })
            .then(function () {
                frameModule.topmost().navigate("views/currentCity/currentCity");
            });


    }

    page.bindingContext = user;
};

// XML'deki çift parantez datayı aynı isim ile argüman olarak bağlıyor ve yukarıdaki binding model ile user'ı buraya bağlıyorsun.

exports.signIn = function () {
    user.login()
        .catch(function () {
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function () {
            frameModule.topmost().navigate("views/currentCity/currentCity");
        });
};
