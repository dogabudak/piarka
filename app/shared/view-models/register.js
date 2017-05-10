/**
 * Created by doga on 18/11/2016.
 */
var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;

function User(info) {
    info = info || {};
    var viewModel = new Observable({
        username: info.username || "",
        password: info.password || "",
        rePassword:info.rePassword || "",
    });
    viewModel.register = function () {
        return fetchModule.fetch(config.signupUrl + "/signup", {
                method: "GET",
                headers: {
                    'Username': viewModel.get("username"),
                    'Password': viewModel.get("password")
                }
            })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
              var returnInf = data ;
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
