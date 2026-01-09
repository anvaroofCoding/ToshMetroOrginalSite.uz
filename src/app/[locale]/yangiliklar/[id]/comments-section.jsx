"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Pagination,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { MessageCircle, Send, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function CommentsSection({ newsId }) {
  const t = useTranslations("menu");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const commentsPerPage = 5;
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://abbos.uzmetro.uz/api/comments/?news_id=${newsId}`,
      );
      const data = await res.json();
      setComments(data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.author || !newComment.content) return;
    setSubmitting(true);
    try {
      const res = await fetch(`https://abbos.uzmetro.uz/api/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ news: +newsId, ...newComment }),
      });
      const data = await res.json();
      setComments([data, ...comments]);
      setNewComment({ author: "", content: "" });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${hh}:${mm} ${dd}-${MM}-${yyyy}`;
  };

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  return (
    <div className="mt-10">
      <Card className="bg-white rounded-2xl shadow-lg border border-blue-100">
        <CardHeader className="flex items-center gap-2 text-blue-700 font-semibold text-lg">
          <MessageCircle /> {t("two_hundred_forty_four")} ({comments.length})
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder={t("two_hundred_forty_five")}
              variant="bordered"
              value={newComment.author}
              className="border-blue-700"
              onChange={(e) =>
                setNewComment({ ...newComment, author: e.target.value })
              }
            />
            <Textarea
              placeholder={t("two_hundred_forty_six")}
              variant="bordered"
              value={newComment.content}
              minRows={3}
              className="border-blue-700"
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
            />
            <Button
              color="primary"
              type="submit"
              isLoading={submitting}
              startContent={<Send size={16} />}
              className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800"
            >
              {t("two_hundred_forty_seven")}
            </Button>
          </form>

          {/* Comment list */}
          {loading ? (
            <div className="flex justify-center py-6">
              <Spinner color="primary" label={t("two_hundred_forty_nine")} />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500">
              {t("two_hundred_forty_eight")}
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {currentComments.map((c) => (
                  <Card
                    key={c.id}
                    className="p-4 bg-white/80 shadow-sm border border-blue-100 rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <User className="text-blue-700 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-blue-700 text-sm">
                            {c.author}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(c.timestamp)}
                          </p>
                        </div>
                        <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                          {c.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    color="primary"
                    showControls
                    size="sm"
                  />
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
