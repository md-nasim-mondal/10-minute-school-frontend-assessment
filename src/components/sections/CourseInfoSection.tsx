'use client'

import React from "react"
import { IMedia } from "@/types"
import TrailerSection from "./TrailerSection"
import CallToAction from "./CallToActionSection"
import Checklist from "./ChecklistSection"
import Contact from "./ContactSection"
import { useLanguage } from "@/providers/LanguageProvider"

interface CourseInfoSectionProps {
  checklistData: {
    id: string
    icon: string
    text: string
    list_page_visibility: boolean
  }[]
  title: string
  description: string
  cta_text: {
    name: string
    value: string
  }
  media: IMedia[]
}

function CourseInfoSection({
  checklistData,
  title,
  description,
  cta_text,
  media,
}: CourseInfoSectionProps) {
  const { language } = useLanguage()
  
  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id="skills-landing"
      className="min-h-[300px] md:min-h-[300px]"
    >
      <div className="mx-auto max-w-[1200px] relative flex flex-col p-4 gap-4 md:flex-row md:gap-12 pb-6 md:py-10 min-h-[300px]">
        <div className="flex flex-col justify-center flex-1 md:order-1 order-2 md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]">
          <h1 className="text-white mb-2 text-[21px] font-semibold md:text-4xl">
            {title}
          </h1>
          <div>
            <div
              className="text-gray-400"
              style={{ overflow: "hidden", height: "auto", maskImage: "none" }}
            >
              <div>
                <p className="tenms__paragraph" dir={language === 'bn' ? 'ltr' : 'ltr'}>
                  <span
                    style={{ whiteSpace: "pre-wrap" }}
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <section
          id="checklist-1"
          className="w-full md:max-w-[330px] lg:max-w-[400px] order-1 md:order-2 md:bg-white right-0 md:top-[50px] md:absolute"
        >
          <div className="md:sticky md:top-[112px]">
            <div className="md:border">
              <div className="md:p-1">
                <TrailerSection mediaItems={media} />
              </div>
              <div className="hidden md:block">
                <CallToAction className="p-4" name={cta_text.name} price={3850} />
                <Checklist items={checklistData} />
              </div>
            </div>
            <Contact />
          </div>
        </section>
      </div>
    </div>
  )
}

export default CourseInfoSection;
