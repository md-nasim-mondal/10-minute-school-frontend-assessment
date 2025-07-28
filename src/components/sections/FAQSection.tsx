import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I start after purchasing the course?",
      answer: "After purchasing the course, you will receive an email with login credentials and course access instructions. You can immediately start learning from your dashboard."
    },
    {
      id: 2,
      question: "Where should I contact for any technical issues (forgot password, change password, course refund, etc.)?",
      answer: "For any technical issues, you can contact our support team at support@10minuteschool.com or call our helpline. We provide 24/7 customer support for all technical queries."
    },
    {
      id: 3,
      question: "Is this course designed for Academic or General IELTS?",
      answer: "This course is designed for both Academic and General IELTS. The course content covers all modules required for both types of IELTS examinations."
    },
    {
      id: 4,
      question: "What are the benefits of studying online with you instead of enrolling offline elsewhere?",
      answer: "Online learning offers flexibility, recorded lectures for revision, interactive materials, personalized feedback, and cost-effectiveness compared to traditional offline courses."
    },
    {
      id: 5,
      question: "Are live classes available?",
      answer: "Yes, we offer live interactive classes along with recorded sessions. You can participate in real-time discussions and get immediate feedback from instructors."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const displayedItems = showAll ? faqData : faqData.slice(0, 4);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Frequently Ask Questions
      </h2>
      
      <div className="space-y-4">
        {displayedItems.map((item) => (
          <div 
            key={item.id} 
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-gray-900 font-medium text-base">
                {item.question}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openItems.includes(item.id) ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openItems.includes(item.id) && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                <div className="pt-4">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {faqData.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center mx-auto transition-colors duration-200"
          >
            {showAll ? 'See less' : 'See all'}
            <svg 
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                showAll ? 'rotate-180' : ''
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQSection;