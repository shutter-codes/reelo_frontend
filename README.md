# Music Player Web App - React Frontend

This is the frontend of a music player web application built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to sign up, sign in, browse a library of songs, create and manage playlists, play songs, and resume playback from where they left off.

## Features

- **User Authentication:**
  - Users can sign up using email and password.
  - Users can sign in with existing credentials.

- **Songs Library:**
  - Display a list of songs available in the library.
  - Users can select songs from this library.

- **Playlist Management:**
  - Users can create playlists.
  - Users can add songs to their playlists.
  - Users can view the list of playlists they have created.

- **Music Player:**
  - Users can play songs.
  - Users can resume songs from where they left off after logging back in.


### Description of Main Files and Directories:

- **`src/components/auth/`**:
  - `Login.js`: Component for user login.
  - `Register.js`: Component for user registration.
  
- **`src/components/common/`**:
  - `FlashMessage.js`: Component to display flash messages for user notifications.
  - `Navbar.js`: The navigation bar of the application.

- **`src/components/playerex/`**:
  - `Player.js`: Component for playing songs.
  - `PlayerContainer.js`: Container component for the player functionality.
  
- **`src/components/playlist/`**:
  - `PlaylistDetails.js`: Displays details of a selected playlist.
  - `PlaylistItem.js`: Displays individual playlist items.
  - `PlaylistPopup.js`: Popup component for creating new playlists.
  
- **`src/components/songs/`**:
  - `AllSongs.js`: Displays a list of all available songs in the library.
  - `SongItem.js`: Displays individual song items with options to add to playlists or play.

- **`src/services/api.js`**:
  - Contains API calls for interacting with the backend.

- **`src/App.js`**:
  - Main component that sets up routes and renders the application.

- **`src/index.js`**:
  - Entry point for the React application. Renders the App component.

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/music-player-frontend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd music-player-frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage

- **Sign Up:** Create a new account using your email and password.
- **Sign In:** Log in with your existing credentials.
- **Browse Songs:** View the list of available songs in the library.
- **Create Playlists:** Create new playlists and add songs to them.
- **Play Songs:** Select a song to play. The player will allow you to pause, resume, and seek.
- **Resume Playback:** After logging out and logging back in, you can resume playback from where you left off.

## deployed on Vercel