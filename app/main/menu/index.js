const { Menu, app } = require("electron");
const defaultMenu = require("./default");
const createWindow = require("../window.js");

module.exports = () => {
  const template = defaultMenu(app);

  template.push({
    label: "Mutations",
    submenu: [
      {
        label: "Add New Mutation",
        click: () => {
          createWindow("mutations.html");
        }
      }
    ]
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
