const fs = require("fs").promises;
require("dotenv").config();
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const SCOPES = [
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

let authClient = null;

async function createCredentialFiles() {
    try {
        await fs.readFile(TOKEN_PATH);
        await fs.readFile(CREDENTIALS_PATH);
    } catch (err) {
        await fs.writeFile(TOKEN_PATH, process.env.TOKEN);
        await fs.writeFile(CREDENTIALS_PATH, process.env.CREDENTIALS);
    }
}

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    await createCredentialFiles();
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

async function getFileID(query, authClient) {
    const drive = google.drive({ version: "v3", auth: authClient });
    const res = await drive.files.list({
        q: query,
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
    });
    const files = res.data.files;
    if (files.length === 0) {
        console.error("No files found.");
        return;
    }

    return files[0].id;
}

async function getSheetsData(id, range, authClient) {
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: id,
        range: range,
    });

    return response.data.values;
}

async function getCurrentAttendenceSheetData() {
    const client = await authorize();
    const sheet_id = await getFileID(
        "'19HMWnXdKimqY96mCb_CA4VYFD76PR3al' in parents and name contains '[current]'",
        client
    );
    const sheet_data = await getSheetsData(sheet_id, "A1:C50", client);

    return sheet_data;
}

async function getHonourRollSheetData() {
    const client = await authorize();
    const sheet_id = await getFileID("name contains '[honour roll]'", client);
    const sheet_data = await getSheetsData(sheet_id, "A1:D30", client);

    return sheet_data;
}

module.exports = {
    getCurrentAttendenceSheetData,
    getHonourRollSheetData,
};
