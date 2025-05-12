
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TranscriptDisplayProps {
  transcript: string;
  isRecording: boolean;
  className?: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  isRecording,
  className,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when transcript changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [transcript]);

  return (
    <div className={cn("w-full rounded-lg border bg-card p-1", className)}>
      <ScrollArea ref={scrollAreaRef} className="h-[300px] w-full rounded-md p-4">
        {transcript ? (
          <p className="text-lg leading-relaxed">
            {transcript}
            {isRecording && <span className="ml-1 animate-pulse">|</span>}
          </p>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p>{isRecording ? "Speak now..." : "Your transcript will appear here"}</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TranscriptDisplay;
