import * as React from "react";

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const recognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let fullTranscript = " ";
    recognition.onresult = (event: any) => {
      let interimTranscript = " ";
      // let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          fullTranscript += result[0].transcript;
          // } else {
          //   interimTranscript += result[0].transcript;
        }
      }

      // fullTranscript = interimTranscript + fullTranscript;
      const combinedTranscript = fullTranscript + interimTranscript;
      console.log(fullTranscript);
      setTranscript(fullTranscript);
      // setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setError(`Error: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      // Only set recording to false if we didn't intend to keep recording
      if (recognitionRef.current?.keepRecording !== true) {
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
    setTranscript("");

    try {
      recognitionRef.current.keepRecording = true;
      recognitionRef.current.start();
    } catch (err) {
      console.error("Failed to start recording:", err);
      setError("Failed to start recording");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.keepRecording = false;
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
  };
};
