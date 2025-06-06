var message = "Welcome, Please Press Exit to Close the Window"
var actionExit = "$Cookie.ClearPrefix?keyPrefix=ThirdParty_";
var coreService = new IViewCoreService();
coreService.addListener(display);

String.prototype.escapeHtml =
	function()
	{
		return(this.replace(/&/g,'&amp;')
		           .replace(/>/g,'&gt;')
		           .replace(/</g,'&lt;')
		           .replace(/"/g,'&quot;'));
	};


function display(data)
{
    if (typeof (data) === "string") {
        data = JSON.parse(data);
    }

    lastChangeSequence = data["LastChangeSequence"];
    message = data["SliverMessage"] || message;;
    actionExit = data["ActionExit"] || actionExit;
    var cabinetType = data["CabinetType"];
    var displayType = data["DisplayType"];
    setAspectRatio(displayType, cabinetType);
	document.getElementById("data").innerHTML = message;
}

function setAspectRatio(displayType, cabinetType) {
    switch (displayType) {
        case "BOTH":
            
            if (cabinetType == "v32") {
                document.body.classList.add("V32");
            }
            else {
                document.body.classList.add("DM");
            }
            break;
        case "LVDS":
            document.body.classList.add("LVDS");
            break;
    }
}


function handleCloseClick() {
    coreService.fireAction(actionExit)
}
