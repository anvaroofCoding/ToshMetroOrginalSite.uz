"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Textarea from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageCircle,
  MoreVertical,
  Edit,
  Trash2,
  Send,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CommentsSection({ newsId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newComment, setNewComment] = useState({
    author_uz: "",
    content_uz: "",
  });
  const [editContent, setEditContent] = useState("");

  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://metro-site.onrender.com/api/comments/uz/?news_id=${newsId}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Izohlarni yuklab bo'lmadi");
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: "Xatolik",
        description: "Izohlarni yuklab bo'lmadi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.content_uz.trim() || !newComment.author_uz.trim()) {
      toast({
        title: "Xatolik",
        description: "Ism va izoh matnini to'ldiring",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(
        `https://metro-site.onrender.com/api/comments/uz/?news_id=${newsId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            news: Number.parseInt(newsId),
            author_uz: newComment.author_uz,
            content_uz: newComment.content_uz,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Izoh qo'shib bo'lmadi");
      }

      const newCommentData = await response.json();
      setComments((prev) => [newCommentData, ...prev]);
      setNewComment({ author_uz: "", content_uz: "" });

      toast({
        title: "Muvaffaqiyat",
        description: "Izoh muvaffaqiyatli qo'shildi",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Xatolik",
        description: "Izoh qo'shishda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editContent.trim()) {
      toast({
        title: "Xatolik",
        description: "Izoh matnini kiriting",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://metro-site.onrender.com/api/comments/uz/${commentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content_uz: editContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Izohni tahrirlash bo'lmadi");
      }

      const updatedComment = await response.json();
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, ...updatedComment } : comment
        )
      );

      setEditingId(null);
      setEditContent("");

      toast({
        title: "Muvaffaqiyat",
        description: "Izoh muvaffaqiyatli tahrirlandi",
      });
    } catch (error) {
      console.error("Error editing comment:", error);
      toast({
        title: "Xatolik",
        description: "Izohni tahrirlashda xatolik yuz berdi",
        variant: "destructive",
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Haqiqatan ham bu izohni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://metro-site.onrender.com/api/comments/uz/?news_id=${newsId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Izohni o'chirib bo'lmadi");
      }

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));

      toast({
        title: "Muvaffaqiyat",
        description: "Izoh muvaffaqiyatli o'chirildi",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Xatolik",
        description: "Izohni o'chirishda xatolik yuz berdi",
        variant: "destructive",
      });
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content_uz);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 "
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Izohlar ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Ismingiz *"
                value={newComment.author_uz}
                onChange={(e) =>
                  setNewComment((prev) => ({
                    ...prev,
                    author_uz: e.target.value,
                  }))
                }
                required
              />
            </div>
            <Textarea
              placeholder="Izohingizni yozing... *"
              value={newComment.content_uz}
              onChange={(e) =>
                setNewComment((prev) => ({
                  ...prev,
                  content_uz: e.target.value,
                }))
              }
              rows={4}
              required
            />
            <Button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Yuborilmoqda...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Izoh qo'shish
                </div>
              )}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="ml-2">Izohlar yuklanmoqda...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Hozircha izohlar yo'q. Birinchi bo'lib izoh qoldiring!</p>
              </div>
            ) : (
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author_uz}`}
                          />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {comment.author_uz}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(comment.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {editingId === comment.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditComment(comment.id)}
                          >
                            Saqlash
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            Bekor qilish
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 whitespace-pre-line">
                        {comment.content_uz}
                      </p>
                    )}

                    {comment.timestamp &&
                      comment.updated_at !== comment.timestamp && (
                        <p className="text-xs text-gray-400 mt-2">
                          Tahrirlangan: {formatDate(comment.timestamp)}
                        </p>
                      )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
