const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const app = express();  // Initialize the express app

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Define the scope of access for the Google Calendar API.
const scopes = ['https://www.googleapis.com/auth/calendar'];

// OAuth 2 configuration
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
); 

app.get('/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(url);
});

app.get("/auth/redirect", async (req, res) => {
    try {
        const { tokens } = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(tokens);
        res.send('Authentication successful! Please return to the console.');
    } catch (err) {
        res.status(500).send('Error during authentication');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/create-event', async (req, res) => {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    summary: 'Tech Talk with Pratik',
    location: 'Google Meet',
    description: "Devops Intro.",
    start: {
      dateTime: "2024-03-14T19:30:00+05:30",
      timeZone: 'Asia/Kolkata'
    },
    end: {
      dateTime: "2024-03-14T20:30:00+05:30",
      timeZone: 'Asia/Kolkata'
    },
    conferenceData: {
      createRequest: {
        requestId: 'event-schedule',
      }
    },
    attendees: [
      { email: 'mahallepratik683@gmail.com' },
    ]
  };

  const result = await calendar.events.insert({
    calendarId: 'primary', 
    auth:oauth2Client , 
    conferenceDataVersion: 1 , 
    sendUpdates: 'all', 
    resource: event
  });
  res.send({
    status: 200,
    message: 'Event created',
    link: result.data.hangoutLink
  });

});