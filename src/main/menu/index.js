import defaultMenu from "./default";
import main from "../../lib/electron-events/main";

export default (app, Menu, MainWindow) => {
  const template = defaultMenu(app);

  template.push({
    label: "Mutations",
    submenu: [
      {
        label: "Add New Mutation",
        click: () => {
          main.sendScreenChange(MainWindow, "store");
        }
      }
    ]
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
