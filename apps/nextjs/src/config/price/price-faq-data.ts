interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const priceFaqDataMap: Record<string, FAQItem[]> = {
  en: [
    {
      id: "item-1",
      question: "Who can I contact for any support question?",
      answer:
        "Feel free to send us an email to support@substantifik.com, and our support team will be very happy to assist you.",
    },
    {
      id: "item-2",
      question: "How can I be sure that my data stay confidential?",
      answer:
        "Substantifik is a seervice offered by Altiste SA, Switzerland who is entitled by law to the most severe privacy terms and regulations",
    },

    {
      id: "item-3",
      question: "How can AI solutions improve transparency between enterprise departments?",
      answer:
        "Our AI-powered solutions enable real-time data sharing and analysis, breaking down silos and promoting transparency between departments.",
    },

    {
      id: "item-4",
      question: "What are the main benefits of using AI to enhance collaboration between marketing and IT departments?",
      answer:
        "By using AI, departments can streamline workflows, make data-driven decisions, and improve accountability, leading to enhanced collaboration and efficiency.",
    },

    {
      id: "item-5",
      question: "How does the AI technology analyze and understand complex data in marketing and IT systems?",
      answer:
        "The AI technology uses advanced algorithms to process and interpret complex data, providing actionable insights for both marketing and IT departments.",
    },

    {
      id: "item-6",
      question: "Can the workflows be customized to suit the specific needs of different departments within an enterprise?",
      answer:
        "Yes, our AI solutions offer customizable workflows that can adapt to the unique requirements of each department, ensuring seamless integration and efficiency.",
    },

    {
      id: "item-7",
      question: "What reporting capabilities does the AI technology provide for monitoring cross-department collaboration?",
      answer:
        "Our AI technology offers real-time analytics and reporting features that track collaboration metrics, provide insights, and facilitate informed decision-making within the enterprise.",
    },


  ],

};
