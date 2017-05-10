/**
 * Created by doga on 18/11/2016.
 */
var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var appSettings = require("application-settings");

function User(info) {
    info = info || {};
    var viewModel = new Observable({
        username: info.username || "",
        password: info.password || ""
    });
    viewModel.login = function () {
        return fetchModule.fetch(config.signinUrl + "/login", {
                method: "GET",
                headers: {
                    'Authorize': 'basic ' + viewModel.get("username") + ":" + viewModel.get("password"),
                    "Content-Type": "application/json"

                }
            })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
               console.log(data)
                user.token = data.token;
                if (user.token === null) {
                    throw Error(data);
                }
                user.username = viewModel.get("username")
                appSettings.setString("username", viewModel.get("username"));
                appSettings.setString("password", viewModel.get("password"));
                console.log(appSettings.getString("username"))
            });
    };
    viewModel.Autologin = function () {
        return fetchModule.fetch(config.signinUrl + "/login", {
                method: "GET",
                headers: {
                    'Authorize': 'basic ' + appSettings.getString("username") + ":" + appSettings.getString("password"),
                    "Content-Type": "application/json"
                }
            })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                user.token = data.token;
                if (user.token === null) {
                    throw Error(data);
                }
                user.username = appSettings.getString("username")
            });
    };
    viewModel.facebooklogin = function () {
        return fetchModule.fetch(config.signinUrl + "/login", {
                method: "GET",
                headers: {
                    'Authorize': 'basic ' + appSettings.getString("username") + ":" + appSettings.getString("password"),
                    "Content-Type": "application/json"
                }
            })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                user.token = data.token;
                if (user.token === null) {
                    throw Error(data);
                }
                user.username = appSettings.getString("username")
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