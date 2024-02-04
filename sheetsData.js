const fs = require("fs");
require("dotenv").config();
const path = require("path");
const process = require("process");
const { google } = require("googleapis");

const SCOPES = [
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const KEYFILEPATH = path.join(process.cwd(), "credentials.json");

try {
    fs.readFileSync(KEYFILEPATH);
} catch (err) {
    fs.writeFileSync(KEYFILEPATH, process.env.CREDENTIALS);
}

const authClient = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

async function getFileID(query, authClient) {
    const driveService = google.drive({ version: "v3", auth: authClient });
    const response = await driveService.files.list({
        q: query,
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
    });
    const files = response.data.files;
    if (files.length === 0) {
        console.error("No files found.");
        return;
    }

    return files[0].id;
}

async function getSheetsData(id, range, authClient) {
    const sheetsService = google.sheets({ version: "v4", auth: authClient });
    const response = await sheetsService.spreadsheets.values.get({
        spreadsheetId: id,
        range: range,
    });

    return response.data.values;
}

async function getCurrentAttendenceSheetData() {
    const sheet_id = await getFileID(
        "'19HMWnXdKimqY96mCb_CA4VYFD76PR3al' in parents and name contains '[current]'",
        authClient
    );
    const sheet_data = await getSheetsData(sheet_id, "M1:O50", authClient);

    return sheet_data;
}

async function getHonourRollSheetData() {
    const sheet_id = "1RWH0c4SvYgzmrjsWoCiNv5hA23vbL8f4idbVD6ORHzM";
    const sheet_data = await getSheetsData(sheet_id, "A1:D30", authClient);

    return sheet_data;
}

module.exports = {
    getCurrentAttendenceSheetData,
    getHonourRollSheetData,
};
