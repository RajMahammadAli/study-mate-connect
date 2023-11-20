// Accordion.js

import React, { useState } from "react";

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`bg-blue-500 text-white rounded-full p-2 mr-2 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          &#x2B;
        </span>
        <h3 className="text-lg font-semibold">{question}</h3>
      </div>
      <div
        className={`overflow-hidden transition-height duration-300 ${
          isOpen ? "h-auto" : "h-0"
        }`}
      >
        <p className="text-gray-600 mt-2">{answer}</p>
      </div>
    </div>
  );
};

const Accordion = () => {
  const accordionData = [
    {
      id: 1,
      question: "What is Study Mate Connect?",
      answer:
        "Study Mate Connect is an online platform for collaborative group study, assignment creation, and evaluation.",
    },
    {
      id: 2,
      question: "How can I create an assignment?",
      answer:
        'To create an assignment, log in to your account, go to the Assignments section, and click on the "Create Assignment" button.',
    },
    {
      id: 3,
      question: "Can I invite my friends to join my study group?",
      answer:
        "Yes, you can invite your friends by sharing the group link. They can join the study group after clicking on the link.",
    },
    {
      id: 4,
      question: "How do I evaluate my teammate's assignment?",
      answer:
        "To evaluate a teammate's assignment, go to the Submitted Assignments section, select the assignment, and provide your feedback and rating.",
    },
    {
      id: 5,
      question: "Is Study Mate Connect free to use?",
      answer:
        "Yes, Study Mate Connect offers a free basic plan. However, there are premium features available with a subscription.",
    },
  ];

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-4xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-md mx-auto">
        {accordionData.map((item) => (
          <AccordionItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Accordion;
