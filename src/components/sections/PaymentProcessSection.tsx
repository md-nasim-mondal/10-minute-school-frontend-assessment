"use client";
import React from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ISection } from "@/types";

interface PaymentProcessSectionProps extends Partial<ISection> {
  className?: string;
}

const PaymentProcessSection = ({ 
  name,
  type,
  order_idx,
  className = "" 
}: PaymentProcessSectionProps) => {
  const { t, language } = useLanguage();

  // Default section name based on language if not provided
  const sectionName = name || (language === 'bn' ? 'কীভাবে পেমেন্ট করবেন' : 'Payment Process');

  // Payment process content based on language
  const paymentContent = {
    bn: {
      description: "কীভাবে পেমেন্ট করবেন তা বিস্তারিত জানতে",
      linkText: "এই ভিডিওটি দেখুন"
    },
    en: {
      description: "To learn more about how to make payment, please",
      linkText: "watch this video"
    }
  };

  const content = paymentContent[language] || paymentContent.en;

  return (
    <div id={type} style={{ order: order_idx }} className={`w-full max-w-4xl mx-auto px-4 py-6 ${className}`}>
      <h2 className='text-xl font-semibold text-gray-900 mb-4'>
        {sectionName}
      </h2>

      <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
        <p className='text-gray-700 text-sm leading-relaxed'>
          {content.description}{" "}
          <a
            href='#'
            className='text-green-600 hover:text-green-700 underline font-medium'>
            {content.linkText}
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentProcessSection;
