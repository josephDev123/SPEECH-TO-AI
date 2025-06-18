import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIResponseProps {
  response: string;
  isLoading: boolean;
  className?: string;
}

const AIResponse: React.FC<AIResponseProps> = ({
  response,
  isLoading,
  className,
}) => {
  return (
    <Card
      className={cn(
        "w-full dark:bg-black dark:text-white/80 text-black",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl">AI Response</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-muted-foreground">Thinking...</span>
            </div>
          ) : response ? (
            <pre className="text-sm text-wrap">{response}</pre>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p>Ask a question to get an AI response</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AIResponse;
