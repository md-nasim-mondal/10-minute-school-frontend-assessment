"use client";
import {
  IAboutValue,
  ICourseData,
  IFeatureExplanationValue,
  IFeatureValue,
  IInstructorValue,
  IPointerValue,
  ISection,
} from "@/types";
import { useCourseQuery } from "@/hooks/use-course-query";

import AboutCourseSection from "@/components/sections/AboutCourseSection";
import CourseInfoSection from "@/components/sections/CourseInfoSection";
import CourseInstructorSection from "@/components/sections/CourseInstructorSection";
import FeatureExplanationsSection from "@/components/sections/FeatureExplanationsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PointersSection from "@/components/sections/PointersSection";
import StickyChecklistSection from "@/components/sections/StickyChecklistSection";
import { useLanguage } from "@/providers/LanguageProvider";
import CourseSliderSection from "@/components/sections/CourseSliderSection";
import FreeItemsSection from "@/components/sections/FreeItemsSection";
import FAQSection from "@/components/sections/FAQSection";
import PaymentProcessSection from "@/components/sections/PaymentProcessSection";
import CourseDetailsSection from "@/components/sections/CourseDetailsSection";
import StudentsOpinionSection from "@/components/sections/StudentsOpinionSection";

interface IProps {
  initialData: ICourseData | null;
  lang: string;
}

// Define supported section types that have cases in renderSection
const SUPPORTED_SECTION_TYPES = [
  "instructors",
  "features",
  "pointers",
  "about",
  "feature_explanations",
  "free_items",
  "testimonials",
  "requirements",
  "how_to_pay",
  "faq",
];

// Type-safe section renderer function
function renderSection(section: ISection) {
  switch (section.type) {
    case "instructors":
      return (
        <div id={section.type} key={section.type}>
          <CourseInstructorSection
            {...section}
            values={section.values as IInstructorValue[]}
          />
        </div>
      );
    case "features":
      return (
        <div id={section.type} key={section.type}>
          <FeaturesSection
            {...section}
            values={section.values as IFeatureValue[]}
          />
        </div>
      );
    case "pointers":
      return (
        <div id={section.type} key={section.type}>
          <PointersSection
            {...section}
            values={section.values as IPointerValue[]}
          />
        </div>
      );
    case "about":
      return (
        <div id={section.type} key={section.type}>
          <AboutCourseSection
            {...section}
            values={section.values as IAboutValue[]}
          />
        </div>
      );
    case "feature_explanations":
      return (
        <div id={section.type} key={section.type}>
          <FeatureExplanationsSection
            {...section}
            values={section.values as IFeatureExplanationValue[]}
          />
        </div>
      );
    case "free_items":
      return (
        <div id={section.type} key={section.type}>
          <FreeItemsSection />
        </div>
      );
    case "testimonials":
      return (
        <div id={section.type} key={section.type}>
          <StudentsOpinionSection testimonialData={section as any} />
        </div>
      );
    case "requirements":
      return (
        <div id={section.type} key={section.type}>
          <CourseDetailsSection {...section} />
        </div>
      );
    case "how_to_pay":
      return (
        <div id={section.type} key={section.type}>
          <PaymentProcessSection {...section} />
        </div>
      );
    case "faq":
      return <FAQSection key={section.type} {...section} />;
    default:
      return null;
  }
}

export default function CoursePageClient({ initialData, lang }: IProps) {
  const { t } = useLanguage();
  const { data, isLoading, error } = useCourseQuery({
    courseSlug: "ielts-course",
    lang,
    queryOptions: {
      initialData: initialData || undefined, // Convert null to undefined for React Query
      staleTime: initialData ? 5 * 60 * 1000 : 0, // 5 minutes if we have initial data
    },
  });

  if (isLoading && !initialData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          <p className='text-gray-600'>{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md'>
          <h3 className='text-red-800 font-semibold mb-2'>
            {t("error.title")}
          </h3>
          <p className='text-red-600'>{error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>
            {t("error.retry")}
          </button>
        </div>
      </div>
    );
  }

  const courseData: ICourseData = data || initialData!;

  // Filter sections to only include supported types for CourseSliderSection
  const supportedSections = courseData.sections.filter((section) =>
    SUPPORTED_SECTION_TYPES.includes(section.type)
  );

  console.log(courseData);

  return (
    <div>
      <CourseInfoSection
        title={courseData.title}
        description={courseData.description}
        checklistData={courseData.checklist}
        cta_text={courseData.cta_text}
        media={courseData.media}
      />

      <main className='max-w-[1200px] mx-auto p-4 flex flex-col gap-4 md:flex-row md:gap-12'>
        <section className='order-2 flex-1 md:order-1 md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]'>
          <div className='sticky top-16 z-30'>
            <CourseSliderSection sections={supportedSections} />
          </div>
          {courseData.sections
            .map((section: ISection) => renderSection(section))
            .filter(Boolean)}
        </section>

        <section className='w-full md:max-w-[330px] lg:max-w-[400px] order-1 bg-white'>
          <StickyChecklistSection
            checklistData={courseData.checklist}
            cta_text={courseData.cta_text}
          />
        </section>
      </main>
    </div>
  );
}
