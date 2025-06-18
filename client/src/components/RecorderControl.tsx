import React, { useContext } from "react";
import { Mic, Square, Loader2, ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ThemeContext } from "@/context/Theme";

interface RecorderControlProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  transcript: string;
  className?: string;
}

const RecorderControl: React.FC<RecorderControlProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  transcript,
  className,
}) => {
  const { theme } = useContext(ThemeContext);
  const copyToClipboard = () => {
    if (!transcript) {
      toast("Nothing to copy", {
        description: "Record something first!",
      });
      return;
    }

    navigator.clipboard.writeText(transcript).then(
      () => {
        toast("Copied to clipboard", {
          description: "Text has been copied successfully!",
        });
      },
      (err) => {
        toast("Failed to copy", {
          description: "Could not copy text to clipboard",
        });
        console.error("Could not copy text: ", err);
      }
    );
  };
  const themeClass =
    theme === "light"
      ? "bg-gradient-to-b from-gray-50 to-gray-100"
      : "bg-gray-900 text-white";
  return (
    <div className={cn("flex items-center", className)}>
      {isRecording ? (
        <>
          <Badge variant="destructive" className="animate-pulse mr-2">
            Recording
          </Badge>
          <Button
            variant="destructive"
            size="icon"
            onClick={onStopRecording}
            aria-label="Stop recording"
            className="h-12 w-12 rounded-full"
          >
            <Square className="h-6 w-6" />
          </Button>
        </>
      ) : (
        <>
          <Badge variant="outline" className={`mr-2  ${themeClass}`}>
            Ready
          </Badge>
          <Button
            variant="default"
            size="icon"
            onClick={onStartRecording}
            aria-label="Start recording"
            className="lg:size-10 size-8 rounded-full bg-blue-500 hover:bg-blue-600"
          >
            <Mic className="h-6 w-6" />
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        disabled={!transcript}
        aria-label="Copy to clipboard"
        className={`ml-2 ${themeClass} lg:size-10 size-8`}
      >
        <ClipboardCopy className="h-4 w-4" />
      </Button>

      {isRecording && (
        <div className="flex items-center ml-2 gap-1">
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          <span className="text-sm text-muted-foreground">Listening...</span>
        </div>
      )}
    </div>
  );
};

export default RecorderControl;
