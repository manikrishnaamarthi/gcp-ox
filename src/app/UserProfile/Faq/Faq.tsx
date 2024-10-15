'use client';
import React, { useState } from 'react';
import './Faq.css';

const faqs = [
  { question: "Is installation offered for all services?", answer: "Its completely depends on your requirement " },
  { question: "Can I trust on vendors ?", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s." },
  { question: "Are there any hidden charges ?", answer: "No" },
  { question: "Can I cancel a booking?", answer: "Yes, Its possible" },
  { question: "Do you also sell products ?", answer: "No, but for rent will provide" },
  { question: "How can I reach to your help centre ?", answer: "" },
  { question: "How can I change my booking?", answer: "No" },
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <button className="back-button">←</button>
      <h2>FAQ's</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <p>{faq.question}</p>
              <span>{activeIndex === index ? '▲' : '▶'}</span>
            </div>
            {activeIndex === index && faq.answer && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
