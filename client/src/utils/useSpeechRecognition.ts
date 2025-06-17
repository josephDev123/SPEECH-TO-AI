import * as React from "react";

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  console.log(transcript);
  const [error, setError] = React.useState<string | null>(null);
  const recognitionRef = React.useRef<any>(null);
  const [keepRecording, setKeepRecording] = React.useState(false);
  const transcriptRef = React.useRef("");

  React.useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    setKeepRecording(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          transcriptRef.current += result[0].transcript;
        }
      }

      // console.log(fullTranscript);
      setTranscript(transcriptRef.current);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setError(`Error: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      // Only set recording to false if we didn't intend to keep recording
      // if (recognitionRef.current?.keepRecording !== true) {
      if (keepRecording !== true) {
        setIsRecording(false);
      } else {
        // Restart recording if it ended but we want to keep recording
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startRecording = () => {
    setError(null);
    setIsRecording(true);
    // setTranscript("");

    try {
      !keepRecording && setKeepRecording(true);
      recognitionRef.current.start();
    } catch (err) {
      console.error("Failed to start recording:", err);
      setError("Failed to start recording");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      // recognitionRef.current.keepRecording = false;
      setKeepRecording(false);
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    transcriptRef.current = "";
  };

  return {
    clearTranscript,
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
  };
};
