const express = require("express");
const cors = require("cors");
const {
    getCurrentAttendenceSheetData,
    getHonourRollSheetData,
} = require("./sheetsData.js");
const { sortLeaderboardData, sortHonourRollData } = require("./dataFilter.js");

const port = 3000;
const app = express();
app.use(cors());

app.get("/", (request, response) => response.send("Hello World"));

app.get("/leaderboard-users", async (request, response) => {
    const data = await getCurrentAttendenceSheetData();
    const sortedData = sortLeaderboardData(data);
    response.json(sortedData);
});

app.get("/honour-roll-data", async (request, response) => {
    const data = await getHonourRollSheetData();
    const sortedData = sortHonourRollData(data);
    response.json(sortedData);
});

app.listen(port, () => console.log(`Listening at ${port}`));
