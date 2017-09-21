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
        rePassword:info.rePassword || ""
    });
    viewModel.register = function () {
        if ((viewModel.get("username") === undefined)||(viewModel.get("rePassword") === undefined)){
            //TODO when password and username is empty application crashes
            console.log("Password error");
            throw Error("Password problem");
        }
        if (viewModel.get("password") !== viewModel.get("rePassword")){
        //TODO Check if its working
        console.log("Password error");
        throw Error("Password problem");
      }
        return fetchModule.fetch(config.signupUrl + "/signup", {
                method: "GET",
                headers: {
                    'Username': viewModel.get("username"),
                    'Password': viewModel.get("password")
                }
            })
            .then(handleErrors)
            .then(function (response) {
          //    console.log("**********"+JSON.stringify(response))
            returnInfo = JSON.parse(response._bodyInit)
                return returnInfo.token;
            })
            .then(function (data) {
              global.token = data
              console.log(data)
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
