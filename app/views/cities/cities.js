var listViewModule = require("ui/list-view"),
    observableArray = require("data/observable-array"),
    labelModule = require("ui/label");

var listView = new listViewModule.ListView();


var colors = ["red", "green", "blue"];
listView.items = colors;
listView.on(listViewModule.ListView.itemLoadingEvent, function (args: listViewModule.ItemEventData) {
    if (!args.view) {
        // Create label if it is not already created.
        args.view = new labelModule.Label();
    }
    (<labelModule.Label>args.view).text = colors[args.index];

});
