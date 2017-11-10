import mainEvents from "../../lib/electron-events/main";
import { installNewMutation } from "../../lib/io";

function setupEvents() {
  // Listen for installation requests
  mainEvents.onInstallMutation((event, name) => {
    installNewMutation(name).then(() => {
      mainEvents.sendInstallMutationReply(event, name);
    });
  });
}

export default setupEvents;
