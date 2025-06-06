import { IViewCoreService } from "./altenar";

let message = "Welcome, Please Press Exit to Close the Window";
let actionExit = "$Cookie.ClearPrefix?keyPrefix=ThirdParty_";
export const coreService = new IViewCoreService();

coreService.addListener(display);

function display(data: any) {
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  const lastChangeSequence = data["LastChangeSequence"];
  message = data["SliverMessage"] || message;
  actionExit = data["ActionExit"] || actionExit;

  const cabinetType = data["CabinetType"];
  const displayType = data["DisplayType"];
  setAspectRatio(displayType, cabinetType);

  const dataDiv = document.getElementById("data");
  if (dataDiv) {
    dataDiv.innerHTML = message;
  }
}

function setAspectRatio(displayType: string, cabinetType: string) {
  switch (displayType) {
    case "BOTH":
      document.body.classList.add(cabinetType === "v32" ? "V32" : "DM");
      break;
    case "LVDS":
      document.body.classList.add("LVDS");
      break;
  }
}

export function handleCloseClick() {
  coreService.fireAction(actionExit);
}
