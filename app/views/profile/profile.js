const dialogsModule = require("ui/dialogs"),
    frameModule = require("ui/frame"),
    fs = require("file-system"),
    platformModule = require("platform"),
    appSettings = require("application-settings"),
    UserViewModel = require("../../shared/view-models/profile"),
    bghttpModule = require("nativescript-background-http"),
    session = bghttpModule.session("image-upload"),
    imagepicker = require("nativescript-imagepicker"),
    user = new UserViewModel();

var imageName;
var imageSrc;
var localPath;

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
    let context = imagepicker.create({mode: "single"});
    startSelection(context);
}

function startSelection(context) {
    console.log(context)
    context.authorize().then(function () {
        return context.present();
    }).then(function (selection) {
        console.log("Selection done:");
        selection.forEach(function (selected) {
            console.log("----------------");
            console.log("uri: " + selected.uri);
            appSettings.setString("profilePicture", selected.uri);
            selected.getImage({aspectRatio: 'fill'}).then((imageSource) => {
                if (platformModule.device.os === "Android") {
                    localPath = selected.android;
                } else {
                    let folder = fs.knownFolders.documents();
                    let path = fs.path.join(folder.path, "Test.png");
                    localPath = path;
                }

                imageSrc.src = imageSource;
            });

        });
        // TODO reminder uriID filan her bişey geliyor , resim ekranda gözüktürmedik (bağlamadık onu oraya) (ayrıca xml'in sınırları pek hoş değil)
        // item = selection;
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


function sendImages(uri, fileUri) {

    imageName = extractImageName(fileUri);

    var request = {
        url: "127.0.0.1:8083",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": imageName
        },
        description: "{ 'uploading': " + imageName + " }"
    };
    var task =  session.uploadFile(fileUri, request);
    task.on("progress", logEvent);
    task.on("error", logEvent);
    task.on("complete", logEvent);

    function logEvent(e) {
        console.log("currentBytes: " + e.currentBytes);
        console.log("totalBytes: " + e.totalBytes);
        console.log("eventName: " + e.eventName);
    }
    return task
}

function extractImageName(fileUri) {
    var pattern = /[^/]*$/;
    var imageName = fileUri.match(pattern);

    return imageName;
}


function completeUpdate() {
    if (localPath) {
        sendImages("Image" + "Test" + ".png", localPath);
    }
    user.update().then(function () {
                    frameModule.topmost().navigate("views/currentCity/currentCity");
                }).catch(function () {
        dialogsModule
            .alert({
                message: "Unfortunately we were unable to create your account. This username is already on use. Please try again with another username",
                okButtonText: "OK"
            });
    });
}
