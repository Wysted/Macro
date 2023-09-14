import { app, ipcMain, dialog } from "electron";
import { uIOhook } from "uiohook-napi";
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");

const {
    mouse,
    straightTo,
    Point,
    keyboard,
    Button,
    Key,
} = require("@nut-tree/nut-js");

const delay = async (ms) => new Promise((res) => setTimeout(res, ms));

const startRecord = async (data) => {
    const datos = JSON.parse(data);
    mouse.config.mouseSpeed = 500;
    for (let i = 0; i < datos.length; i++) {
        const d = datos[i];
        if (d.x && d.y) {
            await mouse.move(straightTo(new Point(d.x, d.y)));
            await mouse.click(Button.LEFT);
        } else if (d.type === "delay") {
            await delay(d.delay);
        } else {
            await keyboard.type(d.text);
            await keyboard.pressKey(Key.Enter);
            await keyboard.releaseKey(Key.Enter);
        }
    }
};

export default function ipcListener() {
    ipcMain.on("mouse-click", async (event, arg) => {
        const mouseDownHandler = (e) => {
            event.sender.send("mouse-position", e);
            uIOhook.removeListener("mousedown", mouseDownHandler);
            uIOhook.stop();
        };

        uIOhook.start();
        uIOhook.on("mousedown", mouseDownHandler);
    });

    ipcMain.on("crear-archivo", (event, { contenido }) => {
        const documentsDirectory = app.getPath("documents");
        const folderPath = path.join(documentsDirectory, "macro");

        // Comprueba si el directorio existe, si no, lo crea
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        const nombreArchivo = randomstring.generate(7) + ".txt";
        const filePath = path.join(folderPath, nombreArchivo);
        const data = JSON.stringify(contenido);

        // Comprueba si el archivo existe antes de intentar escribir en él
        if (fs.existsSync(filePath)) {
            console.log("El archivo ya existe");
        } else {
            fs.writeFileSync(filePath, data, "utf-8");
        }
    });
    ipcMain.on("start", (event) => {
        dialog
            .showOpenDialog({
                properties: ["openFile"],
            })
            .then((result) => {
                fs.readFile(result.filePaths[0], "utf8", function (err, data) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    startRecord(data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
