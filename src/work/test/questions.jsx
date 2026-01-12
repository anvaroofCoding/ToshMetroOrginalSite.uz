import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import { useTranslations } from "next-intl";

function FaqAccordions() {
  const t = useTranslations("menu");
  const defaultData = [
    {
      id: 1,
      question: t("q1"),
      answer: t("a1"),
      icon: "💳",
      iconPosition: "right",
    },
    {
      id: 2,
      question: t("q2"),
      answer: t("a2"),
      icon: "💼",
      iconPosition: "right",
    },
    {
      id: 3,
      question: t("q3"),
      answer: t("a3"),
    },
    {
      id: 4,
      question: t("q2"),
      answer: t("a2"),
    },
    {
      id: 5,
      question: t("q3"),
      answer: t("a3"),
    },
  ];

  return (
    <FaqAccordion
      data={defaultData}
      className="w-full"
      questionClassName="bg-blue-600 hover:bg-blue-500"
      answerClassName="bg-blue-600/70 text-white"
    />
  );
}

export { FaqAccordions };
