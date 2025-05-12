
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export interface TranscriptItem {
  id: string;
  text: string;
  date: Date;
}

interface SavedTranscriptsProps {
  transcripts: TranscriptItem[];
  onDelete: (id: string) => void;
}

const SavedTranscripts: React.FC<SavedTranscriptsProps> = ({
  transcripts,
  onDelete,
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast("Copied to clipboard");
      },
      (err) => {
        toast("Failed to copy", {
          description: "Could not copy text to clipboard",
        });
        console.error("Could not copy text: ", err);
      }
    );
  };

  if (transcripts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Transcripts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            No saved transcripts yet. Record and save a transcript to see it here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Transcripts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {transcripts.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border p-4 transition-all hover:bg-accent/50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {format(item.date, "MMM d, yyyy 'at' h:mm a")}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(item.text)}
                      title="Copy to clipboard"
                    >
                      <ClipboardCopy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      title="Delete transcript"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <p className="line-clamp-3">{item.text}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SavedTranscripts;
