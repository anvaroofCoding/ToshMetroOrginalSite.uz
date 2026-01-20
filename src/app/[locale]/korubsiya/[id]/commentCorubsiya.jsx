"use client";
import { Button } from "@/components/ui/button";
import {
  useCorrubsiyaCommentQuery,
  useCorrubsiyaPostMutation,
} from "@/store/services/api";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function CommentCorubsiya({ id }) {
  const { data, isLoading, error } = useCorrubsiyaCommentQuery(id);
  const [postComment, { isLoading: loadingComment }] =
    useCorrubsiyaPostMutation();
  const [inputValue, setInputValue] = useState("");
  const scrollContainer = useRef(null);
  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      await postComment({
        korrupsiya: id,
        content: inputValue,
      });
      setInputValue("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="flex flex-col h-full bg-background border border-border rounded-lg overflow-hidden mt-10">
      <div
        ref={scrollContainer}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {error && (
          <div className="text-center text-destructive text-sm py-4">
            Failed to load comments
          </div>
        )}

        {!isLoading && !error && (!data || data.length === 0) && (
          <div className="text-center text-muted-foreground text-sm py-8">
            No comments yet. Be the first to comment!
          </div>
        )}

        {data?.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col gap-1 animate-in fade-in "
          >
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-sm text-foreground">
                {comment.author}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTime(comment.timestamp)}
              </span>
            </div>
            <div className="bg-muted rounded-lg px-3 py-2 w-fit ">
              <p className="text-sm text-foreground break-words">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-background p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write a comment..."
            disabled={loadingComment}
            className="flex-1 px-3 py-2 rounded-lg bg-muted border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={loadingComment || !inputValue.trim()}
            size="icon"
            className="bg-blue-800 hover:bg-blue-900 text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
