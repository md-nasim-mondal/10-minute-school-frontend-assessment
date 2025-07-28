"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ILanguage, ILanguageContextType } from "@/types";

const translations = {
  en: {
    loading: "Loading course data...",
    "error.title": "Error loading course",
    "error.retry": "Retry",
    "price.default": "Price: ৳1000",
    "enroll.now": "Enroll Now",
    "course.instructor": "Course Instructor",
    "course.features": "Course Features",
    "what.you.learn": "What you will learn",
    "course.details": "Course Details",
    "course.about": "About this course",
    "feature.explanations": "How the course is laid out",
    "course.pointers": "What you will learn by doing the course",
  },
  bn: {
    loading: "কোর্সের তথ্য লোড হচ্ছে...",
    "error.title": "কোর্স লোড করতে সমস্যা",
    "error.retry": "আবার চেষ্টা করুন",
    "price.default": "মূল্য: ৳১০০০",
    "enroll.now": "এনরোল করুন",
    "course.instructor": "কোর্স ইন্সট্রাক্টর",
    "course.features": "কোর্সের বৈশিষ্ট্য",
    "what.you.learn": "যা শিখবেন",
    "course.details": "কোর্সের বিস্তারিত",
    "course.about": "এই কোর্স সম্পর্কে",
    "feature.explanations": "কোর্সটি কীভাবে সাজানো হয়েছে",
    "course.pointers": "কোর্স করে যা শিখবেন",
  },
};

const LanguageContext = createContext<ILanguageContextType | undefined>(
  undefined
);

interface ILanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: ILanguageProviderProps) {
  const [language, setLanguage] = useState<ILanguage>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
    const savedLanguage = localStorage.getItem("language") as ILanguage;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "bn")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("language", language);
    }
  }, [language, isHydrated]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const value: ILanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): ILanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
