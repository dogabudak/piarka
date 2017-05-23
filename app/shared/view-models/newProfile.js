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
         sirName: info.sirName || "" ,
         email:info.email || "" ,
         comment:info.Comment ||"" ,
     });
     viewModel.update = function () {
         return fetchModule.fetch(config.updateUrl + "/update", {
                 method: "GET",
                 headers: {
                     "info": "name:" + viewModel.get("name") + "sirName:" + viewModel.get("sirName")+ "gender:" + viewModel.get("gender")+ "email:" + viewModel.get("email")+ "comment:" + viewModel.get("comment"),
                     "Content-Type": "application/json",
                     "Token": "token information"
                 }
             })
             .then(handleErrors)
             .then(function (response) {
                 return response.json();
             })
             .then(function (data) {
                 appSettings.setString("newProfile", "No");
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
