# Audio Transcriber

A modern web application that converts audio files to text using Spring AI and speech recognition technology. Features a React/TypeScript frontend with a Spring Boot backend.

## Architecture

### Frontend (client)

- React with TypeScript
- Tailwind CSS for styling

### Backend (audio-transcriber)

- Spring Boot
- Spring AI for speech recognition
- RESTful API endpoints

## Features

- 🎵 Upload audio files (MP3, WAV, and other common formats)
- ✨ Modern, responsive UI with drag-and-drop support
- 📝 Real-time transcription processing using Spring AI
- 📋 Copy transcription to clipboard
- ⚡ Fast and efficient processing

## Prerequisites

- Node.js (v16 or higher)
- Java 17 or higher
- Maven
- npm or yarn

## Installation

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the audio-transcriber directory:

```bash
cd audio-transcriber
```

2. Build the project:

```bash
./mvnw clean install
```

3. Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:8080`

## Usage

1. Start both the frontend and backend servers
2. Open the application in your web browser at `http://localhost:5173`
3. Click the upload area or drag and drop an audio file
4. Click "Transcribe Audio" to start the transcription process
5. Wait for the processing to complete
6. View your transcription in the result section
7. Use the "Copy to clipboard" button to copy the transcription

## API Endpoints

### POST /api/transcribe

- Accepts multipart/form-data with an audio file
- Returns the transcribed text

## Development

### Frontend Development

- Located in the `client` directory
- Uses Vite for hot module replacement
- TypeScript for type safety
- Tailwind CSS for styling

### Backend Development

- Located in the `audio-transcriber` directory
- Spring Boot application
- Maven for dependency management
- Spring AI integration for speech recognition
