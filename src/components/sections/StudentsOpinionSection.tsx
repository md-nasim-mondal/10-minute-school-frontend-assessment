"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { LeftArrowSvg1, RightArrowSvg1 } from '@/assets/icons';
import { useLanguage } from "@/providers/LanguageProvider";
import { ISection } from "@/types";

interface TestimonialValue {
  description: string;
  id: string;
  name: string;
  profile_image: string;
  testimonial: string;
  thumb: string;
  video_type: string;
  video_url: string;
}

interface StudentsOpinionSectionProps extends Partial<ISection> {
  className?: string;
}

const StudentsOpinionSection: React.FC<StudentsOpinionSectionProps> = ({ 
  name,
  type,
  order_idx,
  values = [],
  className = "" 
}) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideos, setPlayingVideos] = useState<{[key: string]: boolean}>({});
  const [expandedTestimonials, setExpandedTestimonials] = useState<{[key: string]: boolean}>({});
  
  // Default section name based on language if not provided
  const sectionName = name || (language === 'bn' ? 'শিক্ষার্থীদের মতামত' : 'Students Opinion');
  
  // Convert section values to testimonial items
  const testimonialValues: TestimonialValue[] = values.map((item: any) => ({
    description: item.description || '',
    id: item.id,
    name: item.name || '',
    profile_image: item.profile_image || '',
    testimonial: item.testimonial || '',
    thumb: item.thumb || '',
    video_type: item.video_type || '',
    video_url: item.video_url || ''
  }));
  
  // Fallback testimonial data if no values provided
  const fallbackTestimonials: TestimonialValue[] = [
    {
      id: "1",
      name: language === 'bn' ? "রহিম উদ্দিন" : "Rahim Uddin",
      description: language === 'bn' ? "IELTS প্রস্তুতিকারী" : "IELTS Candidate",
      testimonial: language === 'bn' 
        ? "এই কোর্সটি আমার IELTS প্রস্তুতিতে অনেক সাহায্য করেছে। শিক্ষকদের পড়ানোর পদ্ধতি খুবই কার্যকর এবং বোধগম্য।"
        : "This course has helped me a lot in my IELTS preparation. The teaching method of the instructors is very effective and understandable.",
      profile_image: "",
      thumb: "",
      video_type: "",
      video_url: ""
    },
    {
      id: "2",
      name: language === 'bn' ? "ফাতিমা খাতুন" : "Fatima Khatun",
      description: language === 'bn' ? "IELTS প্রস্তুতিকারী" : "IELTS Candidate",
      testimonial: language === 'bn'
        ? "অনলাইন ক্লাসগুলো খুবই ভালো। যেকোনো সময় দেখতে পারি এবং বার বার প্র্যাকটিস করতে পারি।"
        : "The online classes are very good. I can watch them anytime and practice repeatedly.",
      profile_image: "",
      thumb: "",
      video_type: "",
      video_url: ""
    }
  ];
  
  const displayData = testimonialValues.length > 0 ? testimonialValues : fallbackTestimonials;
  
  const itemsPerPage = 2;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const CHARACTER_LIMIT = 150; // Character limit for testimonial text

  // Language-based text
  const expandText = language === 'bn' ? 'আরও দেখুন ▼' : 'See more ▼';
  const collapseText = language === 'bn' ? 'সংক্ষিপ্ত করুন ▲' : 'See less ▲';
  const prevAriaLabel = language === 'bn' ? 'পূর্ববর্তী স্লাইড' : 'Previous slide';
  const nextAriaLabel = language === 'bn' ? 'পরবর্তী স্লাইড' : 'Next slide';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    // Stop all videos when changing slides
    setPlayingVideos({});
    // Reset expanded testimonials when changing slides
    setExpandedTestimonials({});
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    // Stop all videos when changing slides
    setPlayingVideos({});
    // Reset expanded testimonials when changing slides
    setExpandedTestimonials({});
  };

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    return displayData.slice(startIndex, startIndex + itemsPerPage);
  };

  const getYouTubeEmbedUrl = (videoUrl: string) => {
    if (!videoUrl) return '';
    return `https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`;
  };

  const handlePlayVideo = (testimonialId: string) => {
    setPlayingVideos(prev => ({
      ...prev,
      [testimonialId]: true
    }));
  };

  const toggleTestimonialExpansion = (testimonialId: string) => {
    setExpandedTestimonials(prev => ({
      ...prev,
      [testimonialId]: !prev[testimonialId]
    }));
  };

  const getTruncatedText = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  return (
    <div id={type} style={{ order: order_idx }} className={`w-full max-w-6xl mx-auto px-4 py-8 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        {sectionName}
      </h2>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 shadow-md rounded-full flex items-center justify-center transition-all duration-200 ${
            currentIndex === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
          }`}
          aria-label={prevAriaLabel}
          disabled={currentIndex === 0}
        >
          <LeftArrowSvg1/>
        </button>
        
        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-md rounded-full flex items-center justify-center transition-all duration-200 ${
            currentIndex === totalPages - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
          }`}
          aria-label={nextAriaLabel}
          disabled={currentIndex === totalPages - 1}
        >
          <RightArrowSvg1/>
        </button>

        {/* Testimonial Cards */}
        <div className="flex gap-[4%]">
          {getCurrentItems().map((testimonial) => {
            const isExpanded = expandedTestimonials[testimonial.id];
            const shouldShowExpandButton = testimonial.testimonial && testimonial.testimonial.length > CHARACTER_LIMIT;
            
            return (
              <div key={testimonial.id} className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm md:max-w-[49%]">
                {/* Quote Icon */}
               <div className="relative -top-4 left-5 flex h-[38px] w-[38px] flex-row items-center justify-center rounded-full bg-[#FCE0D6] p-2 z-20" id="quote">
                 <div>
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 20 30">
                     <path fill="#D33242" d="M10.699 10.753c1.019-1.82 2.871-3.777 6.021-5.642.88-.5 1.436-1.41 1.436-2.366 0-1.957-2.038-3.322-3.89-2.503C8.938 2.562 0 8.342 0 20.308 0 25.677 4.4 30 9.819 30c5.419 0 9.865-4.323 9.865-9.692 0-5.005-3.937-9.1-8.985-9.555z"></path>
                   </svg>
                 </div>
                 <div>
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 20 30">
                     <path fill="#D33242" d="M10.699 10.753c1.019-1.82 2.871-3.777 6.021-5.642.88-.5 1.436-1.41 1.436-2.366 0-1.957-2.038-3.322-3.89-2.503C8.938 2.562 0 8.342 0 20.308 0 25.677 4.4 30 9.819 30c5.419 0 9.865-4.323 9.865-9.692 0-5.005-3.937-9.1-8.985-9.555z"></path>
                   </svg>
                 </div>
               </div>
                
                {/* Content Section */}
                <div className="px-4 pb-4">
                  {testimonial.video_url ? (
                    // Show video section if video exists
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                      {playingVideos[testimonial.id] ? (
                        // Show iframe when playing
                        <iframe
                          className="w-full h-full absolute inset-0"
                          src={getYouTubeEmbedUrl(testimonial.video_url)}
                          title={`${testimonial.name} testimonial video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        // Show thumbnail when not playing
                        <>
                          {testimonial.thumb ? (
                            <Image
                              src={testimonial.thumb}
                              alt={`${testimonial.name} testimonial`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-lg font-semibold">{testimonial.name.charAt(0)}</span>
                            </div>
                          )}
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black opacity-40 z-[1]" />
                          <div 
                            className="absolute inset-0 flex items-center justify-center z-[2] cursor-pointer"
                            onClick={() => handlePlayVideo(testimonial.id)}
                          >
                            <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 hover:scale-110 transition-all duration-200">
                              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    // Show testimonial text if no video
                    <div className="mb-4">
                      <div className="min-h-[120px] flex flex-col justify-between">
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {isExpanded 
                            ? testimonial.testimonial 
                            : getTruncatedText(testimonial.testimonial, CHARACTER_LIMIT)
                          }
                        </p>
                        {shouldShowExpandButton && (
                          <button 
                            onClick={() => toggleTestimonialExpansion(testimonial.id)}
                            className="text-green-600 text-sm hover:text-green-700 transition-colors self-start"
                          >
                            {isExpanded ? collapseText : expandText}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User Info */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      {testimonial.profile_image ? (
                        <Image
                          src={testimonial.profile_image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 font-semibold">{testimonial.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentsOpinionSection;