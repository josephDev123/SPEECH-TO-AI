import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSpeechRecognition } from "@/utils/useSpeechRecognition";
import RecorderControl from "@/components/RecorderControl";
import TranscriptDisplay from "@/components/TranscriptDisplay";
import AIResponse from "@/components/AIResponse";
import SavedTranscripts, {
  TranscriptItem,
} from "@/components/SavedTranscripts";
import { toast } from "sonner";
import { Save, Send, TicketX } from "lucide-react";
import { getAIResponse } from "@/utils/aiService";
import SwitchTheme from "@/components/SwitchTheme";
import { ThemeContext } from "@/context/Theme";

const Index = () => {
  const {
    clearTranscript,
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
  } = useSpeechRecognition();
  const [savedTranscripts, setSavedTranscripts] = useState<TranscriptItem[]>(
    []
  );
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load saved transcripts from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("savedTranscripts");
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems).map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }));
        setSavedTranscripts(parsedItems);
      } catch (err) {
        console.error("Error parsing saved transcripts:", err);
        localStorage.removeItem("savedTranscripts");
      }
    }
  }, []);

  // Save transcripts to localStorage whenever they change
  useEffect(() => {
    if (savedTranscripts.length > 0) {
      localStorage.setItem(
        "savedTranscripts",
        JSON.stringify(savedTranscripts)
      );
    }
  }, [savedTranscripts]);

  // Show error toast if speech recognition errors
  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);

  const saveTranscript = () => {
    if (!transcript.trim()) {
      toast("Nothing to save", {
        description: "Record something first!",
      });
      return;
    }

    const newTranscript: TranscriptItem = {
      id: uuidv4(),
      text: transcript,
      date: new Date(),
    };

    setSavedTranscripts((prev) => [newTranscript, ...prev]);
    toast("Transcript saved!", {
      description: "Your transcript has been saved successfully.",
    });
  };

  const deleteTranscript = (id: string) => {
    setSavedTranscripts((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (filtered.length === 0) {
        localStorage.removeItem("savedTranscripts");
      }
      return filtered;
    });
    toast("Transcript deleted");
  };

  const askAI = async () => {
    if (!transcript.trim()) {
      toast("Nothing to ask", {
        description: "Record a question first!",
      });
      return;
    }

    setIsLoading(true);
    setAiResponse("");
    try {
      const response = await getAIResponse(transcript, (chunk) => {
        setIsLoading(false);
        setAiResponse((prev) => prev + chunk);
      });

      toast("All AI response received!");
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Something went wrong";

      toast("Failed to get AI response", {
        description: errMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // if (transcript && transcript.includes("send it to AI")) {
  //   askAI();
  //   // clearTranscript();
  //   stopRecording();
  // }

  return (
    <div className={`min-h-screen dark:bg-black dark:text-white text-black `}>
      <div className="flex justify-between p-4">
        <a
          href="https://buymeacoffee.com/josephdev"
          target="_blank"
          rel="noopener noreferrer"
          className="w-28  "
        >
          <img src={"/buymeCoffee.png"} alt="" className="" />
        </a>
        <SwitchTheme />
      </div>
      <div className="container mx-auto px-4 w-full  py-8 md:py-12">
        <header className="mb-8 text-center">
          <h1 className={`text-3xl font-bold tracking-tight md:text-4xl`}>
            Speed(Voice) to AI
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Ask questions with your voice and get AI-powered answers
          </p>
        </header>

        <div className={`grid gap-8 md:grid-cols-2 grid-cols-1`}>
          <div className={`flex flex-col gap-6`}>
            <div className="rounded-lg border sm:p-6 p-2 shadow-sm ">
              <h2 className="mb-4 text-xl font-semibold">
                Voice your Question
              </h2>
              <TranscriptDisplay
                transcript={transcript}
                isRecording={isRecording}
                className="mb-4"
              />
              {/* <p className="text-sm text-green-600 mb-2">
                <b className="text-red-400 font-bold border-b mr-1 border-b-red-300">
                  Notice:
                </b>
                Say <b>'send it to AI'</b> in transcript to get a response
              </p> */}

              <button
                onClick={() => {
                  if (!transcript.trim()) {
                    toast("Nothing to ask", {
                      description: "Record a question first!",
                    });
                    return;
                  }
                  askAI();
                  // clearTranscript();
                  stopRecording();
                }}
                type="button"
                className="rounded-md text-sm bg-green-500 px-2 py-1 text-white hover:bg-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
              <div className="flex items-center justify-between ">
                <RecorderControl
                  isRecording={isRecording}
                  onStartRecording={startRecording}
                  onStopRecording={stopRecording}
                  transcript={transcript}
                />
                <div className="flex gap-2">
                  <Button
                    title="Save Transcript"
                    variant="outline"
                    onClick={saveTranscript}
                    disabled={!transcript}
                    className={`ml-2 lg:size-10 size-8`}
                  >
                    <Save className=" h-4 w-4" />
                  </Button>
                  <Button
                    title="Clear Transcript"
                    variant="outline"
                    onClick={clearTranscript}
                    disabled={!transcript}
                    className={`ml-2 lg:size-10 size-8`}
                  >
                    <TicketX className=" h-2 w-2" />
                  </Button>

                  {/* <Button
                    variant="default"
                    onClick={askAI}
                    disabled={!transcript || isLoading}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Ask AI
                  </Button> */}
                </div>
              </div>
            </div>

            <AIResponse
              response={aiResponse}
              isLoading={isLoading}
              className="md:hidden"
            />
          </div>

          <div className={`flex flex-col gap-6 `}>
            <div className="hidden md:block">
              <AIResponse response={aiResponse} isLoading={isLoading} />
            </div>
            <SavedTranscripts
              transcripts={savedTranscripts}
              onDelete={deleteTranscript}
            />
          </div>
        </div>

        <Separator className="my-8" />

        <footer className="text-center text-sm text-muted-foreground">
          <p>Created by Joseph - Speech to AI App.</p>
          <p className="mt-1">Microphone access required for functionality</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
