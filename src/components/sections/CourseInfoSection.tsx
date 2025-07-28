"use client";
import React from "react";
import { IMedia } from "@/types";
import TrailerSection from "./TrailerSection";
import CallToAction from "./CallToActionSection";
import Checklist from "./ChecklistSection";
import Contact from "./ContactSection";
import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";

interface CourseInfoSectionProps {
  checklistData: {
    id: string;
    icon: string;
    text: string;
    list_page_visibility: boolean;
  }[];
  title: string;
  description: string;
  cta_text: {
    name: string;
    value: string;
  };
  media: IMedia[];
}

function CourseInfoSection({
  checklistData,
  title,
  description,
  cta_text,
  media,
}: CourseInfoSectionProps) {
  const { language } = useLanguage();
  const url = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URL(window.location.href);
    }
    return new URL('http://localhost'); // Fallback URL for server-side rendering
  }, []);
  const [isBannerShow, setIsBannerShow] = React.useState(true);

  const handleBanner = React.useCallback(() => {
    url.searchParams.set("banner", "false");
    window.history.pushState({}, "", url.toString());
    setIsBannerShow(false);
  }, [url]);

  React.useEffect(() => {
    const bannerParam = url.searchParams.get("banner");
    if (bannerParam === "false") {
      setIsBannerShow(false);
    }
  }, [url.searchParams, setIsBannerShow, isBannerShow]);

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id='skills-landing'
      className='min-h-[300px] md:min-h-[300px]'>
      {isBannerShow && (
        <>
          <div className='relative'>
            <div>
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSfX6YBGXnY8YxNlVZOEP6Y9GVCWVo9Qe-aeCuGM_4NV5Hu30Q/viewform'
                target='_blank'
                rel='noreferrer'
                className='items-center flex justify-center relative z-[1]'>
                <div>
                  <Image
                    alt='banner image'
                    data-original-src='https://cdn.10minuteschool.com/images/dasktop_banner_1753270611489.png?w=1800'
                    loading='lazy'
                    width={1800}
                    height={150}
                    decoding='async'
                    data-nimg='1'
                    className='hidden w-auto sm:block'
                    style={{ color: "transparent" }}
                    src='https://cdn.10minuteschool.com/images/dasktop_banner_1753270611489.png?w=1800?w=1800&h=150'
                  />
                </div>
                <div>
                  <Image
                    alt='banner image'
                    data-original-src='https://cdn.10minuteschool.com/images/mobile_banner_1753355543677.png?w=768'
                    loading='lazy'
                    width={768}
                    height={143}
                    decoding='async'
                    data-nimg='1'
                    className='w-auto sm:hidden'
                    style={{
                      color: "transparent",
                      backgroundSize: "cover",
                      backgroundPosition: "50% 50%",
                      backgroundRepeat: "no-repeat",
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 768 143'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/gif;base64,R0lGODlhAQABAPAAAOjo6P///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='/%3E%3C/svg%3E")`,
                    }}
                    src='https://cdn.10minuteschool.com/images/mobile_banner_1753355543677.png?w=768?w=768&h=143'
                  />
                </div>
              </a>
              <button onClick={() => handleBanner()}>
                <svg
                  className='absolute z-10 w-2 h-2 cursor-pointer right-2 top-1 md:top-2 md:h-3 md:w-3'
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M0.410704 0.410734C0.736141 0.0852972 1.26378 0.0852972 1.58921 0.410734L5.99996 4.82148L10.4107 0.410734C10.7361 0.0852972 11.2638 0.0852972 11.5892 0.410734C11.9147 0.736171 11.9147 1.26381 11.5892 1.58925L7.17847 5.99999L11.5892 10.4107C11.9147 10.7362 11.9147 11.2638 11.5892 11.5892C11.2638 11.9147 10.7361 11.9147 10.4107 11.5892L5.99996 7.1785L1.58921 11.5892C1.26378 11.9147 0.736141 11.9147 0.410704 11.5892C0.0852667 11.2638 0.0852667 10.7362 0.410704 10.4107L4.82145 5.99999L0.410704 1.58925C0.0852667 1.26381 0.0852667 0.736171 0.410704 0.410734Z'
                    fill='white'
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      <div className='mx-auto max-w-[1200px] relative flex flex-col p-4 gap-4 md:flex-row md:gap-12 pb-6 md:py-10 min-h-[300px]'>
        <div className='flex flex-col justify-center flex-1 md:order-1 order-2 md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]'>
          <h1 className='text-white mb-2 text-[21px] font-semibold md:text-4xl'>
            {title}
          </h1>
          <div>
            <div
              className='text-gray-400'
              style={{ overflow: "hidden", height: "auto", maskImage: "none" }}>
              <div>
                <p
                  className='tenms__paragraph'
                  dir={language === "bn" ? "ltr" : "ltr"}>
                  <span
                    style={{ whiteSpace: "pre-wrap" }}
                    dangerouslySetInnerHTML={{ __html: description }}></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <section
          id='checklist-1'
          className='w-full md:max-w-[330px] lg:max-w-[400px] order-1 md:order-2 md:bg-white right-0 md:top-[50px] md:absolute'>
          <div className='md:sticky md:top-[112px]'>
            <div className='md:border'>
              <div className='md:p-1'>
                <TrailerSection mediaItems={media} />
              </div>
              <div className='hidden md:block'>
                <CallToAction
                  className='p-4'
                  name={cta_text.name}
                  price={3850}
                />
                <Checklist items={checklistData} />
              </div>
            </div>
            <Contact />
          </div>
        </section>
      </div>
    </div>
  );
}

export default CourseInfoSection;
