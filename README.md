Here's a markdown file with instructions to clone the repository and test the project:

---

# Google Calendar Integration Project

## Prerequisites

1. Ensure you have the following installed on your system:
   - **Node.js** (v14 or later)
   - **npm** or **yarn**
   - **Git**

2. Set up a Google Cloud project and enable the **Google Calendar API**. Obtain the following credentials:
   - `CLIENT_ID`
   - `CLIENT_SECRET`
   - `REDIRECT_URL`

3. Add these credentials to a `.env` file in the root directory of the project (see step 4 below for `.env` setup).

---

## Steps to Clone and Set Up the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Junko-Takeguchi/whitecarrot-assignment.git
   cd whitecarrot-assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` File**
   In the root directory of the project, create a `.env` file with the following content:
   ```env
   CLIENT_ID=your-google-client-id
   CLIENT_SECRET=your-google-client-secret
   REDIRECT_URL=http://localhost:3000/google/redirect
   PORT=3000
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:3000`.

---

## Steps to Test the Project

1. **Frontend Setup**
   - Open the React app directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Start the React app:
     ```bash
     npm start
     ```

   The React app will run on `http://localhost:5173`.

2. **Log In Using Test Credentials**
   - Open the browser and go to `http://localhost:5173`.
   - Click on the **Login with Google** button.
   - Log in with the following test credentials:
     - **Email**: `whitecarrotcalendartestuser@gmail.com`
     - **Password**: `1234@5678`
   - Once logged in, you will be redirected back to the app.

3. **View and Filter Events**
   - After logging in, the app will display upcoming calendar events in a table.
   - Use the **date filter** at the top-right corner of the table to view events for a specific date.

---

## Troubleshooting

1. If login fails, ensure that:
   - The Google API credentials in `.env` are correct.
   - The **Google Calendar API** is enabled in the Google Cloud Console.
   - The redirect URL (`http://localhost:3000/google/redirect`) is added to the **Authorized redirect URIs** in the Google Cloud Console.

2. Check the console logs (both backend and frontend) for any error messages.

