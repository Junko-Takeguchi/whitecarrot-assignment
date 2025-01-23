import express from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
import cors from "cors";

dotenv.config({});

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly'
];

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

app.get("/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });
    res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        });

        // Pass tokens to the client via cookies or query params
        res.redirect(`https://whitecarrot-assignment-phi.vercel.app/?authenticated=true`);
    } catch (error) {
        console.error("Error during Google OAuth redirect:", error);
        res.status(500).send("Authentication failed.");
    }
});


app.get("/google/calendar/list", async (req, res) => {
    try {
        const response = await calendar.events.list({
            calendarId: 'primary', // 'primary' refers to the user's main calendar
            timeMin: new Date().toISOString(), // Get events starting from now
            // maxResults: 10, // Limit the number of results
            singleEvents: true, // Expand recurring events into single instances
            orderBy: "startTime", // Order by start time
        });

        const events = response.data.items;
        if (!events || events.length === 0) {
            res.send("No upcoming events found.");
        } else {
            res.json(events); // Respond with the list of events
        }
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        res.status(500).send("Failed to fetch calendar events.");
    }
});

app.listen(port, () => {
    console.log("Server started on port ", port);
});
