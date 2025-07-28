"use client"
import React from "react";

const PaymentProcessSection = () => {
  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-6'>
      <h2 className='text-xl font-semibold text-gray-900 mb-4'>
        Payment process
      </h2>

      <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
        <p className='text-gray-700 text-sm leading-relaxed'>
          কীভাবে পেমেন্ট করবেন তা বিস্তারিত জানতে{" "}
          <a
            href='#'
            className='text-green-600 hover:text-green-700 underline font-medium'>
            এই ভিডিওটি দেখুন
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentProcessSection;
