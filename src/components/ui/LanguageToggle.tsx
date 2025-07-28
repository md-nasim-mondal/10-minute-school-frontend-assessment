"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LanguageToggleContent() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "bn" : "en";
    setLanguage(newLang);

    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);
    router.push(`?${params.toString()}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className='px-3 py-1 text-sm border rounded hover:bg-gray-100 transition-colors flex items-center gap-2'
      aria-label={`Switch to ${language === "en" ? "Bengali" : "English"}`}>
      <span className='text-xs'>🌐</span>
      {language === "en" ? "বাংলা" : "English"}
    </button>
  );
}

export default function LanguageToggle() {
  return (
    <Suspense fallback={
      <button 
        className='px-3 py-1 text-sm border rounded bg-gray-100 transition-colors flex items-center gap-2'
        disabled
      >
        <span className='text-xs'>🌐</span>
        Loading...
      </button>
    }>
      <LanguageToggleContent />
    </Suspense>
  );
}
