import mainEvents from "../../lib/electron-events/main";
import { installNewMutation } from "../../lib/io";

function setupEvents() {
  // Listen for installation requests
  mainEvents.onInstallMutation((event, pkg) => {
    installNewMutation(pkg.name)
      .then(() => {
        mainEvents.sendInstallMutationReply(event, pkg);
      })
      .catch(console.error);
  });
}

export default setupEvents;
