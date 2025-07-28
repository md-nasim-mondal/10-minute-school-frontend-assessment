"use client";

import React, { useState, useRef, useEffect } from "react";
import { LeftArrowSvg1, RightArrowSvg1 } from "@/assets/icons";
import { useLanguage } from "@/providers/LanguageProvider";
import { ISection } from "@/types";

interface CourseTab {
  id: string;
  label: string;
  isActive?: boolean;
}

interface CourseSliderSectionProps {
  className?: string;
  sections?: ISection[];
}

// Default tabs for fallback
const defaultCourseTabs: CourseTab[] = [
  { id: "instructor", label: "Course instructor" },
  { id: "layout", label: "How the course is laid out" },
  { id: "learn", label: "What you will learn by doing the course" },
  { id: "details", label: "Course details" },
  { id: "feature_explanations", label: "Course Exclusive Feature" },
  { id: "free_items", label: "Free items with this products" },
  { id: "faq", label: "Frequently Ask Questions" },
];

// Map tab IDs to actual section types that exist in course data
const tabToSectionMap: { [key: string]: string } = {
  instructor: "instructors",
  layout: "features",
  learn: "pointers",
  details: "about",
  feature_explanations: "feature_explanations",
  free_items: "free_items",
  faq: "faq",
  testimonials: "testimonials",
  requirements: "requirements",
  how_to_pay: "how_to_pay",
};

// Translation keys for section labels
const sectionLabelKeys: { [key: string]: string } = {
  instructors: "course.instructor",
  features: "feature.explanations",
  pointers: "course.pointers",
  about: "course.about",
  feature_explanations: "course.features",
  free_items: "free.items",
  faq: "faq",
  testimonials: "testimonials",
  requirements: "course.details",
  how_to_pay: "payment.process",
};

function CourseSliderSection({ className = "", sections = [] }: CourseSliderSectionProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Generate course tabs from sections data or use default
  // Only include sections that have a name property
  const courseTabs: CourseTab[] = sections.length > 0 
    ? sections
        .filter((section) => section.name && section.name.trim() !== "") // Only sections with name
        .map((section) => ({
          id: section.type,
          label: section.name, // Use the section name directly as label
        }))
    : defaultCourseTabs.map((tab) => ({
        ...tab,
        label: sectionLabelKeys[tabToSectionMap[tab.id]] ? t(sectionLabelKeys[tabToSectionMap[tab.id]]) : tab.label,
      }));

  // Check scroll position and update disabled states
  const checkScrollPosition = () => {
    if (tabContainerRef.current) {
      const container = tabContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // Left button disabled when at start
      setIsLeftDisabled(scrollLeft <= 0);

      // Right button disabled when at end
      setIsRightDisabled(scrollLeft >= maxScrollLeft - 1); // -1 for precision
    }
  };

  // Check scroll position on mount and when viewIndex changes
  useEffect(() => {
    checkScrollPosition();
  }, [viewIndex]);

  // Auto scroll to center the tab in view (for arrow navigation)
  useEffect(() => {
    if (tabContainerRef.current && tabRefs.current[viewIndex]) {
      const viewTabElement = tabRefs.current[viewIndex];
      if (viewTabElement) {
        const container = tabContainerRef.current;

        const scrollLeft =
          viewTabElement.offsetLeft -
          container.offsetWidth / 2 +
          viewTabElement.offsetWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });

        // Check scroll position after scrolling
        setTimeout(() => {
          checkScrollPosition();
        }, 300); // Wait for smooth scroll to complete
      }
    }
  }, [viewIndex]);

  const handleTabClick = (tabId: string, index: number) => {
    setActiveTab(tabId);
    setCurrentIndex(index);
    setViewIndex(index);

    // Use the section type directly or map it for backward compatibility
    const sectionType = sections.length > 0 ? tabId : (tabToSectionMap[tabId] || tabId);
    
    if (sectionType) {
      const targetSection = document.getElementById(sectionType);
      if (targetSection) {
        const yOffset = -120;
        const y =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }
  };

  const goToLeft = () => {
    if (viewIndex > 0 && !isLeftDisabled) {
      setViewIndex((prev) => prev - 1);
    }
  };

  const goToRight = () => {
    if (viewIndex < courseTabs.length - 1 && !isRightDisabled) {
      setViewIndex((prev) => prev + 1);
    }
  };

  // Handle scroll event to update button states
  const handleScroll = () => {
    checkScrollPosition();
  };

  // Don't render if no tabs available
  if (courseTabs.length === 0) {
    return null;
  }

  return (
    <div className={`course-slider-section bg-white ${className}`}>
      <div className='relative border-b border-gray-300 mb-8'>
        {/* Left Arrow */}
        <button
          onClick={goToLeft}
          disabled={isLeftDisabled}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow-md rounded-full flex items-center justify-center transition-all duration-200 ${
            isLeftDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
          }`}
          aria-label='Previous View'>
          <LeftArrowSvg1 />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToRight}
          disabled={isRightDisabled}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-md rounded-full flex items-center justify-center transition-all duration-200 ${
            isRightDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
          }`}
          aria-label='Next View'>
          <RightArrowSvg1 />
        </button>

        {/* Scrollable Tab Container */}
        <div
          ref={tabContainerRef}
          onScroll={handleScroll}
          className='overflow-x-auto hideScrollbar mx-10'>
          <div className='flex gap-2 md:gap-4 min-w-max'>
            {courseTabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => handleTabClick(tab.id, index)}
                className={`px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green text-green bg-green/5"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSliderSection;
