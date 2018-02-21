import defaultMenu from "./default";
import main from "../../common/electron-events/main";

module.exports = (app, Menu, MainWindow) => {
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
