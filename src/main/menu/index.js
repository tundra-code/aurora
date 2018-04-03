import defaultMenu from "./default";
import main from "../../lib/electron-events/main";
import { dialog } from "electron";

function confirmImport(MainWindow, filePath) {
  dialog.showMessageBox(
    {
      title: "Import Notes",
      message:
        "Are you sure you want to import notes? Doing so will delete current notes.",
      type: "question",
      buttons: ["yes", "no"],
      detail: "Restart immediately to see changes.",
      defaultId: 1,
      cancelId: 1
    },
    responseIndex => {
      if (responseIndex === 0) {
        main.sendImportNotes(MainWindow, filePath);
      }
    }
  );
}

module.exports = (app, Menu, MainWindow) => {
  const template = defaultMenu(app);

  template.push({
    label: "Extensions",
    submenu: [
      {
        label: "Add New Extension",
        click: () => {
          main.sendScreenChange(MainWindow, "store");
        }
      }
    ]
  });
  template.push({
    label: "Notes",
    submenu: [
      {
        label: "Export notes",
        click: () => {
          dialog.showSaveDialog(
            {
              title: "Export notes",
              defaultPath: "mynotes.aurn"
            },
            filename => {
              if (filename !== undefined) {
                main.sendExportNotes(MainWindow, filename);
              }
            }
          );
        }
      },
      {
        label: "Import notes",
        click: () => {
          dialog.showOpenDialog(
            {
              title: "Import notes"
            },
            filename => {
              if (filename !== undefined) {
                confirmImport(MainWindow, filename[0]);
              }
            }
          );
        }
      }
    ]
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
