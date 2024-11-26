'use client';
import React, { useState } from 'react';
import { IoChevronBackSharp  } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';
import './Faq.css';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/navigation';


const faqs = [
  { question: "Is installation offered for all services?", answer: "It completely depends on your requirement" },
  { question: "Can I trust on vendors?", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s." },
  { question: "Are there any hidden charges?", answer: "No" },
  { question: "Can I cancel a booking?", answer: "Yes, it's possible" },
  { question: "Do you also sell products?", answer: "No, but for rent we will provide" },
  { question: "How can I reach your help centre?", answer: "" },
  { question: "How can I change my booking?", answer: "No" },
];

const Faq: React.FC = () => {
  const Router =useRouter()
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container0">
      <div className="icon-circle3">
        <IoChevronBackSharp className="back-icon12"  onClick={() => Router.back()}/>
      </div>
      <h4>Faq's</h4>
      <div className="search-bar">
        <IoIosSearch className="search-icon" />
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="faq-list55">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <p>{faq.question}</p>
              <span>
                {activeIndex === index ? <FaChevronDown /> : <IoIosArrowForward />}
              </span>
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
