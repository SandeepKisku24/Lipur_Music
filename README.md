# LipurMusic

LipurMusic is a music streaming mobile application built with React Native and Expo, offering a seamless audio playback experience. It integrates with a Go-based backend using Firebase for authentication and Backblaze B2 for storage, allowing users to browse and play songs with a modern bottom player interface.

## Features

- **Song Browsing**: Display a list of songs with titles, artists, and cover images.
- **Audio Playback**: Stream songs from Backblaze B2 with play/pause controls.
- **Seek Bar**: Navigate songs using a responsive seek bar.
- **Bottom Player**: Persistent UI with song details, album art, and controls.
- **Loading State**: Visual feedback during song loading.

## Screenshots

| Song List | Bottom Player (Playing) | Bottom Player (Paused) |
|-----------|-------------------------|------------------------|
| ![Song List](https://raw.githubusercontent.com/SandeepKisku24/Lipur_Music/main/screenshots/song_list.jpeg) | ![Player Playing](https://raw.githubusercontent.com/SandeepKisku24/Lipur_Music/main/screenshots/player_playing.jpeg) | ![Player Paused](https://raw.githubusercontent.com/SandeepKisku24/Lipur_Music/main/screenshots/player_paused.jpeg) |

*Note*: Update the screenshot URLs above with the actual raw GitHub URLs after uploading.

## Tech Stack

- **Frontend**:
  - React Native
  - TypeScript
  - Expo SDK (~51)
  - `expo-av` for audio playback
  - `@react-native-community/slider` for seek bar
  - `@expo/vector-icons` for icons
- **Backend**:
  - Go (Golang)
  - Firebase Admin SDK
  - Backblaze B2 for storage
  - REST API for song metadata and streaming
- **Tools**:
  - Git
  - Android Studio/iOS Simulator
  - Visual Studio Code

## Prerequisites

- Node.js (v18+)
- Go (v1.20+)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode
- Firebase project with Admin SDK
- Backblaze B2 account
- Git

## Installation

### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/SandeepKisku24/Lipur_Music.git
   cd lipur_frontend
2. Install dependencies:
   ```bash
   npm install
3. Configure environment:
   create .env file
   
4. Start the app:
   ```bash
   npm start
   
