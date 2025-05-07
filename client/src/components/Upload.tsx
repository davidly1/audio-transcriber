import { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";

const Uploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an audio file first");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscription(response.data);
    } catch (error) {
      console.error("Error transcribing audio", error);
      setError("Failed to transcribe audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Audio Transcriber
        </h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          Upload your audio file and get an instant transcription. Supports MP3,
          WAV, and other common audio formats. The transcription will appear
          below once processing is complete.
        </p>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Audio File
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-40 border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-xl items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-200 hover:shadow-md">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-12 h-12 text-blue-500 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  ></path>
                </svg>
                {file ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm font-medium text-blue-700">
                      {file.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base text-gray-600">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      MP3, WAV, or other audio files
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {error && (
            <div className="mt-3 flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-8 py-3.5 rounded-xl text-white font-semibold shadow-lg transform transition-all duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Transcribe Audio"
            )}
          </button>
        </div>

        {transcription && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Transcription Result
            </h2>
            <div className="bg-white p-5 rounded-lg border border-gray-200 max-h-60 overflow-y-auto shadow-inner">
              <p className="text-gray-700 whitespace-pre-line">
                {transcription}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(transcription);
                }}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  ></path>
                </svg>
                Copy to clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
