
# Node Scheduler with Google Calendar Integration

This project is a Node.js application that allows you to create events on Google Calendar, including setting up Google Meet links and sending email invitations to specified attendees.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **Google Calendar Integration**: Create events directly in your Google Calendar.
- **Google Meet Links**: Automatically generate Google Meet links for events.
- **Email Invitations**: Send email invitations to specified attendees.
- **OAuth2 Authentication**: Secure OAuth2 authentication with Google.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed (v14.x or later).
- A Google Cloud project with Calendar API enabled.
- OAuth 2.0 credentials (Client ID, Client Secret).
- A valid Google account.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/node-scheduler.git
    cd node-scheduler
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Configuration

1. **Google Cloud Setup**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project (or select an existing one).
   - Navigate to the **API & Services** > **Credentials**.
   - Create OAuth 2.0 credentials and download the `credentials.json` file.
   - Save the `credentials.json` file in the root of your project directory.

2. **.env File**:
   - Create a `.env` file in the root directory of your project.
   - Add the following environment variables:

    ```plaintext
    PORT=5000
    REFRESH_TOKEN=your-google-refresh-token
    ```

   - **REFRESH_TOKEN**: This is your Google OAuth2 refresh token, which is used to obtain new access tokens.

## Usage

1. **Start the Server**:

    ```bash
    npm start
    ```

   The server will start on the port specified in the `.env` file (default is 5000).

2. **Create an Event**:
   - Send a GET request to `http://localhost:5000/create-event`.
   - The server will create a Google Calendar event, send email invitations to the attendees, and respond with the Google Meet link.

## API Endpoints

### `/create-event`

- **Method**: GET
- **Description**: Creates a Google Calendar event, sends email invitations to specified attendees, and generates a Google Meet link.
- **Response**:
  - `status`: HTTP status code (200 for success).
  - `message`: Success message.
  - `link`: The Google Meet link for the event.

### Example Response:

```json
{
  "status": 200,
  "message": "Event created and invitations sent!",
  "link": "https://meet.google.com/xyz-abc-def"
}
```
