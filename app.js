import express from "express";
import {
    getCurrentAttendenceSheetData,
    getHonourRollSheetData,
} from "./sheetsData.js";

const port = "8080";
const app = express();

app.get("/", (request, response) => response.send("Hello World"));

app.listen(port, () => console.log(`Listening at ${port}`));
