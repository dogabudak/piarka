/**
 * Created by doga on 10/05/2017.
 */
var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var appSettings = require("application-settings");

function User(info) {
    info = info || {};
    var viewModel = new Observable({
        name: info.name || "",
        sirName: info.sirName || "",
        email: info.email || "",
        comment: info.Comment || "",
    });
    if (appSettings.getString("username") || appSettings.getString("gender") ||appSettings.getString("sirName") || appSettings.getString("email") || appSettings.getString("comment")){
    // eğer bunlardan herhangi bir tanesi varsa kendi database'inden çekebilir zaten
    var username = appSettings.getString("username");
    var sirName = appSettings.getString("sirName");
    var gender =  appSettings.getString("gender");
    var email = appSettings.getString("email");
    var comment =  appSettings.getString("comment");
    // TODO ekrana yansıt
    }
      viewModel.update = function () {
        return fetchModule.fetch(config.updateUrl + "/update", {
            method: "GET",
            headers: {
                "info": "name:" + viewModel.get("name") + "sirName:" + viewModel.get("sirName") + "gender:" + viewModel.get("gender") + "email:" + viewModel.get("email") + "comment:" + viewModel.get("comment"),
                "Content-Type": "application/json",
                "token": global.token
            }
        })
            .then(handleErrors)
            .then(function (response) {
              returnInfo = JSON.parse(response._bodyInit)
              return returnInfo.token;
            })
            .then(function (data) {
              global.token = data
              appSettings.setString("username", viewModel.get("username"));
              appSettings.setString("password", viewModel.get("password"));
            });
    };
    return viewModel;
}


function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = User;
