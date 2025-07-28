"use client";
import React from "react";

const CourseDetailsSection = () => {
  const courseDetails = [
    "ইন্টারেক্টিভ সংযোগ (ওয়াইফাইং বা মোবাইল ইন্টারনেট)",
    "স্মার্টফোন অথবা পিসি",
  ];

  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-6'>
      <h2 className='text-xl font-semibold text-gray-900 mb-4'>
        Course details
      </h2>

      <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
        <ul className='space-y-3'>
          {courseDetails.map((detail, index) => (
            <li key={index} className='flex items-start gap-3'>
              <div className='flex-shrink-0 mt-0.5'>
                <svg
                  className='w-5 h-5 text-blue-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <span className='text-gray-700 text-sm leading-relaxed'>
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailsSection;
