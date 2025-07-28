"use client";
import React, { useState } from 'react';
import { useLanguage } from "@/providers/LanguageProvider";
import { ISection } from "@/types";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps extends Partial<ISection> {
  className?: string;
}

const FAQSection = ({ 
  name,
  type,
  order_idx,
  values = [],
  className = "" 
}: FAQSectionProps) => {
  const { language } = useLanguage();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Default section name based on language if not provided
  const sectionName = name || (language === 'bn' ? 'সচরাচর জিজ্ঞাসা' : 'Frequently Asked Questions');

  // Convert section values to FAQ items
  const faqData: FAQItem[] = values.map((item: any) => ({
    id: item.id,
    question: item.question,
    answer: item.answer
  }));

  // Fallback FAQ data if no values provided
  const fallbackFaqData: FAQItem[] = [
    {
      id: "1",
      question: language === 'bn' ? "কোর্স কেনার পর কিভাবে শুরু করবো?" : "How do I start after purchasing the course?",
      answer: language === 'bn' 
        ? "কোর্স কেনার পর আপনি একটি ইমেইল পাবেন লগইন তথ্য এবং কোর্স অ্যাক্সেসের নির্দেশনা সহ। আপনি তৎক্ষণাৎ আপনার ড্যাশবোর্ড থেকে শেখা শুরু করতে পারবেন।"
        : "After purchasing the course, you will receive an email with login credentials and course access instructions. You can immediately start learning from your dashboard."
    },
    {
      id: "2",
      question: language === 'bn' ? "যেকোনো টেকনিকাল সমস্যায় কোথায় যোগাযোগ করবো?" : "Where should I contact for any technical issues?",
      answer: language === 'bn'
        ? "যেকোনো টেকনিকাল সমস্যার জন্য আপনি আমাদের সাপোর্ট টিমের সাথে support@10minuteschool.com এ যোগাযোগ করতে পারেন অথবা আমাদের হেল্পলাইনে কল করতে পারেন।"
        : "For any technical issues, you can contact our support team at support@10minuteschool.com or call our helpline. We provide 24/7 customer support for all technical queries."
    },
    {
      id: "3",
      question: language === 'bn' ? "এই কোর্স কি একাডেমিক নাকি জেনারেল IELTS এর জন্য?" : "Is this course designed for Academic or General IELTS?",
      answer: language === 'bn'
        ? "এই কোর্সটি একাডেমিক এবং জেনারেল উভয় IELTS এর জন্য ডিজাইন করা হয়েছে। কোর্সের বিষয়বস্তু উভয় ধরনের IELTS পরীক্ষার জন্য প্রয়োজনীয় সকল মডিউল কভার করে।"
        : "This course is designed for both Academic and General IELTS. The course content covers all modules required for both types of IELTS examinations."
    },
    {
      id: "4",
      question: language === 'bn' ? "অনলাইনে পড়ার সুবিধা কি?" : "What are the benefits of studying online?",
      answer: language === 'bn'
        ? "অনলাইন শিক্ষা নমনীয়তা, পুনর্বিবেচনার জন্য রেকর্ড করা লেকচার, ইন্টারঅ্যাক্টিভ উপকরণ, ব্যক্তিগতকৃত প্রতিক্রিয়া এবং ঐতিহ্যবাহী অফলাইন কোর্সের তুলনায় খরচ-কার্যকারিতা প্রদান করে।"
        : "Online learning offers flexibility, recorded lectures for revision, interactive materials, personalized feedback, and cost-effectiveness compared to traditional offline courses."
    }
  ];

  const displayData = faqData.length > 0 ? faqData : fallbackFaqData;

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const displayedItems = showAll ? displayData : displayData.slice(0, 4);

  // Helper function to render HTML content safely
  const renderAnswer = (answer: string) => {
    // Remove HTML tags and decode HTML entities for display
    const cleanAnswer = answer
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&lt;/g, '<') // Decode HTML entities
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    return cleanAnswer;
  };

  const seeAllText = language === 'bn' ? 'সব দেখুন' : 'See all';
  const seeLessText = language === 'bn' ? 'কম দেখুন' : 'See less';

  return (
    <div id={type} style={{ order: order_idx }} className={`w-full max-w-4xl mx-auto p-4 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {sectionName}
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
                  {renderAnswer(item.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {displayData.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center mx-auto transition-colors duration-200"
          >
            {showAll ? seeLessText : seeAllText}
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