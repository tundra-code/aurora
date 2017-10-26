const { Menu, app } = require("electron");
const defaultMenu = require("./default");

module.exports = () => {
  const template = defaultMenu(app);

  template.push({
    label: "Mutations",
    submenu: [
      {
        label: "Add New Mutation"
      }
    ]
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
